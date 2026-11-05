// Tablero.js — Bloque A · ✍️ A3 (el tablero) y A5 (reglas).
// En el bloque C volverás aquí para ✍️ C4 (toJSON y desdeJSON).
// El tablero TIENE tres columnas: es composición, no hereda de nadie.
import { Columna } from "./Columna.js";
import { ColumnaLlenaError, MovimientoNoPermitidoError } from "./errores.js";
import { Tarea } from "./Tarea.js";
import { TareaRecurrente } from "./TareaRecurrente.js";
import { aDatos, desdeDatos } from "./serializar.js";

export class Tablero {
  static COLUMNAS = Object.freeze(["Por hacer", "En curso", "Hecho"]);
  static VERSION_DATOS = 1; // (bloque C) si algún día cambia el formato guardado, se sube
  // Privado: #columnas, un Map nombre → Columna
  #columnas = new Map();
  // ✍️ A3 ──────────────────────────────────────────────────────────────────────
  constructor(limiteEnCurso = 3) {
    // Crea las tres columnas; solo «En curso» lleva límite WIP (limiteEnCurso)
    //añadimos al map
    this.#columnas.set("Por hacer", new Columna("Por hacer"));
    this.#columnas.set("En curso", new  Columna("En curso", limiteEnCurso));
    this.#columnas.set("Hecho", new Columna("Hecho"));
  }

  // static desde(datos, limiteEnCurso): un Tablero con una tarea por cada objeto de datos
  //   (usa crearTarea)
  static desde(datos, limiteEnCurso){
    const nuevoTablero = new Tablero(limiteEnCurso);
    for (const dato of datos){
      nuevoTablero.crearTarea(dato);
    }
    return nuevoTablero;
  }

  // columna(nombre): la Columna, o un Error si no existe (que el mensaje lleve el nombre)
  // get columnas: array con las tres columnas, en orden
  columna(nombre){
    if (this.#columnas.has(nombre) === false){
      throw new Error(`Error:No existe ninguna columna con el nombre ${nombre}.`)
    }
  return this.#columnas.get(nombre);
  }

  get columnas(){
    const ordenColumnas = [];
    ordenColumnas.push(this.#columnas.get("Por hacer"));
    ordenColumnas.push(this.#columnas.get("En curso"));
    ordenColumnas.push(this.#columnas.get("Hecho"));
    return ordenColumnas;
  }


  // crearTarea(datos): TareaRecurrente si datos trae cadaDias, Tarea si no → a «Por hacer»
  //   y la devuelve. datos es un objeto { titulo, prioridad, limite, cadaDias }: saca cada campo
  //   y pásaselo al constructor, en su orden (new Tarea(datos) NO vale: espera el título)
  crearTarea(datos){
    let tarea;
    if (Object.hasOwn(datos, "cadaDias")){
      tarea = new TareaRecurrente(datos.titulo, datos.prioridad, datos.limite, datos.cadaDias);
    } else {
      tarea = new Tarea(datos.titulo, datos.prioridad, datos.limite);
    }
    this.columna("Por hacer").añadir(tarea);
    return tarea;
  }

  // buscar(id): la tarea, esté en la columna que esté, o null
  // dondeEsta(id): la Columna donde está, o null
  buscar(id){
    for (const columna of this.#columnas.values()){
      for (const tarea of columna.tareas){
        if (tarea.id === id){
          return tarea;
        } 
      }
    }
    return null
  }

  dondeEsta(id){
    for (const columna of this.#columnas.values()){
      for (const tarea of columna.tareas){
        if (tarea.id === id){
          return columna;
        } 
      }
    }
    return null;
  }

  // mover(id, destino): Error si no existe la tarea · Error si la columna destino está llena
  //   (¡comprueba ANTES de quitarla de su columna, o se perdería!) · la mueve y la devuelve
  mover(id, destino){
    const tarea = this.buscar(id);
    //comprobar si existe tarea
    if(tarea === null){
      throw new Error(`Error: la tarea con id ${id} no existe`);
    }
    //coger la columna de origen
    const columnaOrigen = this.dondeEsta(id);
    //comprobar si esta llena
    const columnaDestino = this.columna(destino);
    if (columnaDestino.llena === true){
      throw new Error(`Error: la columna ${destino} está llena`);
    }
    //quitarla tarea del origen y añadirla a la columna de destino.
    columnaOrigen.quitar(id);
    columnaDestino.añadir(tarea);
    return tarea;
  }

  // completar(id): la mueve a «Hecho» y añade a «Por hacer» lo que devuelva tarea.alCompletar()
  //   ⚠️ Sin preguntar si es recurrente: eso es el polimorfismo
  completar(id){
    const tareaMovida = this.mover(id, "Hecho");
    const tareasNuevas = tareaMovida.alCompletar();
    for (const tarea of tareasNuevas){
      this.columna("Por hacer").añadir(tarea);
    }
    return tareaMovida;
  }

  // resumen(hoy = new Date()): { porHacer, enCurso, hecho, vencidas }
  //   vencidas = las que estaVencida(hoy) y NO están en «Hecho»
  resumen(hoy = new Date()){
    let porHacer = 0;
    let enCurso = 0;
    let hecho = 0;
    let vencidas = 0;
    for(const columna of this.#columnas.values()){
      if(columna.nombre === "Por hacer"){
        porHacer = columna.tareas.length;
      } else if(columna.nombre === "En curso"){
        enCurso = columna.tareas.length;
      } else if(columna.nombre === "Hecho"){
        hecho = columna.tareas.length;
      }
      if(columna.nombre !== "Hecho"){
        for(const tarea of columna.tareas){
          if (tarea.estaVencida(hoy)){
            vencidas++;
          }
        }
      }
    }
    return {porHacer, enCurso, hecho, vencidas}
  }

  // ✍️ A5 · Reglas (vuelves a mover y completar) ─────────────────────────────────
  //   - Columna llena → ColumnaLlenaError (en vez de un Error cualquiera)
  //   - Sacar una tarea de «Hecho», o «moverla» a la columna en la que ya está →
  //     MovimientoNoPermitidoError. Todo se comprueba ANTES de tocar nada.
  //   Pista: mover y completar hacen casi lo mismo. Un método privado #trasladar(id, destino)
  //   con las comprobaciones evita escribirlas dos veces.

  // ✍️ C4 (bloque C) ────────────────────────────────────────────────────────────
  // toJSON(): { version, limiteEnCurso, columnas: { "Por hacer": [datos…], … } }
  //   JSON.stringify(tablero) lo llama solo. Sin él sale "{}": los # no se ven. Usa aDatos.

  /** Lo contrario de toJSON: el MISMO tablero (columnas, ids y límite WIP). Lanza si no encaja. */
  static desdeJSON(datos) {
    throw new Error("Sin hacer");
  }
}

// Comprueba con:  docker compose run --rm web npm test bloque-a
(void Columna,
  ColumnaLlenaError,
  MovimientoNoPermitidoError,
  Tarea,
  TareaRecurrente,
  aDatos,
  desdeDatos); // (borra esta línea cuando los uses)
