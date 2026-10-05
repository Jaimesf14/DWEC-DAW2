function estadoProducto(estadoConservacion, precioBase){
    let descuento = 0;
    if(estadoConservacion === "nuevo-precintado"){
        descuento = 1.25;
    } else if(estadoConservacion === "usado-como-nuevo"){
        descuento = 1;
    } else if(estadoConservacion === "usado-caja-danada"){
        descuento = 0.85;
    } else if(estadoConservacion === "solo-cartucho"){
        descuento = 0.70;
    }
 return precioBase * descuento;
}

function descuentoVolumen(cantidad, precioBase){
    if(cantidad >= 2 && cantidad <=3){
        return 0.05;
    } else if(cantidad >= 4){
        return 0.10;
    } else {
        return 0;
    }
}

function stockBajo(stock){
    if(stock < 3){
        return "⚠️ Stock bajo";
    } else {
        return ""
    }
}

export{estadoProducto, descuentoVolumen, stockBajo}