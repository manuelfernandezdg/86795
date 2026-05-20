const productosCatalogo = [
  {id: 1, titulo:"The Shadow #1", autor:"Garth Ennis", editorial:"Dynamite", precio:17000, img:"img/001.jpg"},
  {id: 2, titulo:"The Shadow #2", autor:"Garth Ennis", editorial:"Dynamite", precio:17000, img:"img/002.jpg"},
  {id: 3, titulo:"The Shadow #3", autor:"Garth Ennis", editorial:"Dynamite", precio:17000, img:"img/003.jpg"},
  {id: 4, titulo:"The Shadow #4", autor:"Garth Ennis", editorial:"Dynamite", precio:17000, img:"img/004.jpg"},
  {id: 5, titulo:"The Shadow #5", autor:"Garth Ennis", editorial:"Dynamite", precio:17000, img:"img/005.jpg"},
  {id: 6, titulo:"The Shadow #6", autor:"Garth Ennis", editorial:"Dynamite", precio:17000, img:"img/006.jpg"},
  {id: 7, titulo:"The Shadow #7", autor:"Garth Ennis", editorial:"Dynamite", precio:17000, img:"img/007.jpg"},
  {id: 8, titulo:"The Shadow #8", autor:"Garth Ennis", editorial:"Dynamite", precio:17000, img:"img/008.jpg"}
];

const catalogo = productosCatalogo.map(p => `
  <article>
    <img src="${p.img}" alt="Portada del comic ${p.titulo}}">
    <h2>${p.titulo}}</h2>
    <h3>$${p.precio.toLocaleString('es-AR')}</h3>
    <p>${p.autor} y Alex Ross, editorial ${p.editorial}</p>
    <div class="contenedor-article-btn">
      <button class="btn-outline">Favorito</button>
      <button class="btn-fill">Agregar</button>
    </div>
  </article>
  `).join('');

document.querySelector('.contenedor-catalogo').innerHTML = catalogo;