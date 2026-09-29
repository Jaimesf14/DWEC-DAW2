/*
Ejercicio 1 — Truthy / Falsy: predicción

Sin ejecutar nada todavía, escribe en un papel o comentario si cada if se ejecuta (SÍ/NO):

if (0) console.log("A");
if ("0") console.log("B");
if ([]) console.log("C");
if (null) console.log("D");
if (" ") console.log("E");
if (NaN) console.log("F");
if (-1) console.log("G");
if (undefined) console.log("H");

Después ejecútalo y comprueba cuántos aciertos tuviste. Anota cuáles fallaste y por qué.
*/

if (0) console.log("A"); //No muestra
if ("0") console.log("B"); //Muestra
if ([]) console.log("C"); //Muestra
if (null) console.log("D"); //No muestra
if (" ") console.log("E"); //Muestra
if (NaN) console.log("F"); //No muestra
if (-1) console.log("G"); //Muestra
if (undefined) console.log("H");//No muestra

/*
Ejercicio 2 — if / else if / else: validador de acceso

Escribe una función validarAcceso(edad, tieneEntrada) que:

    Si edad es menor de 12 → devuelve "Acceso gratuito".
    Si edad está entre 12 y 17 (inclusive) y tieneEntrada es true → devuelve "Acceso con descuento".
    Si edad es 18 o más y tieneEntrada es true → devuelve "Acceso normal".
    En cualquier otro caso → devuelve "Acceso denegado".

Pruébala con al menos 4 combinaciones distintas de edad/tieneEntrada.
*/

const validarAcceso = {
    edad: 15,
    tieneEntrada: true,
};

if (validarAcceso.edad < 12){
    return console.log("Acceso gratuito");
} else if (validarAcceso.edad >= 12 && validarAcceso.edad <= 17 && validarAcceso.tieneEntrada == true){
    console.log("Acceso con descuento");
} else if (validarAcceso.edad >= 18 && validarAcceso.tieneEntrada == true){
    console.log("Acceso normal");
} else {
    console.log("Acceso denegado");
}

/*
Ejercicio 3 — Ternario (simple y anidado)

    Usando el operador ternario, crea mensaje que valga "Mayor de edad" si edad >= 18, o "Menor de edad" en caso contrario, para edad = 16.
*/  

const edad = 16;
const validarEdad = edad >= 18 ? console.log("Mayor de edad") : console.log("Menor de edad");

/*
Ahora, con un ternario anidado, crea categoria que valga "Bebé" si edad < 2, "Niño" si edad < 12, "Adolescente" si edad < 18, o "Adulto" en cualquier otro caso. Pruébalo con edad = 8.
*/

const edadCategoria = 8;
const validarCategoriaEdad = edadCategoria < 2 ? console.log("Bebé") : edadCategoria < 12 ? console.log("Niño") : edadCategoria < 18 ? console.log("Adolescente") : console.log("Adulto");

/*
Ejercicio 4 — Cortocircuitos && / || y la trampa del 0

Dado este objeto:

const producto = {
  nombre: "Auriculares",
  stock: 0,
  descuento: false
};

    Usa || para crear stockMostrado que muestre producto.stock, o "Sin datos" si no hubiera stock definido. Ejecútalo y observa qué sale.
    Ahora repite el mismo cálculo pero con ?? en vez de ||, llámalo stockCorrecto.
    Explica en un comentario por qué los dos resultados son distintos.
    Usa && para que solo se ejecute console.log("¡Aplica el descuento!") cuando producto.descuento sea true.

*/

const producto = {
  nombre: "Auriculares",
  stock: 0,
  descuento: false
};
const stockMostrado = producto.stock || "Sin datos";
console.log(stockMostrado);
//Muestra sin datos

const stockCorrecto = producto.stock ?? "Sin datos";
console.log(stockCorrecto);
//Muestra 0
//Son distinto porque || evalua de izquierda a derecha y retorna el primer valor truthy que encuentra y ?? evalúa el lado derecho únicamente si el lado izquierdo es null o undefined. 

/*
Ejercicio 5 — Optional chaining ?.

Dado:

const pedidos = [
  { id: 1, cliente: { nombre: "Marta", direccion: { ciudad: "Cádiz" } } },
  { id: 2, cliente: { nombre: "Luis" } }, // sin dirección
  { id: 3, cliente: null }
];

Escribe una función ciudadDelPedido(pedido) que devuelva la ciudad del cliente, o "Ciudad no especificada" si en algún punto de la cadena (cliente, direccion o ciudad) no existiera. Pruébala con los tres pedidos del array.
*/





/*
Ejercicio 6 — switch con fall-through intencional

Escribe una función diaDeLaSemana(numero) que, usando switch, devuelva:

    "Fin de semana" si el número es 6 o 7.
    "Día laboral" si el número está entre 1 y 5.
    "Número no válido" en cualquier otro caso.

Tienes que aprovechar el fall-through (agrupar varios case sin break entre ellos) al menos una vez en tu solución.
*/
function diaDeLaSemana(numero){
    switch(true){
        case numero > 5 && numero < 8:
            console.log("Fin de samana");
            break;
        case numero > 0 && numero < 6:
            console.log("Día laboral")
            break;
        default:
            console.log("Número no valido");
    } 
}
diaDeLaSemana(1);
diaDeLaSemana(7);
diaDeLaSemana(8);
//----------------------------------------------------------------
//Con fall-through
function diaDeLaSemana(numero){
    switch(numero){
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
            console.log("Día laboral");
            break;
        case 6:
        case 7:
            console.log("Fin de samana");
            break;
        default:
            console.log("Número no valido");
        
    }
}
diaDeLaSemana(1);
diaDeLaSemana(7);
diaDeLaSemana(8);

/*
Bloque 2 · Bucles clásicos
Ejercicio 7 — while / do...while

    Escribe un while que simule intentos de login: parte de intentos = 0 y, mientras intentos < 3, imprime `Intento ${intentos + 1} de 3` e incrementa intentos.
    Ahora escribe un do...while que pida (simuladamente, sin prompt, solo con una variable ya fijada como contraseñaCorrecta = true) al menos una vez, y explica en un comentario por qué un do...while garantiza esa primera ejecución y un while no.
*/
let intentosConexion = 0;
const maximoIntentos = 3;
while (intentosConexion < maximoIntentos){
    console.log(`Intento ${intentosConexion + 1} de 3`);
    intentosConexion++;
    
}
//Falta

/*
Ejercicio 8 — for clásico: suma de posiciones pares

Dado el array:

const numeros = [5, 12, 8, 3, 20, 7, 14, 1];

Usa un for clásico (con índice) para sumar solo los valores que están en una posición par del array (índices 0, 2, 4, 6...). Guarda el resultado en sumaPosicionesPares.
Ejercicio 9 — for...of vs for...in: encuentra el bug

Este código tiene un bug. Ejecútalo, observa la salida "rara", y explica en un comentario qué está pasando y cómo lo arreglarías:

const carrito = ["Camiseta", "Pantalón", "Zapatos"];
carrito.descuentoAplicado = true; // propiedad añadida al array

for (const item in carrito) {
  console.log(item);
}

Bloque 3 · Arrays: mutabilidad
Ejercicio 10 — Mutadores vs inmutables: predicción

Antes de ejecutar, predice qué imprime cada console.log:

const equipoA = ["Ana", "Bea"];
const equipoB = equipoA;
const equipoC = [...equipoA];

equipoB.push("Carla");
equipoC.push("Diana");

console.log(equipoA);
console.log(equipoB);
console.log(equipoC);

Ejercicio 11 — El peligro de sort(): encuéntralo y arréglalo

const precios = [100, 25, 9, 400, 3];
const precioMasBarato = precios.sort()[0];
console.log(precioMasBarato);
console.log(precios); // ¿sigue siendo el array original?

    Ejecuta el código y anota qué sale realmente en las dos líneas.
    Corrígelo para que precioMasBarato sea de verdad el precio más bajo, sin mutar el array precios original.

Bloque 4 · Métodos funcionales
Ejercicio 12 — map: transformar

Dado:

const alumnos = [
  { nombre: "Marta", notaSobre10: 7 },
  { nombre: "Iván", notaSobre10: 5.5 },
  { nombre: "Nora", notaSobre10: 9 }
];

Usa map() para crear un nuevo array alumnosConLetra de objetos { nombre, letra }, donde letra sea "A" si la nota es ≥ 9, "B" si es ≥ 7, o "C" en cualquier otro caso. Comprueba al final que alumnos no ha cambiado.
Ejercicio 13 — filter: seleccionar

Usando el mismo array alumnos del ejercicio 12, crea aprobados, un array que contenga solo los alumnos con notaSobre10 >= 5.
Ejercicio 14 — reduce: acumular

Dado:

const compras = [
  { producto: "Libro", precio: 15, cantidad: 2 },
  { producto: "Cuaderno", precio: 3, cantidad: 5 },
  { producto: "Bolígrafo", precio: 1, cantidad: 10 }
];

    Usa reduce() para calcular totalGastado, la suma de precio * cantidad de todas las líneas.
    Extra: usa reduce() para crear resumen, un objeto { producto: cantidad } con la cantidad comprada de cada producto (pista: mira el ejemplo de "agrupar por departamento" en tus apuntes).

Bloque extra · find, findIndex, some, every, includes

Usa este array para todo el bloque:

const pedidosTienda = [
  { id: 1, cliente: "Marta", estado: "enviado", total: 45 },
  { id: 2, cliente: "Luis", estado: "pendiente", total: 120 },
  { id: 3, cliente: "Nora", estado: "entregado", total: 30 },
  { id: 4, cliente: "Iván", estado: "pendiente", total: 75 }
];

Ejercicio 15 — find y findIndex

    Usa find() para obtener el primer pedido con estado === "pendiente".
    Usa findIndex() para obtener la posición de ese mismo pedido dentro del array.

Ejercicio 16 — some y every

    Usa some() para comprobar si hay algún pedido con total > 100.
    Usa every() para comprobar si todos los pedidos tienen total > 10.
    Usa every() de nuevo para comprobar si todos los pedidos están "entregado" (debería dar false).

Ejercicio 17 — includes

    Crea un array clientesVip = ["Marta", "Nora"].
    Usa includes() para comprobar, para cada pedido de pedidosTienda, si su cliente es VIP, e imprime `${cliente} es VIP` o `${cliente} no es VIP` según el caso (puedes combinarlo con forEach() o map() de la UD3).

Ejercicio 18 (integrador) — Todo junto

Usando pedidosTienda:

    Filtra los pedidos que no estén "entregado".
    Comprueba con some() si entre esos pedidos filtrados hay alguno de más de 100€.
    Calcula con reduce() el total acumulado de esos pedidos filtrados.
    Busca con find() el pedido de mayor total entre todos (pista: puedes combinarlo con reduce() para comparar, o recorrer y comparar el total).

*/