// Para el menu principal
const primaryNav = document.querySelector('.primary-navigation');
const navToggle = document.querySelector('.menu-btn');

// Para el menu de favoritos
const primaryFav = document.querySelector('.primary-fav');
const favToggle = document.querySelector('.fav-btn');
const closeFav = document.querySelector('.fav-btn-cerrar');

// Para el carrito
const primaryCart = document.querySelector('.primary-cart');
const cartToggle = document.querySelector('.cart-btn');
const closeCart = document.querySelector('.cart-btn-cerrar');

// Para cerrar haciendo click en el contenido principal
const closeAll = document.querySelector('.contenido');

// Menu principal
navToggle.addEventListener('click', () => {
  const visibility = primaryNav.getAttribute('data-visible')

  if (visibility === "false") {
    primaryNav.setAttribute('data-visible', true);
    navToggle.setAttribute('aria-expanded', true);

  } else if (visibility === "true") {
    primaryNav.setAttribute('data-visible', false);
    navToggle.setAttribute('aria-expanded', false);
  }
})

// Favoritos
favToggle.addEventListener('click', () => {
  const visibility = primaryFav.getAttribute('data-visible')

  if (visibility === "false") {
    primaryFav.setAttribute('data-visible', true);

  } else if (visibility === "true") {
    primaryFav.setAttribute('data-visible', false);
  }
})
// Cerrar
closeFav.addEventListener('click', () => {
  const visibility = primaryFav.getAttribute('data-visible');

  if (visibility === "true" || visibilityCart === "true") {
    primaryFav.setAttribute('data-visible', false);
  }
})

// Carrito
cartToggle.addEventListener('click', () => {
  const visibility = primaryCart.getAttribute('data-visible')

  if (visibility === "false") {
    primaryCart.setAttribute('data-visible', true);

  } else if (visibility === "true") {
    primaryCart.setAttribute('data-visible', false);
  }
})
// Cerrar
closeCart.addEventListener('click', () => {
  const visibility = primaryCart.getAttribute('data-visible');

  if (visibility === "true" || visibilityCart === "true") {
    primaryCart.setAttribute('data-visible', false);
  }
})


// Cerrar todo
closeAll.addEventListener('click', () => {
  const visibilityNav = primaryNav.getAttribute('data-visible');
  const visibilityFav = primaryFav.getAttribute('data-visible');
  const visibilityCart = primaryCart.getAttribute('data-visible');

  if (visibilityNav === "true" || visibilityFav === "true" || visibilityCart === "true") {
    primaryNav.setAttribute('data-visible', false);
    navToggle.setAttribute('aria-expanded', false);
    primaryFav.setAttribute('data-visible', false);
    primaryCart.setAttribute('data-visible', false);
  }
})
