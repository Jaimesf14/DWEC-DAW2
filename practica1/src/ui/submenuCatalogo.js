import { filtrarCategoria, filtrarPorStockBajo, verCatalogo } from "../logic/verCatalogo";

function menuCatalogo() {
    let eleccion;

    do {
        let entrada = prompt(
            "Seleccione una opción:\n" +
            "========= CATÁLOGO =========\n" +
            "| 1. Catálogo completo\n" +
            "| 2. Filtrar por categoría\n" +
            "| 3. Productos con stock bajo\n" +
            "| 4. Volver al menú principal\n" +
            "| 5. Salir"
        );

        //if (entrada === null) break; // Si presiona "Cancelar", sale del bucle
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
}



export {menuCatalogo}