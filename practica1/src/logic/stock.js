import { estadoProducto, descuentoVolumen, stockBajo } from "./reglaNegocios";
import { verCatalogo } from "./verCatalogo";
import { buscarProducto } from "./gestionProductos";

function reponerStock(catalogoActual){
    verCatalogo();
    //Pedir id
    const eleccionId = prompt("Introduce el id del juego que quieres comprar: ");
    if(eleccionId === null) return;
    const id = Number(eleccionId);

    //Buscamos el producto y lo validamos
    const producto = buscarProducto(id);
    if (!producto || Number.isNaN(id)) {
        console.log("El id seleccionado no existe o no es válido");
        return;
    }
    //Pedir cantidad
    const eleccionCantidad = prompt("Introduce la cantidad que desea comprar: ");
    if(eleccionCantidad === null) return;
    const cantidad = Number(eleccionCantidad);

    //Validamos las cantidades
    if (Number.isNaN(cantidad) || cantidad <= 0) {

        console.log("Debe introducir una cantidad válida mayor a cero");
        return;

    } else if(cantidad > producto.stock){
        console.log("El producto elegido no dispone de tanto stock");
        return;
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

    console.log(`=== VENTA REGISTRADA ===`);
    console.log(`Producto: ${producto.titulo}`);
    console.log(`Total: ${precioFinal.toFixed(2)}€`);
    if (mensajeStock) {
        console.log(mensajeStock)
    }

    return nuevoCatalogo;
}

export {reponerStock}