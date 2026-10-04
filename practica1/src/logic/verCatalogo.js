import {catalogo} from '../model/catalogo.js'

function verCatalogo(){
      console.log(`VER CATALOGO`);

   catalogo.forEach(juego => {
    console.log(`Id: ${juego.id} | Nombre: ${juego.titulo}`)
   });
   console.log(`-------------------------------------------------------------------------------------------------------------------`);

}



function filtrarCategoria(){
       let eleccion;

    do {
        let entrada = prompt(
            "Seleccione una opción:\n" +
            "========= CATALOGO FILTRADO POR CATEGORIA =========\n" +
            "| 1. Catálogo completo\n" +
            "| 2. Filtrar por categoría\n" +
            "| 3. Productos con stock bajo\n" +
            "| 4. Volver al menú principal\n" +
            "| 5. Salir"
        );

        if (entrada === null) break; // Si presiona "Cancelar", sale del bucle
        eleccion = parseInt(entrada);

        switch (eleccion) {
            case 1:
                verCatalogo();
                break;
            case 2:
                filtrarCategoria();
                break;
            case 3:
                filtrarPorStockBajo();
                break;
            case 4:
                return;
            case 5:
                break;
            default:
                alert("Opción no válida");
                break;
        }

    } while (eleccion !== 5);
   const catalogoFiltrado = catalogo.filter((juego) => juego.categoria === "RPG"); 
   console.log(`CATALOGO FILTRADO POR CATEGORIA`);
   catalogoFiltrado.forEach(juego => {
    console.log(`Id: ${juego.id} | Nombre: ${juego.titulo} | Categoria: ${juego.categoria}`)
   
   });
   console.log(`-------------------------------------------------------------------------------------------------------------------`);

}   


function filtrarPorStockBajo(){
   const stockBajo = catalogo.filter((juego) => juego.stock <= 5); 
   console.log(`CATALOGO FILTRADO POR STOCK BAJO`);
   stockBajo.forEach(juego => {
    console.log(`Id: ${juego.id} | Nombre: ${juego.titulo} | Stock: ${juego.stock}`)
   });
   console.log(`-------------------------------------------------------------------------------------------------------------------`);

}



export {verCatalogo, filtrarCategoria, filtrarPorStockBajo}
