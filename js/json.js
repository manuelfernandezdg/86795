// Objeto
const producto = {
  titulo: "The Shadow #1",
  autor: "Garth Ennis",
  editorial: "Dynamite",
  precio: 17000
};

document.getElementById('ejemplo1').innerHTML = 'Titulo del libro: ' + producto.titulo + ' Escrito por: ' + producto.autor + ' ' + producto.precio + ' ' + typeof producto;

// JSON
const JSONproducto = '{"titulo":"The Shadow #1","autor":"Garth Ennis","editorial":"Dynamite","precio":17000}';

document.getElementById('ejemplo2').innerHTML = 'Titulo del libro: ' + JSONproducto.titulo + ' Escrito por: ' + JSONproducto.autor + ' ' + JSONproducto.precio + ' ' + typeof JSONproducto;

const productoParse = JSON.parse(JSONproducto);

document.getElementById('ejemplo3').innerHTML = 'Titulo del libro: ' + productoParse.titulo + ' Escrito por: ' + productoParse.autor + ' ' + productoParse.precio + ' ' + typeof productoParse;

// 
const carrito = {
  items : ["The Shadow #1", "The Shadow #2"],
  total: 34000,
  usuario: "Alexis"
};

const stringCarrito = JSON.stringify(carrito)

document.getElementById('ejemplo4').innerHTML = stringCarrito

// map()

const productosCatalogo = [
  {id: 1, titulo:"The Shadow #1", autor:"Garth Ennis", editorial:"Dynamite", precio:17000, img:"img/001.jpg"},
  {id: 2, titulo:"The Shadow #2", autor:"Garth Ennis", editorial:"Dynamite", precio:17000, img:"img/002.jpg"},
  {id: 3, titulo:"The Shadow #3", autor:"Garth Ennis", editorial:"Dynamite", precio:17000, img:"img/003.jpg"},
  {id: 4, titulo:"The Shadow #4", autor:"Garth Ennis", editorial:"Dynamite", precio:17000, img:"img/004.jpg"}
];

const catalogo = productosCatalogo.map(p => `
  <article>
    <img src="${p.img}" alt="Portada del comic ${p.titulo}}">
    <h2>${p.titulo}}</h2>
    <p>${p.autor} y Alex Ross, editorial ${p.editorial}</p>
    <div class="contenedor-article-btn">
      <button class="btn-outline">Favorito</button>
      <button class="btn-fill">Agregar</button>
    </div>
  </article>
  `).join('');

document.getElementById('catalogo').innerHTML = catalogo