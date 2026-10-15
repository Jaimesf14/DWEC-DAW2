import { menuCatalogo } from "./submenuCatalogo";
import { registrarVenta } from "../logic/venta";
import { reponerStock } from "../logic/stock";
import { buscarProducto } from "../logic/gestionProductos";
import { catalogo } from "../model/catalogo";
import { informeCaja } from "../logic/informeCaja";
let catalogoActual = catalogo;
function menu() {
    let eleccion;

    do {
        let entrada = prompt(
            "Seleccione una opción:\n" +
            "========= CATÁLOGO =========\n" +
            "| 1. Menú catálogo\n" +
            "| 2. Buscar producto\n" +
            "| 3. Registrar venta\n" +
            "| 4. Reponer Stock\n" +
            "| 5. Informe de caja\n" +
            "| 6. Salir"
        );

        //if (entrada === null) break; // Si presiona "Cancelar", sale del bucle
        eleccion = parseInt(entrada);

        switch (eleccion) {
            case 1:
                menuCatalogo();
                console.log(`-------------------------------------------------------------------------------------------------------------------`);
                break;

            case 2:
                const eleccionId = prompt("Introduce el id del juego que quieres comprar: ");
                if(eleccionId === null) return;
                const id = Number(eleccionId);
                buscarProducto(id);
                console.log(`-------------------------------------------------------------------------------------------------------------------`);
                break;

            case 3:
                catalogoActual = registrarVenta(catalogoActual);
                console.log(`-------------------------------------------------------------------------------------------------------------------`);
                break;

            case 4:
                catalogoActual = reponerStock(catalogoActual);
                console.log(`-------------------------------------------------------------------------------------------------------------------`);
                break;

            case 5:
                informeCaja(catalogoActual);
                console.log(`-------------------------------------------------------------------------------------------------------------------`);
                break;
                
            case 6:
                break;
            default:
                alert("Opción no válida");
                break;
        }

    } while (eleccion !== 6);
}



export {menu}