// Variable para la lista de productos
let productos = [];

// Variable para la lista de favoritos
let favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];

// Variable para los elementos del carrito
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

// Llamar a los elementos del DOM
const contenedorCatalogo = document.querySelector('.contenedor-catalogo');

// Construir la lista de favoritos
const listaFavoritos = document.querySelector('.lista-favoritos');

// Para el contador de favoritos
const favCount = document.querySelector('.fav-count');

// Para el render del carrito
const listaCarrito = document.querySelector('.lista-carrito');

// Contador para cuántos elementos hay en el carrito
const cartCount = document.querySelector('.cart-count');

// Para mostrar el total en $ de la compra
const cartTotal = document.querySelector('.cart-total');


// Carga de los productos desde el .json
async function cargarProductos() {
  try {
    const res = await fetch('data/productos.json');
    productos = await res.json(); // algo así como JSON.parse()
    renderizarCatalogo();
    renderizarFavoritos();
    renderizarCarrito();
  } catch (error) {
    console.error('Error al cargar los productos', error);
  }
}

// Catálogo
// Función para renderizar el catálogo
function renderizarCatalogo () {
  contenedorCatalogo.innerHTML = '';
  const catalogo = productos.map( p => {
    const esFavorito = favoritos.includes(p.id);
    const enCarrito = carrito.some(item => item.id === p.id);
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
        <button class="btn btn-cart ${enCarrito ? 'active' : ''}" data-id="${p.id}">
          ${enCarrito ? 'Agregado' : 'Comprar'}
        </button>
      </div>
    </article>
  `}).join('');
  contenedorCatalogo.innerHTML = catalogo;

  document.querySelectorAll('.btn-fav').forEach(btn => {
    btn.addEventListener('click', toggleFavorito)
  });

  document.querySelectorAll('.btn-cart').forEach(btn => {
    btn.addEventListener('click', agregarAlCarrito);
  });
};

// Favoritos
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


// Carrito -----------------------------------------------
// Agregar al carrito
function agregarAlCarrito(e) {
  const id = Number(e.target.dataset.id);
  const existe = carrito.find(item => item.id === id);

  if(existe) {
    return;
  } else {
    carrito.push({id, cantidad: 1});
  }

  localStorage.setItem('carrito', JSON.stringify(carrito));
  renderizarCatalogo();
};

// Renderizar el carrito

function renderizarCarrito () {
  listaCarrito.innerHTML = '';
  let total = 0;

  // Estado en vacío del carrito
  if (carrito.length === 0) {
    listaCarrito.innerHTML = `
      <p>Tu carrito está vacío.</p>
    `
    cartCount.textContent = 0;
    cartCount.classList.remove('active');
    return;
  }

  carrito.forEach(item => {
    const prod = productos.find(p => p.id === item.id);
    if(!prod) return;

    const subtotal = prod.precio * item.cantidad;
    total += subtotal;

    const li = document.createElement('li');

    li.className = 'item-cart';
    li.innerHTML = `
      <img src="${prod.img}" alt="Portada del libro ${prod.titulo}">
      <div>
        <h2>${prod.titulo}</h2>
        <h3>$${prod.precio.toLocaleString('es-AR')} x ${item.cantidad} = $${subtotal.toLocaleString('es-AR')}</h3>
      </div>

      <div class="cart-controles">
        <button class="menos" data-id="${item.id}">
          <span class="sr-only">Restar -1</span>
        </button>
        <span>${item.cantidad}</span>
        <button class="mas" data-id="${item.id}">
          <span class="sr-only">Sumar +1</span>
        </button>
        <button class="eliminar" data-id="${item.id}">
          <span class="sr-only">Quitar item del carrito</span>
        </button>
      </div>
    `;
    listaCarrito.appendChild(li);
  });

  cartTotal.innerHTML = 'Total de mi compra: ' + ' $' + total.toLocaleString('es-AR');

  cartCount.classList.add('active');
  cartCount.textContent = carrito.length;

  //Listeners para los botones de control
};

function modificarCantidad (id, delta) {
  const item = carrito.find(item => item.id === id);
  if (item) {
    item.cantidad = Math.max(1, item.cantidad + delta);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    renderizarCarrito();
    
  };
};



// Me olvidé las tostadas!!!!!

document.addEventListener('DOMContentLoaded', async () => {
  await cargarProductos();
});