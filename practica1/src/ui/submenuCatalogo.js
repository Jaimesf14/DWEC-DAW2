import { filtrarCategoria, filtrarPorStockBajo, verCatalogo } from "../logic/verCatalogo";

let eleccion = 0;

do{
    console.log(`========= CATÁLOGO =========`);
    console.log(`| 1. Catálogo completo`);
    console.log(`| 2. Filtrar por categoría`);
    console.log(`| 3. Productos con stock bajo`);
    console.log(`| 4. Volver`);

    switch (eleccion){
        case 1:
            verCatalogo();
        case 2:
            filtrarCategoria();
        case 3:
            filtrarPorStockBajo();
    }

} while (eleccion != 4);