function verCatalogo(catalogo){
   catalogo.forEach(juego => {
    console.log(`Id: ${juego.id} | Nombre: ${juego.titulo}`)
   });

}
verCatalogo(catalogo);


function filtrarCategoria(){
   const catalogoFiltrado = catalogo.filter((juego) => juego.categoria === "RPG"); 
   catalogoFiltrado.forEach(juego => {
    console.log(`Id: ${juego.id} | Nombre: ${juego.titulo} | Categoria: ${juego.categoria}`)
    
   });
}   

filtrarCategoria();

function filtrarPorStockBajo(){
   const stockBajo = catalogo.filter((juego) => juego.stock <= 5); 
   stockBajo.forEach(juego => {
    console.log(`Id: ${juego.id} | Nombre: ${juego.titulo} | Stock: ${juego.stock}`)
    
   });
}

filtrarPorStockBajo();