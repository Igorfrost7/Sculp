// ── DATA ──────────────────────────────────────────
const collections = {
  aurora: {
    label: 'Coleção Aurora',
    aura: 'linear-gradient(90deg, #F2B8C6, #EDD9A3)',
    overlay: 'rgba(242,184,198,0.12)',
    products: [
      { id:1, name:'Conjunto Rosé',    line:'Aurora', price:'R$ 389', desc:'Cetim italiano blush com bordado floral em fio dourado. Sutiã com bojo macio e calcinha hot-pants de renda.', badge:'Novo', class:'card-aurora' },
      { id:2, name:'Body Pétalas',     line:'Aurora', price:'R$ 479', desc:'Body inteiro em renda francesa rose, botões de madrepérola e alças ajustáveis em fita de cetim.', badge:null,  class:'card-aurora' },
      { id:3, name:'Baby-doll Matinê', line:'Aurora', price:'R$ 299', desc:'Fluido e delicado, em chiffon rose e sobreposição de renda, ideal para o amanhecer.', badge:'Exclusivo', class:'card-aurora' },
      { id:4, name:'Camisola Bruma',   line:'Aurora', price:'R$ 349', desc:'Modal com toque de seda, gola em V com renda e barra com detalhe dourado.', badge:null,  class:'card-aurora' },
    ]
  },
  lumiere: {
    label: 'Coleção Lumière',
    aura: 'linear-gradient(90deg, #D4C4E8, #C8C8CC)',
    overlay: 'rgba(212,196,232,0.12)',
    products: [
      { id:5, name:'Conjunto Prateado', line:'Lumière', price:'R$ 419', desc:'Microfibra prata com detalhes em renda lilás e fio metálico. Conjunto bojo + calcinha fio-dental.', badge:'Novo', class:'card-lumiere' },
      { id:6, name:'Sutiã Véu',         line:'Lumière', price:'R$ 259', desc:'Renda floral com copa meia-taça, bojo removível e alça decorativa em corrente prateada.', badge:null,  class:'card-lumiere' },
      { id:7, name:'Conjunto Íris',     line:'Lumière', price:'R$ 369', desc:'Tom lavanda com acabamento prateado. Calcinha brasileira com renda nas laterais.', badge:null,  class:'card-lumiere' },
      { id:8, name:'Robe de Cetim',     line:'Lumière', price:'R$ 529', desc:'Robe midi em cetim lavanda com cinto e punhos em renda prateada. Fechamento com laço.', badge:'Limitado', class:'card-lumiere' },
    ]
  },
  soir: {
    label: 'Coleção Soir',
    aura: 'linear-gradient(90deg, #D4AF6A, #2A1F23)',
    overlay: 'rgba(212,175,106,0.1)',
    products: [
      { id:9,  name:'Conjunto Noturno', line:'Soir', price:'R$ 549', desc:'Seda preta com sobreposição de renda dourada. Para noites que merecem ser lembradas.', badge:'Bestseller', class:'card-soir' },
      { id:10, name:'Corset Minuit',    line:'Soir', price:'R$ 689', desc:'Corset em cetim preto com estrutura de barbatanas, fechamento por laços dourados nas costas.', badge:'Novo', class:'card-soir' },
      { id:11, name:'Body Étoile',      line:'Soir', price:'R$ 459', desc:'Body de renda preta com detalhe dourado no decote e botões de perola nas costas.', badge:null,  class:'card-soir' },
      { id:12, name:'Slip Dress Nuit',  line:'Soir', price:'R$ 399', desc:'Slip dress em cetim cobre-escuro com gota dourada no centro. Elegante para dentro e fora do quarto.', badge:null,  class:'card-soir' },
    ]
  },
  brume: {
    label: 'Coleção Brume',
    aura: 'linear-gradient(90deg, #C8D8E4, #A8B8C4)',
    overlay: 'rgba(168,184,196,0.1)',
    products: [
      { id:13, name:'Conjunto Névoa',   line:'Brume', price:'R$ 339', desc:'Azul névoa em microfibra ultra-suave. Ideal para o dia a dia com máximo conforto e elegância discreta.', badge:'Novo', class:'card-brume' },
      { id:14, name:'Sutiã Sereno',     line:'Brume', price:'R$ 219', desc:'Sem bojo, com alças ajustáveis e renda cenurada. Suporte suave para o cotidiano.', badge:null,  class:'card-brume' },
      { id:15, name:'Camisola Inverno', line:'Brume', price:'R$ 379', desc:'Modal cinza-azulado com manga ¾ em renda, perfeita para noites mais frescas.', badge:null,  class:'card-brume' },
      { id:16, name:'Conjunto Prata',   line:'Brume', price:'R$ 359', desc:'Tom prata metálico em tecido técnico com acabamento em renda branca. Onde conforto encontra sofisticação.', badge:'Limitado', class:'card-brume' },
    ]
  }
};
 
let activeCollection = 'aurora';
let cartCount = 0;
 
// ── RENDER PRODUCTS ───────────────────────────────
function renderProducts(collKey, animate = false) {
  const grid = document.getElementById('productsGrid');
  const coll = collections[collKey];
 
  if (animate) {
    grid.style.transition = 'opacity 0.35s, transform 0.35s';
    grid.style.opacity = '0';
    grid.style.transform = 'translateY(16px)';
  }
 
  setTimeout(() => {
    grid.innerHTML = coll.products.map(p => `
      <article class="product-card ${p.class}" data-id="${p.id}" onclick="openModal(${p.id})">
        <div class="product-img">
          ${p.badge ? `<span class="product-badge">${p.badge}</span>` : ''}
          <div class="product-img-label">${p.name.split(' ')[0]}</div>
        </div>
        <button class="product-quick" onclick="event.stopPropagation();openModal(${p.id})">Ver Detalhes</button>
        <div class="product-info">
          <div class="product-name">${p.name}</div>
          <div class="product-line">${coll.label}</div>
          <div class="product-price">${p.price}</div>
        </div>
      </article>
    `).join('');
 
    if (animate) {
      grid.style.opacity = '1';
      grid.style.transform = 'translateY(0)';
    }
 
    // stagger reveal
    setTimeout(() => {
      grid.querySelectorAll('.product-card').forEach((c, i) => {
        setTimeout(() => c.classList.add('visible'), i * 90);
      });
    }, 50);
  }, animate ? 320 : 0);
}
 
// ── COLLECTION SWITCH ─────────────────────────────
function switchCollection(collKey) {
  if (collKey === activeCollection) return;
 
  const coll    = collections[collKey];
  const overlay = document.getElementById('coll-overlay');
  const auraBar = document.getElementById('collAura');
 
  overlay.style.background = coll.overlay;
  overlay.classList.add('active');
  setTimeout(() => overlay.classList.remove('active'), 700);
 
  auraBar.style.background = coll.aura;
 
  document.querySelectorAll('.coll-tab').forEach(t =>
    t.classList.toggle('active', t.dataset.coll === collKey)
  );
 
  activeCollection = collKey;
  renderProducts(collKey, true);
}
 
// ── MODAL ─────────────────────────────────────────
function openModal(id) {
  const all = Object.values(collections).flatMap(c => c.products);
  const p   = all.find(x => x.id === id);
  if (!p) return;
 
  const grads = {
    'card-aurora' : 'linear-gradient(160deg,#F9D0D8,#F2B8C6,#EDD9A3)',
    'card-lumiere': 'linear-gradient(160deg,#EBE0F0,#D4C4E8,#C8C8CC)',
    'card-soir'   : 'linear-gradient(160deg,#D4AF6A,#C8A882,#2A1F23)',
    'card-brume'  : 'linear-gradient(160deg,#E8F0F5,#C8D8E4,#A8B8C4)',
  };
 
  const imgEl = document.getElementById('modal-img');
  imgEl.style.cssText = `background:${grads[p.class]};display:flex;align-items:center;justify-content:center;`;
  imgEl.innerHTML = `<span style="font-family:'Cormorant Garamond',Georgia,serif;font-size:2rem;font-style:italic;color:rgba(255,255,255,0.5)">${p.name}</span>`;
 
  document.getElementById('modal-title').textContent = p.name;
  document.getElementById('modal-line').textContent  = p.line + ' · Sculp';
  document.getElementById('modal-price').textContent = p.price;
  document.getElementById('modal-desc').textContent  = p.desc;
 
  const sizes = ['PP','P','M','G','GG','GGG'];
  document.getElementById('modal-sizes').innerHTML = sizes
    .map(s => `<button class="size-btn" onclick="selectSize(this)">${s}</button>`)
    .join('');
 
  document.getElementById('modal-overlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}
 
function selectSize(btn) {
  btn.closest('.modal-sizes').querySelectorAll('.size-btn').forEach(b => b.classList.remove('sel'));
  btn.classList.add('sel');
}
 
function closeModal() {
  document.getElementById('modal-overlay').classList.remove('open');
  document.body.style.overflow = '';
}
 
function addToCart() {
  cartCount++;
  const badge = document.getElementById('cartBadge');
  badge.textContent = cartCount;
  badge.style.transform = 'scale(1.5)';
  setTimeout(() => badge.style.transform = '', 300);
  closeModal();
}
 
document.getElementById('modalClose').addEventListener('click', closeModal);
document.getElementById('modal-overlay').addEventListener('click', e => {
  if (e.target === e.currentTarget) closeModal();
});
 
// ── COLLECTION TABS ───────────────────────────────
document.getElementById('collTabs').addEventListener('click', e => {
  if (e.target.classList.contains('coll-tab')) switchCollection(e.target.dataset.coll);
});
 
// ── HAMBURGER ─────────────────────────────────────
const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
 
hamburger.addEventListener('click', () => {
  const open = mobileMenu.classList.toggle('open');
  hamburger.classList.toggle('open', open);
  document.body.style.overflow = open ? 'hidden' : '';
});
 
document.querySelectorAll('.mob-link').forEach(l => {
  l.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    hamburger.classList.remove('open');
    document.body.style.overflow = '';
  });
});
 
// ── SCROLL NAV ────────────────────────────────────
window.addEventListener('scroll', () => {
  document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 40);
});
 
// ── REVEAL ON SCROLL ──────────────────────────────
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      revealObs.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });
 
document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));
 
// ── CURSOR ────────────────────────────────────────
const cur = document.getElementById('cursor');
document.addEventListener('mousemove', e => {
  cur.style.left = e.clientX + 'px';
  cur.style.top  = e.clientY + 'px';
});
document.querySelectorAll('a, button, .product-card, .coll-tab').forEach(el => {
  el.addEventListener('mouseenter', () => cur.classList.add('big'));
  el.addEventListener('mouseleave', () => cur.classList.remove('big'));
});
 
// ── NEWSLETTER ────────────────────────────────────
function submitNews(e) {
  e.preventDefault();
  const btn = e.target.querySelector('button');
  btn.textContent = 'Obrigada ✦';
  btn.style.background = 'var(--rose-deep)';
  e.target.querySelector('input').value = '';
  setTimeout(() => { btn.textContent = 'Entrar'; btn.style.background = ''; }, 3000);
}
 
// ── INIT ──────────────────────────────────────────
renderProducts('aurora');
document.getElementById('collAura').style.background = collections.aurora.aura;
 