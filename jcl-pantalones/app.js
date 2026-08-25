if (window.top !== window.self) window.top.location = window.location.href;

const WHATSAPP_NUMBER = '541130621946';

const products = [
  { name: 'Pantalón Cargo Relax', type: 'pantalon', price: 32000, color: 'Arena', image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=800&q=85', note: 'Calce amplio', sizes: 'S · M · L · XL', stock: 'Disponible' },
  { name: 'Pantalón Jogger Base', type: 'pantalon', price: 29900, color: 'Negro', image: 'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?auto=format&fit=crop&w=800&q=85', note: 'Infaltable', sizes: 'S · M · L · XL', stock: 'Disponible' },
  { name: 'Short Sport Loop', type: 'short', price: 21900, color: 'Gris topo', image: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?auto=format&fit=crop&w=800&q=85', note: 'Liviano', sizes: 'S · M · L', stock: 'Últimas unidades' },
  { name: 'Pantalón Parachute JCL', type: 'pantalon', price: 34900, color: 'Verde seco', image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=800&q=85', note: 'Nuevo', sizes: 'S · M · L · XL', stock: 'Disponible' },
  { name: 'Short Básico Unisex', type: 'short', price: 19900, color: 'Negro', image: 'https://images.unsplash.com/photo-1598032895397-b9472444bf93?auto=format&fit=crop&w=800&q=85', note: 'Esencial', sizes: 'S · M · L', stock: 'Últimas unidades' },
  { name: 'Pantalón Recto Daily', type: 'pantalon', price: 28900, color: 'Piedra', image: 'https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=800&q=85', note: 'Calce recto', sizes: 'S · M · L · XL', stock: 'Disponible' }
];

const money = value => `$ ${value.toLocaleString('es-AR')}`;
const productCard = product => `<article class="product-card"><a class="product-image" href="https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Hola, JCL. Me interesa el ${product.name}. ¿Qué talles y colores tienen disponibles?`)}"><img src="${product.image}" alt="${product.name}, color ${product.color}" loading="lazy"><span class="product-note">${product.note}</span><span class="product-arrow">↗</span></a><div class="product-info"><div><h3>${product.name}</h3><p>${product.color} · Unisex</p></div><strong>${money(product.price)}</strong></div><div class="product-actions"><span class="stock-status">${product.stock}</span><button class="size-toggle" type="button">Guía de talle <span>+</span></button><button class="add-order" type="button" data-product="${product.name}">Agregar al pedido</button><div class="size-panel"><small>Elegí un talle para tu pedido</small><div class="size-options">${product.sizes.split(' · ').map(size => `<button class="size-option" type="button" data-size="${size}">${size}</button>`).join('')}</div></div></div></article>`;

const catalog = document.querySelector('[data-catalog]');
const featured = document.querySelector('[data-featured]');
const count = document.querySelector('[data-count]');
let currentFilter = new URLSearchParams(window.location.search).get('tipo') || 'todos';
let searchTerm = '';

function renderCatalog(filter = 'todos') {
  if (!catalog) return;
  currentFilter = filter;
  const visible = products.filter(product => (filter === 'todos' || product.type === filter) && `${product.name} ${product.color}`.toLowerCase().includes(searchTerm));
  catalog.innerHTML = visible.map(productCard).join('');
  if (count) count.textContent = `${visible.length} modelos`;
}

if (featured) featured.innerHTML = products.slice(0, 3).map(productCard).join('');
renderCatalog(currentFilter);

if (catalog) {
  const catalogTools = document.createElement('div');
  catalogTools.className = 'catalog-tools';
  catalogTools.innerHTML = '<div class="mode-switch" data-mode-switch><span>Estoy comprando para:</span><button class="mode active" data-mode="minorista" type="button">Mí</button><button class="mode" data-mode="mayorista" type="button">Revender</button></div><label class="search-box"><span>⌕</span><input type="search" placeholder="Buscar modelo o color" aria-label="Buscar modelo o color"></label><details class="size-guide"><summary>Guía rápida de talles</summary><p>Medidas orientativas. El calce puede variar según el modelo; confirmamos cintura y largo por WhatsApp.</p><div><span><b>S</b> cintura 70–78 cm</span><span><b>M</b> cintura 78–86 cm</span><span><b>L</b> cintura 86–94 cm</span><span><b>XL</b> cintura 94–102 cm</span></div></details></div>';
  document.querySelector('.filter-bar').after(catalogTools);
  catalogTools.querySelector('input').addEventListener('input', event => { searchTerm = event.target.value.toLowerCase().trim(); renderCatalog(currentFilter); });
  catalogTools.querySelectorAll('[data-mode]').forEach(button => button.addEventListener('click', () => { catalogTools.querySelectorAll('[data-mode]').forEach(item => item.classList.remove('active')); button.classList.add('active'); localStorage.setItem('jcl-mode', button.dataset.mode); }));
  const savedMode = localStorage.getItem('jcl-mode');
  if (savedMode) catalogTools.querySelectorAll('[data-mode]').forEach(button => button.classList.toggle('active', button.dataset.mode === savedMode));
}

const selectedOrder = JSON.parse(localStorage.getItem('jcl-order') || '[]').map(item => ({ ...item, quantity: item.quantity || 1 }));
const orderDock = document.createElement('aside');
orderDock.className = 'order-dock';
orderDock.innerHTML = '<div class="order-summary"><span><b data-order-count>0</b> prendas en tu pedido · <b data-order-total>$ 0</b></span><button class="clear-order" type="button">Vaciar pedido</button><div class="order-list" data-order-list></div></div><a class="button button-terracotta" data-order-link href="#">Ver pedido en WhatsApp <span>↗</span></a>';
document.body.appendChild(orderDock);

const headerCart = document.createElement('a');
headerCart.className = 'header-cart';
headerCart.href = '#';
headerCart.innerHTML = 'Pedido <b data-header-count>0</b>';
headerCart.addEventListener('click', event => { event.preventDefault(); orderDock.scrollIntoView({ behavior: 'smooth', block: 'center' }); });
document.querySelector('.header-cta')?.before(headerCart);

function updateOrder() {
  const countElement = orderDock.querySelector('[data-order-count]');
  const link = orderDock.querySelector('[data-order-link]');
  const itemCount = selectedOrder.reduce((total, item) => total + item.quantity, 0);
  const orderTotal = selectedOrder.reduce((total, item) => total + item.price * item.quantity, 0);
  const summary = selectedOrder.map(item => `- ${item.name} (${item.color}, talle ${item.size}) x${item.quantity}`).join('\n');
  countElement.textContent = itemCount;
  headerCart.querySelector('[data-header-count]').textContent = itemCount;
  orderDock.querySelector('[data-order-total]').textContent = money(orderTotal);
  orderDock.querySelector('[data-order-list]').innerHTML = selectedOrder.map((item, index) => `<div class="order-line"><span>${item.name} · ${item.size} <b>x${item.quantity}</b></span><button class="remove-one" type="button" data-order-index="${index}" aria-label="Quitar una unidad de ${item.name}">−1</button><button class="remove-line" type="button" data-order-index="${index}" aria-label="Eliminar ${item.name}">×</button></div>`).join('');
  link.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Hola, JCL. Quiero consultar este pedido:\n${summary}\n\n¿Me confirman talles, stock y precio final?`)}`;
  orderDock.classList.toggle('has-items', itemCount > 0);
  localStorage.setItem('jcl-order', JSON.stringify(selectedOrder));
}

document.addEventListener('click', event => {
  const sizeOption = event.target.closest('.size-option');
  if (sizeOption) {
    const actions = sizeOption.closest('.product-actions');
    actions.querySelectorAll('.size-option').forEach(item => item.classList.remove('selected'));
    sizeOption.classList.add('selected');
    actions.querySelector('.add-order').dataset.size = sizeOption.dataset.size;
  }
  const removeButton = event.target.closest('.remove-one, .remove-line');
  if (removeButton) {
    const index = Number(removeButton.dataset.orderIndex);
    if (removeButton.classList.contains('remove-one')) selectedOrder[index].quantity -= 1;
    else selectedOrder[index].quantity = 0;
    if (selectedOrder[index].quantity <= 0) selectedOrder.splice(index, 1);
    updateOrder();
  }
  if (event.target.closest('.clear-order')) {
    selectedOrder.splice(0, selectedOrder.length);
    updateOrder();
  }
  const sizeButton = event.target.closest('.size-toggle');
  if (sizeButton) {
    const panel = sizeButton.nextElementSibling.nextElementSibling;
    panel.classList.toggle('open');
    sizeButton.classList.toggle('open');
    sizeButton.querySelector('span').textContent = panel.classList.contains('open') ? '−' : '+';
  }
  const addButton = event.target.closest('.add-order');
  if (addButton) {
    const product = products.find(item => item.name === addButton.dataset.product);
    const size = addButton.dataset.size || 'A confirmar';
    const existing = selectedOrder.find(item => item.name === product?.name && item.size === size);
    if (existing) existing.quantity += 1;
    else if (product) selectedOrder.push({ ...product, size, quantity: 1 });
    addButton.textContent = existing ? `Agregado x${existing.quantity} ✓` : 'Agregado x1 ✓';
    addButton.classList.add('added');
    updateOrder();
  }
});
updateOrder();

if (document.querySelector('.shipping-section')) {
  const faq = document.createElement('section');
  faq.className = 'section faq-section';
  faq.innerHTML = '<div class="section-heading"><div><p class="eyebrow">Preguntas frecuentes</p><h2>Antes de escribirnos.</h2></div><p class="mini-note">Lo esencial para<br>comprar tranquilo.</p></div><div class="faq-list"><details open><summary>¿Puedo comprar una sola prenda?</summary><p>Sí. JCL vende por menor desde una unidad y también trabaja con pedidos mayoristas.</p></details><details><summary>¿Cómo sé qué talle elegir?</summary><p>Consultanos el modelo y te pasamos las medidas de cintura y largo disponibles.</p></details><details><summary>¿Hacen envíos?</summary><p>Sí, enviamos a todo el país. En CABA también coordinamos punto de encuentro en Flores.</p></details><details><summary>¿Puedo pagar con Mercado Pago?</summary><p>Sí. El link de pago se coordina por WhatsApp junto con la confirmación del pedido.</p></details></div>';
  document.querySelector('.shipping-section').after(faq);
}

if (!catalog) {
  const floatingContact = document.createElement('a');
  floatingContact.className = 'floating-whatsapp';
  floatingContact.textContent = 'WhatsApp ↗';
  floatingContact.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hola, JCL. Quiero hacer una consulta sobre sus prendas.')}`;
  floatingContact.target = '_blank';
  floatingContact.rel = 'noopener';
  document.body.appendChild(floatingContact);
}

document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => {
  document.querySelectorAll('[data-filter]').forEach(item => item.classList.remove('active'));
  button.classList.add('active');
  renderCatalog(button.dataset.filter);
}));

const whatsappMessages = {
  'Hola, JCL. Quiero consultar el catálogo.': 'Hola, JCL. Vi su sitio y quisiera consultar el catálogo, los talles y los colores disponibles. ¿Me ayudan?',
  'Hola, JCL. Quiero armar un pedido del catálogo.': 'Hola, JCL. Quiero armar un pedido a partir del catálogo. ¿Me confirman disponibilidad, talles y precio final?',
  'Hola, JCL. Necesito ayuda para comprar.': 'Hola, JCL. Estoy viendo cómo comprar. ¿Me orientan con el pago, el envío o el punto de encuentro en Flores?',
  'Hola, JCL. Quiero consultar un pedido mayorista.': 'Hola, JCL. Quiero comprar por mayor. ¿Me cuentan las cantidades mínimas, las escalas de precio y cómo coordinar el pedido?',
  'Hola, JCL. Quiero hacer una consulta.': 'Hola, JCL. Me gustaría consultar por sus pantalones y shorts. ¿Me ayudan con modelos, talles y disponibilidad?',
  'Hola, JCL. Quiero empezar una consulta mayorista.': 'Hola, JCL. Quiero empezar una consulta mayorista. Estoy buscando prendas para revender y quisiera conocer las opciones disponibles.',
  'Hola, JCL. Quiero consultar por una prenda.': 'Hola, JCL. Quiero consultar por una prenda. ¿Me confirman disponibilidad, talles, colores y precio?'
};

document.querySelectorAll('[data-whatsapp]').forEach(link => {
  const message = whatsappMessages[link.dataset.whatsapp] || link.dataset.whatsapp;
  link.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  link.target = '_blank';
  link.rel = 'noopener';
});

const contactPhone = document.querySelector('.contact-card .placeholder');
if (contactPhone) contactPhone.textContent = '+54 11 3062-1946';
const threadsLink = document.querySelector('.contact-detail a[href="#"]');
if (threadsLink) {
  threadsLink.href = 'https://www.threads.com/@jcl.pantalones';
  threadsLink.target = '_blank';
  threadsLink.rel = 'noopener';
}
const footerLinks = document.querySelector('.footer-links');
if (footerLinks && !footerLinks.querySelector('[data-instagram-link]')) {
  const instagramLink = document.createElement('a');
  instagramLink.dataset.instagramLink = 'true';
  instagramLink.href = 'https://www.instagram.com/jcl.pantalones/';
  instagramLink.target = '_blank';
  instagramLink.rel = 'noopener';
  instagramLink.textContent = 'Instagram';
  footerLinks.appendChild(instagramLink);
}

const quantity = document.querySelector('#quantity');
const unitPrice = document.querySelector('[data-unit-price]');
const total = document.querySelector('[data-total]');
function updateCalculator() {
  if (!quantity) return;
  const units = Math.max(1, Number(quantity.value) || 1);
  quantity.value = units;
  const price = units >= 12 ? 22900 : units >= 6 ? 26500 : 32000;
  if (unitPrice) unitPrice.textContent = money(price);
  if (total) total.textContent = money(price * units);
}
quantity?.addEventListener('input', updateCalculator);
document.querySelectorAll('[data-step]').forEach(button => button.addEventListener('click', () => { quantity.value = Math.max(1, Number(quantity.value) + Number(button.dataset.step)); updateCalculator(); }));
updateCalculator();

document.querySelector('.menu-toggle')?.addEventListener('click', event => {
  const nav = document.querySelector('.main-nav');
  nav.classList.toggle('open');
  event.currentTarget.setAttribute('aria-expanded', nav.classList.contains('open'));
});

const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('is-visible'); }), { threshold: 0.08 });
document.querySelectorAll('.reveal, .product-card, .benefits article, .flow-grid article, .contact-detail').forEach(item => observer.observe(item));

document.querySelectorAll('.seal > span').forEach((label, index) => {
  const svgNamespace = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(svgNamespace, 'svg');
  const defs = document.createElementNS(svgNamespace, 'defs');
  const path = document.createElementNS(svgNamespace, 'path');
  const text = document.createElementNS(svgNamespace, 'text');
  const textPath = document.createElementNS(svgNamespace, 'textPath');
  const pathId = `seal-arc-${index}`;

  svg.setAttribute('viewBox', '0 0 100 100');
  svg.setAttribute('aria-hidden', 'true');
  path.setAttribute('id', pathId);
  path.setAttribute('d', 'M 12,50 A 38,38 0 0,1 88,50');
  textPath.setAttribute('href', `#${pathId}`);
  textPath.setAttribute('startOffset', '50%');
  textPath.textContent = label.textContent;
  text.appendChild(textPath);
  defs.appendChild(path);
  svg.append(defs, text);
  label.replaceWith(svg);
});
