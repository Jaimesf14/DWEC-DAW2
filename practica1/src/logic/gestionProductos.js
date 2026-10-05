import {catalogo} from "../model/catalogo";

function buscarProducto(id){
    const productoSeleccionado = catalogo.find((producto) => producto.id === id);
    if(productoSeleccionado !== undefined){
        return productoSeleccionado;
    } else {
        console.log(`Id no valida`);
        return null;
    }
     
    
}



export {buscarProducto}
