// Columna.js — Bloque A · ✍️ A2: una columna del tablero («Por hacer», «En curso», «Hecho»).
// En kanban, una columna puede tener un límite WIP (Work In Progress): «En curso» no admite más
// de 3 tareas a la vez, para no empezar mil cosas y no acabar ninguna.
import { Tarea } from "./Tarea.js";

export class Columna {
  #tareas = []

  constructor(nombre, limiteWip = null) {
    // 1 · nombre: texto no vacío (sin espacios a los lados) → si no, TypeError
    //     limiteWip: null (sin límite) o un entero ≥ 1 → si no, RangeError
    if (typeof nombre !== "string" || nombre.trim() === ""){
      throw new TypeError("Error: nombre no es texto o está vacío");
    }
    if (limiteWip !== null && (!Number.isInteger(limiteWip) || limiteWip < 1)){
      throw new RangeError("Error: limiteWip no puede ser un entero menor a 1");
    }
    this.nombre = nombre.trim();
    this.limiteWip = limiteWip;
    
  }

  // 2 · get llena: true si hay límite y ya hay tantas tareas como el límite
  get llena(){
    let resultado = false;
    if(this.limiteWip !== null && this.limiteWip <= this.#tareas.length){
      resultado = true;
    }
    return resultado;
  }


  // 3 · get tareas: una COPIA del array (que nadie pueda tocar el tuyo desde fuera)
  get tareas(){
    const tareasCopia = [...this.#tareas]
    return tareasCopia;
  }

  // 4 · añadir(tarea): TypeError si no es instanceof Tarea · Error («… está llena …») si está
  //     llena · si no, la guarda y la devuelve
  añadir(tarea){
    if (tarea instanceof Tarea === false){
      throw new TypeError("Error: Tarea no es instanceof tarea")
    }
    if(this.llena === true){
      throw new Error("Error: la columna está llena")
    } else {
      this.#tareas.push(tarea);
      return tarea;
    }
  }


  // 5 · quitar(id): la saca del array y la devuelve · Error («… no está …») si no la encuentra
  //     Pista: findIndex + splice
  quitar(id){
    //pongo -1 para hacer la comprobacion de que no existe, ya que no puedo poner 0 porque es una posición
    let indiceId = -1;
    indiceId = this.#tareas.findIndex((t)=> t.id === id);
    if(indiceId === -1){
      throw new Error(`El id ${id} no está`);
    }
    let tareaEliminada = this.#tareas.splice(indiceId, 1);
    //devuelvo 0 ya que va a ser la primera posicion(y la unica)
    return tareaEliminada[0];
  }

  // 6 · tiene(id): true / false. Pista: some
  tiene(id){
    return this.#tareas.some((t)=>t.id === id)

  }
  // 7 · ordenadas(): un array NUEVO ordenado: primero prioridad alta (usa t.peso), y a igual
  //     prioridad, el límite más cercano; las que no tienen límite, al final.
  //     Pista: [...this.#tareas].sort((a, b) => …) — ¿por qué la copia?
  ordenadas(){
    const tareasOrdenadas = [...this.#tareas].sort((a, b)=> {
      //si tarea no son iguales ordena de prioridad mas alta a mas baja,y si son iguales compara por limite
      if(a.peso !== b.peso){
        return b.peso - a.peso;
      } else {
        if(a.limite === null){
          return 1;
        }
        if(b.limite === null){
          return -1;
        }
      }
      return new Date(a.limite)-(new Date(b.limite))
    })
    return tareasOrdenadas
  }
  
}

// Comprueba con:  docker compose run --rm web npm test 3-columna
