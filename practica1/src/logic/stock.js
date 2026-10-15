import { verCatalogo } from "./verCatalogo";
import { buscarProducto } from "./gestionProductos";

function reponerStock(catalogoActual){
    verCatalogo();
    //Pedir id
    const eleccionId = prompt("Introduce el id del juego que quieres reponer stock: ");
    if(eleccionId === null) return;
    const id = Number(eleccionId);

    //Buscamos el producto y lo validamos
    const producto = buscarProducto(id);
    if (!producto || Number.isNaN(id)) {
        console.log("El id seleccionado no existe o no es válido");
        return catalogoActual;
    }
    //Pedir cantidad
    const eleccionCantidad = prompt("Introduce la cantidad que desea reponer: ");
    if(eleccionCantidad === null) return;
    const cantidad = Number(eleccionCantidad);

    //Validamos las cantidades
    if (Number.isNaN(cantidad) || cantidad <= 0) {

        console.log("Debe introducir una cantidad válida mayor a cero");
        return catalogoActual;

    } 
    //calculamos la suma de stock
    const reposicionStock = producto.stock + cantidad

    //actualizar catalogo
    const nuevoCatalogo = catalogoActual.map(producto =>{
        if(producto.id !== id) {
            return producto;
        }

        return {
            ...producto,
            stock: reposicionStock
        };
    });

    console.log(`=== REPOSICIÓN REGISTRADA ===`);
    console.log(`Producto: ${producto.titulo}`);
    console.log(`Stock anterior: ${producto.stock}`);
    console.log(`Nuevo stock: ${reposicionStock}`);

    return nuevoCatalogo;
}

    

export {reponerStock}