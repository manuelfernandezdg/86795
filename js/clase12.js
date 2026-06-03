// Variable para la lista de productos
let productos = [];

// Variable para la lista de favoritos
let favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];

// Llamar a los elementos del DOM
const contenedorCatalogo = document.querySelector('.contenedor-catalogo');

// Construir la lista de favoritos
const listaFavoritos = document.querySelector('.lista-favoritos');

// Para el contador de favoritos
const favCount = document.querySelector('.fav-count');

// Carga de los productos desde el .json
async function cargarProductos() {
  try {
    const res = await fetch('data/productos.json');
    productos = await res.json(); // algo así como JSON.parse()
    renderizarCatalogo();
    renderizarFavoritos();
  } catch (error) {
    console.error('Error al cargar los productos', error);
  }
}

// Función para renderizar el catálogo
function renderizarCatalogo () {
  contenedorCatalogo.innerHTML = '';
  const catalogo = productos.map( p => {
    const esFavorito = favoritos.includes(p.id);
    return `
    <article>
      <img src="${p.img}" alt="Portada del comic ${p.titulo}">
      <h2>${p.titulo}</h2>
      <h3>$${p.precio.toLocaleString('es-AR')}</h3>
      <p>${p.autor}, editorial ${p.editorial}</p>
      <div class="contenedor-article-btn">
        <button class="btn btn-fav ${esFavorito ? 'active' : ''}" data-id="${p.id}">
          ${esFavorito ? 'En favoritos' : 'Agregar a favoritos'}
        </button>
        <button class="btn btn-cart">Carrito</button>
      </div>
    </article>
  `}).join('');
  contenedorCatalogo.innerHTML = catalogo;

  document.querySelectorAll('.btn-fav').forEach(btn => {
    btn.addEventListener('click', toggleFavorito)
  });
};

// Toggle favoritos
function toggleFavorito(e){
  const id = Number(e.target.dataset.id);
  if (favoritos.includes(id)) {
    favoritos = favoritos.filter(favId => favId !== id);
    e.target.classList.remove('active');
    e.target.textContent = 'Agregar a favoritos';
  } else {
    favoritos.push(id);
    e.target.classList.add('active');
    e.target.textContent = 'En favoritos';
  }
  localStorage.setItem('favoritos', JSON.stringify(favoritos));
  renderizarFavoritos();
};

// Para renderizar favoritos
function renderizarFavoritos () {
  listaFavoritos.innerHTML = '';

  if (favoritos.length === 0) {
    listaFavoritos.innerHTML = `
      <p>No tienes productos en favoritos aún.<p/>
    `;
    // Contador de favoritos en el menu
    favCount.textContent = 0;
    favCount.classList.remove('active');
    return;
  }

  favoritos.forEach(id => {
    const prod = productos.find(p => p.id === id);
    if (!prod) return;

    const li = document.createElement('li');
    li.className = 'item-fav';
    li.innerHTML = `
      <img src="${prod.img}" alt="Portada del libro ${prod.titulo}">
      <span>${prod.titulo}</span>
      <button class="btn-fav-remove" data-id="${id}">
        <span class="sr-only">Quitar de la lista de favoritos</span>
      </button>
    `
    listaFavoritos.appendChild(li);
  });

  favCount.textContent = favoritos.length;
  favCount.classList.add('active');
};

// Botón para remover los favoritos de la lista de favoritos
listaFavoritos.addEventListener('click', (e) => {
  const btn = e.target.closest('.btn-fav-remove');

  if (btn) {
    const id = Number(btn.dataset.id);

    favoritos = favoritos.filter(favId => favId !== id);
    localStorage.setItem('favoritos', JSON.stringify(favoritos));

    renderizarFavoritos();
    renderizarCatalogo();
  }
});


document.addEventListener('DOMContentLoaded', async () => {
  await cargarProductos();
});