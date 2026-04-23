// document es el objeto, el getElementById() es el método, la propiedad textContent

const nombre = "Manuel";
const apellido = "Fernández";
const ciudad = "Berazategui";

document.getElementById('nombre').textContent = nombre + ' ' + apellido;

document.getElementById('ciudad').textContent = ciudad;
