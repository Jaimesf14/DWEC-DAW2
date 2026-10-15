import { estadoProducto, descuentoVolumen, stockBajo } from "./reglaNegocios";
import { verCatalogo } from "./verCatalogo";
import { buscarProducto } from "./gestionProductos";
import { sumaPrecio } from "./informeCaja"
import { catalogo } from "../model/catalogo";
//array necesario para informeventas, que es donde se va a guardar la cantidad de juegos vendidos
let registroJuegosVendidos = [];

function registrarVenta(catalogoActual){
    verCatalogo();
    //Pedir id
    const eleccionId = prompt("Introduce el id del juego que quieres comprar: ");
    if(eleccionId === null) return;
    const id = Number(eleccionId);

    //Buscamos el producto y lo validamos
    const producto = buscarProducto(id);
    if (!producto || Number.isNaN(id)) {
        console.log("El id seleccionado no existe o no es válido");
        return catalogoActual;
    }
    //Pedir cantidad
    const eleccionCantidad = prompt("Introduce la cantidad que desea comprar: ");
    if(eleccionCantidad === null) return;
    const cantidad = Number(eleccionCantidad);

    //Validamos las cantidades
    if (Number.isNaN(cantidad) || cantidad <= 0) {

        console.log("Debe introducir una cantidad válida mayor a cero");
        return catalogoActual; 

    } else if(cantidad > producto.stock){
        console.log("El producto elegido no dispone de tanto stock");
        return catalogoActual;
    }
    //calculamos el precio con los descuentos
    const precioEstado = estadoProducto(producto.estadoConservacion, producto.precioBase);
    const precioCantidad = precioEstado * cantidad;
    const descuentoCantidad = descuentoVolumen(cantidad);
    const precioFinal = precioCantidad * ( 1-descuentoCantidad);

    const stockTrasCompra = producto.stock - cantidad;
    const mensajeStock = stockBajo(stockTrasCompra);

    //Para ir sumando el precio de toda las ventas para informe caja
    sumaPrecio(precioFinal);

    //Si es igual devuelve true por el some
    const juegoExiste = registroJuegosVendidos.some( 
        j => j.id === producto.id
    );

    //Para saber cual es el juego mas vendido
    const arrayAux = [];
    if(juegoExiste === true){
        for(const j of registroJuegosVendidos){
            if(j.titulo === producto.titulo){
                arrayAux.push({
                    ...j,
                    cantidad: j.cantidad + cantidad
                });
            } else {
                arrayAux.push(j);
            }
        }
        registroJuegosVendidos = arrayAux;

    } else {
        registroJuegosVendidos.push({
            id: producto.id,
            titulo: producto.titulo,
            cantidad: cantidad
        });
    }
        
    
    //actualizar catalogo
    const nuevoCatalogo = catalogoActual.map(producto =>{
        if(producto.id !== id) {
            return producto;
        }

        return {
            ...producto,
            stock: stockTrasCompra
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


//precio total del stock
function sumatorioStock(catalogoActual){
    let total = catalogoActual.reduce((suma, producto) => {
        return suma + (producto.stock*producto.precioBase)
    }, 0);

    return total;
}

//Calcular el juego más vendido
function juegoMasVendido(){
    let juegoExitoso= " ";
    let cantidadExitosa = 0;
    registroJuegosVendidos.forEach(j => {
        if(j.cantidad > cantidadExitosa){
            juegoExitoso = j.titulo;
            cantidadExitosa = j.cantidad;
        } 
    });

    if(registroJuegosVendidos.length === 0){
        return null;
    }
    return {
        titulo: juegoExitoso,
        cantidad: cantidadExitosa
    }  
}

export {registrarVenta, juegoMasVendido, sumatorioStock}