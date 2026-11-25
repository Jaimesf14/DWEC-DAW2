// persistencia.js — Bloque C · ✍️ C5 y C6. Guardar el tablero tras cada cambio y recuperarlo al abrir la página.
// Usa guardar, cargar y borrar (almacen.js, resuelto), tu obtenerJSON (red.js) y Tablero.desdeJSON.
import { Tablero } from "../modelo/Tablero.js";
import { borrar, cargar, guardar } from "./almacen.js";
import { obtenerJSON } from "./red.js";

export const CLAVE = "dwec-p2-tablero";

// ✍️ C5 · guardarTablero(tablero, storage = localStorage): guarda el tablero en CLAVE
export function guardarTablero(tablero, storage = localStorage) {
  // guardar ya hace el JSON.stringify, y JSON.stringify ya a toJSON
  guardar(CLAVE, tablero, storage);
}

// ✍️ C6 · async arrancar({ storage = localStorage, fetchFn = fetch, url = "/tareas-iniciales.json",
//                  limiteEnCurso = 3 } = {}) → { tablero, origen, error? }
//   Los tres casos («guardado», «inicial» y «vacio») están en el enunciado (bloque C).
export async function arrancar({
  storage = localStorage,
  fetchFn = fetch,
  url = "/tareas-iniciales.json",
  limiteEnCurso = 3,
} = {}) {
  
  //CArgo los datos guardados. Devuelve null si no hay nada o está roto
  const datosGuardados = cargar(CLAVE, null, storage);
  if (datosGuardados !== null){
    try{
      //coonvierto datos guardados a un objeto TAblero. Devuelvo origen guardado para que se sepa que procede de la carga de datos
      const tablero = Tablero.desdeJSON(datosGuardados);
      return{
        tablero,
        origen: "guardado"
      };
    } catch (error){
      //si el json no es valido lo borro
      borrar(CLAVE, storage)
    }  
  }

  //Si no hay datos guardados, descargo los datos iniciales y un tablero a partir de los datoos iniciales
  try {
    const datos = await obtenerJSON(url, fetchFn);
    const tablero = Tablero.desde(datos, limiteEnCurso);

    return {
      tablero,
      origen: "inicial"
    };

  } catch (error) {
    //si falla la descarga creu un tablero vacio, e indico que hay un error
    return {
      tablero: new Tablero(limiteEnCurso),
      origen: "vacio",
      error: error.message
    };

  }
}


