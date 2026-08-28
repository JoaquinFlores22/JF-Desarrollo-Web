// Rate limiter para las funciones serverless.
//
// Si están configuradas las variables de entorno de Upstash Redis
// (UPSTASH_REDIS_REST_URL / _TOKEN, o las KV_* que crea la integración de
// Vercel) usa Redis, que cuenta bien entre instancias. Si no, cae a un
// limitador en memoria: es por instancia, pero alcanza para frenar ráfagas
// de spam en un sitio de bajo tráfico. Nunca bloquea por un fallo propio.

const WINDOW_MS = 60_000;
const MAX_HITS = 5;

const REDIS_URL = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
const REDIS_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;

const memory = new Map();

function memoryLimit(key) {
  const now = Date.now();
  const hits = (memory.get(key) || []).filter((ts) => now - ts < WINDOW_MS);
  hits.push(now);
  memory.set(key, hits);
  // Cota de memoria: si crece demasiado, reiniciar (peor caso: se pierde
  // el conteo de algunos IPs por un rato, no es crítico).
  if (memory.size > 5000) memory.clear();

  if (hits.length > MAX_HITS) {
    return { ok: false, retryAfter: Math.ceil((WINDOW_MS - (now - hits[0])) / 1000) };
  }
  return { ok: true };
}

async function redisLimit(key) {
  const res = await fetch(`${REDIS_URL}/pipeline`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${REDIS_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify([
      ['INCR', key],
      ['PEXPIRE', key, WINDOW_MS, 'NX'],
    ]),
  });
  if (!res.ok) throw new Error(`upstash ${res.status}`);
  const out = await res.json();
  const count = Number(out?.[0]?.result ?? 1);
  if (count > MAX_HITS) return { ok: false, retryAfter: 60 };
  return { ok: true };
}

export async function checkRateLimit(key) {
  try {
    if (REDIS_URL && REDIS_TOKEN) return await redisLimit(key);
    return memoryLimit(key);
  } catch {
    // Un limitador roto no debe tumbar el endpoint.
    return { ok: true };
  }
}
