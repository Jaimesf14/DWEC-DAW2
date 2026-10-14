import { juegoMasVendido } from "./venta";
let precioTotal = 0;

function sumaPrecio(precioFinal){
    precioTotal += precioFinal;
    return precioTotal;
        console.log(precioTotal);

}
function informeCaja(){
    console.log(`=== INFORME CAJA ===`);
    console.log(`Total facturado = ${precioTotal.toFixed(2)}€`);
    const juego = juegoMasVendido();
    console.log(`Juego más vendido = ${juego.titulo} | Cantidad vendida = ${juego.cantidad}`)

}

export {sumaPrecio, informeCaja}