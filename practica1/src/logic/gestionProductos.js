import {catalogo} from "../model/catalogo";

function buscarProducto(id){
    const productoSeleccionado = catalogo.find((producto) => producto.id === id);
    if(productoSeleccionado !== undefined){
        console.log(productoSeleccionado.titulo);
        return productoSeleccionado;
        
    } else {
        console.log(`Id no valida`);
        return null;
    }
     
    
}



export {buscarProducto}
