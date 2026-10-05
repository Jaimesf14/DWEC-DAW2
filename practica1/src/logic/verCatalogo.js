import { catalogo } from '../model/catalogo.js';
import { menuCatalogo } from '../ui/submenuCatalogo.js';

function verCatalogo() {
    console.log(`VER CATALOGO`);

    catalogo.forEach(juego => {
        console.log(`Id: ${juego.id} | Nombre: ${juego.titulo}`);
    });
    console.log(`-------------------------------------------------------------------------------------------------------------------`);
}

function filtrarCategoria() {
    let eleccion;
    let categoriaSeleccionada = "";

    let entrada = prompt(
        "Seleccione una opción:\n" +
        "========= CATALOGO FILTRADO POR CATEGORIA =========\n" +
        "| 1. Plataformas\n" +
        "| 2. RPG\n" +
        "| 3. Lucha\n" +
        "| 4. Deportes\n" +
        "| 5. Puzzle\n" +
        "| 6. Aventura\n" 
    );

    if (entrada === null) return; // Si presiona "Cancelar", sale del bucle
    eleccion = parseInt(entrada);

    switch (eleccion) {
        case 1:
            categoriaSeleccionada = "Plataformas";
            break;
        case 2:
            categoriaSeleccionada = "RPG";
            break;
        case 3:
            categoriaSeleccionada = "Lucha";
            break;
        case 4:
            categoriaSeleccionada = "Deportes";
            break;
        case 5:
            categoriaSeleccionada = "Puzzle";
            break;
        case 6:
            categoriaSeleccionada = "Aventura";
            break;
        default:
            alert("Opción no válida");
            return;
    }

    const catalogoFiltrado = catalogo.filter((juego) => juego.categoria === categoriaSeleccionada); 
    console.log(`CATALOGO FILTRADO POR CATEGORIA`);
    catalogoFiltrado.forEach(juego => {
        console.log(`Id: ${juego.id} | Nombre: ${juego.titulo} | Categoria: ${juego.categoria}`);    
    })
    //para pausar el bucle
    
    console.log(`-------------------------------------------------------------------------------------------------------------------`);
    alert("Los juegos filtrados por la categoria " + categoriaSeleccionada + " se están mostrando por la consola.");
}

function filtrarPorStockBajo() {
    const stockBajo = catalogo.filter((juego) => juego.stock <= 5); 
    console.log(`CATÁLOGO FILTRADO POR STOCK BAJO`);
    stockBajo.forEach(juego => {
        console.log(`Id: ${juego.id} | Nombre: ${juego.titulo} | Stock: ${juego.stock}`);
    });
    console.log(`-------------------------------------------------------------------------------------------------------------------`);
}

export { verCatalogo, filtrarCategoria, filtrarPorStockBajo };