import { Resend } from 'resend';
import { checkRateLimit } from './_lib/rate-limit.js';

// Endpoint de contacto. Recibe el formulario, lo valida y sanitiza, aplica
// rate limiting + trampas anti-bot, y manda el lead por email (Resend).
// Si no hay proveedor de email configurado responde 503 y el front cae a
// WhatsApp, asi nunca se pierde una consulta.

const ALLOWED_ORIGINS = [
  'https://desarrollodigital.vercel.app',
  'http://localhost:5173',
  'http://localhost:4173',
];

// eslint-disable-next-line no-control-regex -- matchearlos es el objetivo
const CONTROL_CHARS = new RegExp('[\u0000-\u001f\u007f]', 'g');

// Saca caracteres de control (incluidos \r y \n, que permitirian inyeccion
// de headers en el mail) y recorta.
function clean(value) {
  return String(value ?? '').replace(CONTROL_CHARS, ' ').trim();
}

// Escapa HTML antes de meter cualquier dato del usuario en el cuerpo del mail.
function escapeHtml(value) {
  return String(value ?? '').replace(
    /[&<>"']/g,
    (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]),
  );
}

function validate(body) {
  const b = body && typeof body === 'object' ? body : {};
  const str = (v, max) => (typeof v === 'string' ? v.slice(0, max) : '');

  const data = {
    nombre: clean(str(b.nombre, 80)),
    email: clean(str(b.email, 120)),
    telefono: clean(str(b.telefono, 30)),
    servicio: clean(str(b.servicio, 60)),
    mensaje: clean(str(b.mensaje, 2000)),
    website: str(b.website, 100), // honeypot: un humano lo deja vacio
    startedAt: Number(b.startedAt) || 0,
  };

  const errors = [];
  if (data.nombre.length < 2) errors.push('nombre');
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(data.email)) errors.push('email');

  return { data, errors };
}

export default async function handler(req, res) {
  const origin = req.headers.origin || '';
  const originOk = ALLOWED_ORIGINS.includes(origin);

  if (originOk) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Vary', 'Origin');
  }
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'method_not_allowed' });

  // Sin cookies no hay CSRF clasico, pero rechazar origenes ajenos corta
  // el uso del endpoint desde otras paginas.
  if (origin && !originOk) return res.status(403).json({ error: 'forbidden_origin' });

  // --- Rate limiting por IP ---
  const ip = String(req.headers['x-forwarded-for'] || '').split(',')[0].trim() || 'unknown';
  const rl = await checkRateLimit(`contact:${ip}`);
  if (!rl.ok) {
    res.setHeader('Retry-After', String(rl.retryAfter));
    return res.status(429).json({ error: 'rate_limited', retryAfter: rl.retryAfter });
  }

  // --- Parseo + validacion ---
  let parsed;
  try {
    const raw = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    parsed = validate(raw);
  } catch {
    return res.status(422).json({ error: 'invalid_json' });
  }
  if (parsed.errors.length) {
    return res.status(422).json({ error: 'invalid_input', fields: parsed.errors });
  }

  const { nombre, email, telefono, servicio, mensaje, website, startedAt } = parsed.data;

  // --- Trampas anti-bot ---
  // Honeypot completo, o formulario enviado en menos de 2,5s = bot.
  // Respondemos 200 para no darle senal de que lo delato.
  const elapsed = startedAt ? Date.now() - startedAt : Infinity;
  if (website || elapsed < 2500) return res.status(200).json({ ok: true });

  // --- Envio ---
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL || 'joaquinflores2207@gmail.com';
  const from = process.env.CONTACT_FROM_EMAIL || 'Estudio Flores <onboarding@resend.dev>';

  if (!apiKey) return res.status(503).json({ error: 'email_not_configured' });

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject: `Nueva consulta web - ${nombre}`.slice(0, 120),
      text: `Nombre: ${nombre}\nEmail: ${email}\nWhatsApp: ${telefono || '-'}\nServicio: ${servicio || '-'}\n\n${mensaje || '-'}`,
      html: `
        <h2 style="font-family:sans-serif">Nueva consulta desde el sitio</h2>
        <p style="font-family:sans-serif"><strong>Nombre:</strong> ${escapeHtml(nombre)}</p>
        <p style="font-family:sans-serif"><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p style="font-family:sans-serif"><strong>WhatsApp:</strong> ${escapeHtml(telefono) || '-'}</p>
        <p style="font-family:sans-serif"><strong>Servicio:</strong> ${escapeHtml(servicio) || '-'}</p>
        <p style="font-family:sans-serif"><strong>Mensaje:</strong><br>${escapeHtml(mensaje).replace(/\n/g, '<br>') || '-'}</p>
      `,
    });
    if (error) return res.status(502).json({ error: 'send_failed' });
    return res.status(200).json({ ok: true });
  } catch {
    return res.status(502).json({ error: 'send_failed' });
  }
}
