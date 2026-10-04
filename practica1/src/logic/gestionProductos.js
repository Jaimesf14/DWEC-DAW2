import {catalogo} from "../model/catalogo";

function buscarProducto(){
    console.log(`BUSQUEDA DE PRODUCTO`);
    const productoSeleccionado = catalogo.find((producto) => producto.id === 3);
    if(productoSeleccionado !== undefined){
        console.log(`El producto buscado es ${productoSeleccionado.titulo}`);
    } else {
        console.log(`Id no valida`);
    }
    console.log(`-------------------------------------------------------------------------------------------------------------------`);
     
    
}



export {buscarProducto}
