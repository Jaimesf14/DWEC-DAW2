import  { catalogo } from "../model/catalogo"
import { juegoMasVendido, sumatorioStock } from "./venta";

let precioTotal = 0;


function sumaPrecio(precioFinal){
    precioTotal += precioFinal;
    return precioTotal;
        console.log(precioTotal);

}
function informeCaja(catalogoActual){
    console.log(`=== INFORME CAJA ===`);
    console.log(`Total facturado = ${precioTotal.toFixed(2)}€`);
    const juego = juegoMasVendido();
    console.log(`Juego más vendido = ${juego.titulo} | Cantidad vendida = ${juego.cantidad}`);
    const total = sumatorioStock(catalogoActual);
    console.log(`Precio total del stock: ${total.toFixed(2)}€`)
}

export {sumaPrecio, informeCaja}