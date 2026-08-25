document.addEventListener("DOMContentLoaded", () => {
    
    // GSAP: Animaciones iniciales
    if (typeof gsap !== 'undefined') {
        const tl = gsap.timeline();
        tl.from("h1", { opacity: 0, y: 100, duration: 1, ease: "power4.out" })
          .from("p", { opacity: 0, y: 20, duration: 0.8 }, "-=0.5")
          .from(".glass-card", { opacity: 0, x: 50, duration: 1, ease: "power2.out" }, "-=0.5");

        gsap.utils.toArray(".grid > div").forEach((card, i) => {
            gsap.from(card, {
                scrollTrigger: { trigger: card, start: "top bottom-=40" },
                opacity: 0, y: 24, duration: 0.35, delay: i * 0.06, ease: "power2.out"
            });
        });
    }

//modo claro y oscuro
    const themeToggle = document.getElementById('theme-toggle');
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) document.documentElement.classList.add('dark');
    
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            document.documentElement.classList.toggle('dark');
            localStorage.setItem('theme', document.documentElement.classList.contains('dark') ? 'dark' : 'light');
        });
    }

    // LÓGICA DE SELECCIÓN DE SERVICIO (CARDS -> FORM)
    const serviceButtons = document.querySelectorAll('.service-btn');
    const formSelect = document.getElementById('contact-service-select');
    const formSection = document.getElementById('contacto');

    serviceButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const serviceValue = button.getAttribute('data-service');
            if (formSelect) {
                formSelect.value = serviceValue;
                formSelect.classList.add('ring-2', 'ring-blue-500');
                setTimeout(() => formSelect.classList.remove('ring-2', 'ring-blue-500'), 1500);
                if (formSection) formSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });




// Formulario de contacto optimizado para Backend propio
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', async function(event) {
        event.preventDefault();
        const formData = new FormData(this);
        const data = Object.fromEntries(formData.entries());
        const message = `Hola, Joaquín. Soy ${data.nombre}. Me interesa: ${data.servicio}. Mi WhatsApp es ${data.telefono || 'a confirmar'} y mi email es ${data.email}. ${data.mensaje || ''}`;
        window.open(`https://wa.me/541169024270?text=${encodeURIComponent(message)}`, '_blank', 'noopener');
            let successMessage = this.querySelector('[data-form-success]');
            if (!successMessage) { successMessage = document.createElement('p'); successMessage.dataset.formSuccess = 'true'; successMessage.className = 'mt-4 text-center text-sm text-green-600'; this.appendChild(successMessage); }
            successMessage.textContent = 'Tu consulta está lista para enviarse por WhatsApp.';
        this.reset();
    });
}

const budgetType = document.querySelector('[data-budget-type]');
const budgetExtra = document.querySelector('[data-budget-extra]');
const budgetResult = document.querySelector('[data-budget-result]');
const budgetLink = document.querySelector('[data-budget-link]');
const budgetRanges = { landing: [180000, 260000], corporate: [320000, 480000], commerce: [420000, 680000] };
function updateBudget() {
    if (!budgetType || !budgetExtra || !budgetResult || !budgetLink) return;
    const [minimum, maximum] = budgetRanges[budgetType.value];
    const extra = Number(budgetExtra.value);
    budgetResult.textContent = `$ ${(minimum + extra).toLocaleString('es-AR')} – $ ${(maximum + extra).toLocaleString('es-AR')}`;
    budgetLink.href = `https://wa.me/541169024270?text=${encodeURIComponent(`Hola, Joaquín. Estimé un proyecto de ${budgetType.options[budgetType.selectedIndex].text} con ${budgetExtra.options[budgetExtra.selectedIndex].text}. Quiero conversar el presupuesto.`)}`;
    budgetLink.target = '_blank';
    budgetLink.rel = 'noopener';
}
budgetType?.addEventListener('change', updateBudget);
budgetExtra?.addEventListener('change', updateBudget);
updateBudget();





    // INTERACCIONES UI (Efecto mouse)
    document.querySelectorAll('button, a').forEach(el => {
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            el.style.transform = `translate(${(e.clientX - rect.left - rect.width / 2) * 0.1}px, ${(e.clientY - rect.top - rect.height / 2) * 0.1}px)`;
        });
        el.addEventListener('mouseleave', () => el.style.transform = `translate(0, 0)`);
    });

    // IDIOMAS: Carga inicial
    const savedLang = localStorage.getItem('lang') || 'es';
    changeLanguage(savedLang);
});

// --- FUNCIONES GLOBALES ---

async function changeLanguage(lang) {
    try {
        const response = await fetch(`./js/locales/${lang}.json`);
        const translations = await response.json();
        
        // Seleccionamos todo, sin importar si está dentro del menú móvil u oculto
        const elements = document.querySelectorAll('[data-i18n]');
        
        elements.forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[key]) {
                if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                    el.placeholder = translations[key];
                } else {
                    el.innerHTML = translations[key]; // Usamos innerHTML por seguridad con tus spans
                }
            }
        });
        
        localStorage.setItem('lang', lang);
    } catch (e) { 
        console.error("Error al cambiar idioma:", e); 
    }
}


// cambio de idioma del Menú de Idiomas ---
const langBtn = document.getElementById('lang-btn');
const langMenu = document.getElementById('lang-menu');
const currentLang = document.getElementById('current-lang');

// Abrir/Cerrar menú al hacer clic en ES/EN/CH
if (langBtn) {
    langBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        langMenu.classList.toggle('hidden');
        langBtn.setAttribute('aria-expanded', String(!langMenu.classList.contains('hidden')));
    });
}

// Cerrar si haces clic afuera
document.addEventListener('click', () => {
    if (langMenu) langMenu.classList.add('hidden');
});

// --- 2. Función Mejorada de Cambio de Idioma ---
async function changeLanguage(lang) {
    try {
        const response = await fetch(`js/locales/${lang}.json`);
        if (!response.ok) throw new Error("Archivo no encontrado");
        const data = await response.json();

        // Traducir elementos
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (data[key]) {
                if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                    el.placeholder = data[key];
                } else {
                    el.textContent = data[key];
                }
            }
        });

        // Actualizar el botón principal del nav
        currentLang.textContent = lang.toUpperCase();
        localStorage.setItem('lang', lang);
        
        // Cerrar menú
        langMenu.classList.add('hidden');
    } catch (err) {
        console.error("Error al cargar idioma:", err);
    }
}

// Inicializar al cargar
document.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('lang') || 'es';
    changeLanguage(savedLang);
});



//FAQ 
// 1. Alternar cada pregunta individual
function toggleQuestion(button) {
    const answer = button.nextElementSibling;
    const icon = button.querySelector('span:last-child');
    
    // Abrir o cerrar la respuesta
    answer.classList.toggle('hidden');
    
    // Cambiar el icono de + a -
    icon.textContent = answer.classList.contains('hidden') ? '+' : '-';
}

// 2. Expandir el resto de las preguntas
function expandirFaq() {
    const faqExtended = document.getElementById('faq-extended');
    const btnExpandir = document.getElementById('btn-expandir');
    const span = btnExpandir.querySelector('[data-i18n]');

    faqExtended.classList.toggle('hidden');

    // Cambiar el texto del botón dinámicamente según si está abierto o cerrado
    if (faqExtended.classList.contains('hidden')) {
        span.setAttribute('data-i18n', 'btn_ver_mas');
        // Aquí forzamos la actualización manual del texto si no se dispara el cambio de idioma
        // Opcional: podrías llamar a tu función de idioma actual
    } else {
        span.setAttribute('data-i18n', 'btn_ver_menos');
    }
    
    // Refrescamos el idioma actual para que el botón muestre el texto correcto
    const currentLang = localStorage.getItem('lang') || 'es';
    changeLanguage(currentLang);
}



//menu burga
document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('menu-btn');
    const menu = document.getElementById('mobile-menu');

    if (btn && menu) {
        btn.addEventListener('click', () => {
            // Alterna la clase 'hidden' para mostrar/ocultar
            menu.classList.toggle('hidden');
            
            // Opcional: Cambia el estado de aria-expanded para accesibilidad
            const expanded = btn.getAttribute('aria-expanded') === 'true';
            btn.setAttribute('aria-expanded', !expanded);
        });
    }
});

