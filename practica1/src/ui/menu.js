import { menuCatalogo } from "./submenuCatalogo";
import { registrarVenta } from "../logic/venta";
import { reponerStock } from "../logic/stock";
import { buscarProducto } from "../logic/gestionProductos";
import { catalogo } from "../model/catalogo";
import { informeCaja } from "../logic/informeCaja";
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
                break;
            case 2:
                const eleccionId = prompt("Introduce el id del juego que quieres comprar: ");
                if(eleccionId === null) return;
                const id = Number(eleccionId);
                buscarProducto(id);
                break;
            case 3:
                let catalogoActual = catalogo;
                catalogoActual = registrarVenta(catalogoActual);
                break;
            case 4:
                let catalogoActual2 = catalogo;
                catalogoActual2 = reponerStock(catalogoActual2);
                break;
            case 5:
                let catalogoActual3 = catalogo;
                informeCaja();
            case 6:
                break;
            default:
                alert("Opción no válida");
                break;
        }

    } while (eleccion !== 6);
}



export {menu}