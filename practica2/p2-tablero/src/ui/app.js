// app.js — Bloque B · ✍️ B4, B5 y B6. Conecta el modelo (el tablero) con la página: pinta, escucha y avisa.
// Usa tus piezas: crearTarjeta/pintarLista, leerFormulario/mostrarErrores y delegar.
// La estructura de la página (ids, data-*) está en index.html y NO se cambia: la usan los tests.
import { ErrorTablero } from "../modelo/errores.js";
import { delegar } from "./delegacion.js";
import { leerFormulario, mostrarErrores } from "./formulario.js";
import { pintarLista } from "./tarjeta.js";

/** Botones de cada tarjeta según su columna: [texto, data-accion] */
const ACCIONES = {
  "Por hacer": [["Empezar →", "empezar"]],
  "En curso": [
    ["← Volver", "volver"],
    ["✓ Completar", "completar"],
  ],
  Hecho: [],
};

// ✍️ B6 · validar(datos) → { campo: "mensaje" } con los errores (objeto vacío si todo está bien)
//   - titulo: obligatorio y como mucho 80 caracteres
//   - cadaDias (si viene): entero mayor que 0. Si es correcto pero no hay limite, el error va
//     en «limite»: una tarea que se repite necesita fecha límite
export function validar(datos) {
  //creo el objeto donde se guardaran los errores
  const errores = {};
  //Compruebo si titulo está vacío o supera los 80 caracteres, y cumple con una de las dos condiciones muestra un mensaje de error
  if(datos.titulo.trim() === "" || datos.titulo.length > 80){
    errores.titulo = "El titulo está vacío o tiene más de 80 caracteres";
  }
  //creo la variable validadorDias que la utilizaré luego para comprobar si cadaDia es correcto
  let validadorDias = false
  //Compruebo que cada dia tiene algún valor
  if(datos.cadaDias !== undefined){
    //Compruebo que no es de tipo entero o que es menor o igual a 1 y si cumple con una de las dos condiciones muestra un mensaje de error
    if(!Number.isInteger(datos.cadaDias) || datos.cadaDias <= 0){
      errores.cadaDias = "CadaDia debe ser de tipo entero o mayor a 0";
    } else {
      //Si pasa las validaciones anteriores, validadrDias es true.
      validadorDias = true;
    }
  }
  //Compruebo que validador dia es true y que el limite sea nulo o indefinido y si cumple, muestra un mensaje de error.
  if(validadorDias === true && (datos.limite === null || datos.limite === undefined)){
    errores.limite = "Una tarea que se repite necesita fecha límite";
  }
  //devuelvo errores
  return errores;
}

/**
 * Arranca la interfaz dentro de raiz (el <main id="app">). Los listeners se ponen UNA vez aquí;
 * pintar() solo cambia nodos, así que repintar no los duplica.
 * opciones.hoy: fecha fija para los tests · opciones.alCambiar(tablero): tras cada cambio (UD6)
 */
export function iniciarApp(raiz, tablero, { hoy = null, alCambiar = () => {} } = {}) {
  const form = raiz.querySelector("#form-alta");
  const aviso = raiz.querySelector("#aviso");
  const columnas = raiz.querySelector("#columnas");
  const resumen = raiz.querySelector("#resumen");

  // ✍️ B4 · pintar(): deja la página igual que el modelo cada vez que se llama, y NO pone listeners
  //   - cada columna ([data-columna="…"]): sus tareas en el orden de ordenadas(), con pintarLista en su
  //     .lista, y en cada .tarjeta sus botones según ACCIONES: <button type="button" data-accion="…">
  //   - el .contador de cada columna: (n), o (n/límite) en la que tiene límite WIP
  //   - [data-dato="progreso"]: hechas ÷ total en %, redondeado (con el tablero vacío, 0 %)
  //   - [data-dato="vencidas"]: las vencidas de tablero.resumen(ahora)
  //   La fecha de hoy: const ahora = hoy ?? new Date();  (los tests pasan una fija)
  function pintar() {
    //utilizo la fecha recibida o la actual y se no se indica ninguna
    const ahora = hoy ?? new Date();
    let tareasHechas = 0;
    let tareasTotales = 0;
    for(const columna of tablero.columnas){
      //busco la columna y la lista en el html
      const colum = columnas.querySelector(`[data-columna="${columna.nombre}"]`);
      const lista = colum.querySelector(".lista");
      const tareas_ordenadas = columna.ordenadas();
      //pinta las tarea dentro de la lista
      pintarLista(lista, tareas_ordenadas);

      const num_tareas = tareas_ordenadas.length;
      const contador = colum.querySelector(".contador");
      //si la tarea tiene limite, muestra las tareas actuales y el limite, y si no tiene muestra solo el numero de tareas
      if (columna.limiteWip !== null){
        contador.textContent = `(${num_tareas}/${columna.limiteWip})`;
      } else {
        contador.textContent = `(${num_tareas})`;
      }

      tareasTotales += num_tareas; 
      if(columna.nombre === "Hecho"){
        tareasHechas += num_tareas;
      }

      //obtengo las tarjetas de la lista, y las acciones permitidas para la columna
      const tarjetas = lista.querySelectorAll(".tarjeta");
      const acciones = ACCIONES[columna.nombre];
      for(const tarjeta of tarjetas){
        for(const accion of acciones){
          //creo un boton
          const boton = document.createElement("button");
          boton.type = "button";
          boton.dataset.accion = accion[1];
          boton.textContent = accion[0];
          tarjeta.append(boton);  
        }
      }

    }
    const porcentaje = (tareasHechas/tareasTotales)*100;
    const progreso = resumen.querySelector(`[data-dato="progreso"]`);
    if(tareasTotales === 0){
      progreso.textContent = "0 %"
    } else {
      progreso.textContent = `${Math.round(porcentaje)} %`
    }

    //obtengo las estadisticas del tablero en la fecha actual
    const estadisticas = tablero.resumen(ahora);
    //busco el elemento de tareas vencidas, y lo muestro.
    const elementoVencidas = resumen.querySelector(`[data-dato="vencidas"]`);
    elementoVencidas.textContent = estadisticas.vencidas;
  }

  // 👀 Resuelto: avisar("texto") enseña el aviso; avisar("") lo esconde
  function avisar(mensaje) {
    aviso.textContent = mensaje;
    aviso.hidden = mensaje === "";
  }

  // ✍️ B5 · UN listener, puesto UNA vez aquí (nunca dentro de pintar): clic en los botones de las
  //   tarjetas, con delegar sobre `columnas`. empezar → «En curso», volver → «Por hacer», completar.
  //   Tras cada cambio que sale bien: avisar(""), pintar() y alCambiar(tablero).
  //   Si el tablero lanza un ErrorTablero → avisar(error.message) y no se repinta.
  //   Cualquier otro error → se relanza (es un fallo del programa).
  //   Pista: una función cambiar(accion) con el try/catch te sirve también para el B6.
function cambiar(accion){
  //Ejecuto la accion
  try{
    accion();
  } catch(error){
    //compruebbo si error pertenece a errorTablero
    if(error instanceof ErrorTablero){
      //Muestra ek mensaje de error y se sale
      avisar(error.message);
      return;
    }
    //si el error es de otro tipo lo vuelve a lanzar
    throw error;
  }
  //Si no hay error limpia avisos
  avisar("");
  //actualizo el tablero con pintar
  pintar();
  //ejecuto la funcion al cambiar y le paso el tablero actualizado.
  alCambiar(tablero)
}

delegar(columnas, "click", 'button[data-accion]', (boton) => {
  //busco la tarjeta del boton pulsado
  const tarjeta = boton.closest(".tarjeta");
  //obtengo el id de la tarea
  const id = Number(tarjeta.dataset.id);
  //obtengo la accion que el boton tiene asignada
  const accion = boton.dataset.accion;

  //si el boton tiene empezar, mueve la tarea a en curso
  if(accion === "empezar"){
    cambiar(() => tablero.mover(id, "En curso")); 
    //si el boton tiene volver, mueve la tarea a en curso
  } else if(accion === "volver"){
    cambiar(() => tablero.mover(id, "Por hacer"));
    //si el boton tiene completar, completa la tarea
  } else if(accion === "completar"){
    cambiar(() => tablero.completar(id));
  }
})

  // ✍️ B6 · submit de `form`: preventDefault, leerFormulario, validar y mostrarErrores. Si hay errores,
  //   no se crea nada. Si no, tablero.crearTarea(datos) (como un cambio más) y form.reset().
  //listener al formulario para ver cuando se envia.
  form.addEventListener("submit", (evento) => {
    //para evitar que se recarge la pagina:
    evento.preventDefault();
    //Guardo los valores que se han introducido al formulario
    const datos = leerFormulario(form);
    //Valido los datos, y muestro los errores que se han encontrado
    const errores = validar(datos);
    mostrarErrores(form, errores);

    //Compruebo si hay errores, y si errores es mayor a 0 me salgo.
    if(Object.keys(errores).length > 0){
      return;
    }

    //si no hay errores creo la tarea
    cambiar(() => tablero.crearTarea(datos));
    //despues de crear la tarea limpio los campos del formulario.
    form.reset();
  });


  pintar();
  return { pintar };
}

(void ACCIONES, ErrorTablero, delegar, leerFormulario, mostrarErrores, pintarLista); // (borra esta línea cuando los uses)
