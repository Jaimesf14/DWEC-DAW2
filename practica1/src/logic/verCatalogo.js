import {catalogo} from '../model/catalogo.js'

function verCatalogo(){
      console.log(`VER CATALOGO`);

   catalogo.forEach(juego => {
    console.log(`Id: ${juego.id} | Nombre: ${juego.titulo}`)
   });
   console.log(`-------------------------------------------------------------------------------------------------------------------`);

}
verCatalogo();


function filtrarCategoria(){
   const catalogoFiltrado = catalogo.filter((juego) => juego.categoria === "RPG"); 
   console.log(`CATALOGO FILTRADO POR CATEGORIA`);
   catalogoFiltrado.forEach(juego => {
    console.log(`Id: ${juego.id} | Nombre: ${juego.titulo} | Categoria: ${juego.categoria}`)
   
   });
   console.log(`-------------------------------------------------------------------------------------------------------------------`);

}   

filtrarCategoria();

function filtrarPorStockBajo(){
   const stockBajo = catalogo.filter((juego) => juego.stock <= 5); 
   console.log(`CATALOGO FILTRADO POR STOCK BAJO`);
   stockBajo.forEach(juego => {
    console.log(`Id: ${juego.id} | Nombre: ${juego.titulo} | Stock: ${juego.stock}`)
   });
   console.log(`-------------------------------------------------------------------------------------------------------------------`);

}

filtrarPorStockBajo();

export {verCatalogo, filtrarCategoria, filtrarPorStockBajo}
