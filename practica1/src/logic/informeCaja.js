import { registrarVenta } from "./venta"
let precioTotal = 0;
let registrosVentas = [];

function sumaPrecio(precioFinal){
    precioTotal += precioFinal;
    return precioTotal;
        console.log(precioTotal);

}
function informeCaja(){
    console.log(`=== INFORME CAJA ===`);
    console.log(`Total facturado = ${precioTotal.toFixed(2)}€`)
}

export {sumaPrecio, informeCaja}