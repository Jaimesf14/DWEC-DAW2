import { Tarea } from "./Tarea.js";
import { PruebasFallidasError } from "./errores.js";

export class TareaConDispositivos extends Tarea{
    #dispositivos
    // string, string ("baja" | "media" | "alta"), string "AAAA-MM-DD" | null, string[]
    constructor(titulo, prioridad, limite, dispositivos){
        super(titulo, prioridad, limite);
        this.#dispositivos = dispositivos.map((nombre) => ({nombre, fallos: null}));
    }

    get dispositivos(){
        return this.#dispositivos.map((d) => ({...d}));
    }


    //Asi es como lo tenia antes de la pista. Lo he comentado y cambiado por si al hacer comprobar paso daba fallo.
    // probar(nombre, fallos){
    //     for (const dispositivo of this.#dispositivos){
    //         if(dispositivo.nombre !== nombre || !Number.isInteger(fallo) || fallos < 0){
    //             throw new TypeError("Nombre o error no es valido");
    //         }
    //         dispositivo.fallos = fallos;
    //     }
    // }


    probar(nombre, fallos){
        const d = this.#dispositivos.find((x) => x.nombre === nombre);
        if(d.nombre !== nombre){
            throw new TypeError("Nombre no está definido");
        }
        if(!Number.isInteger(d.fallos) || d.fallos < 0){
            throw new TypeError("Fallos no es de tipo entero o es menor a 1");
        }
        d.fallos = fallos
    }


    comprobarPaso(desde, hasta) {
        if (hasta !== "Hecho") return;            // la regla es para DARLA POR HECHA
        const fallidos = this.#dispositivos.filter((d) => d.fallos !== 0).map((d) => d.nombre);
        if (fallidos.length > 0) throw new PruebasFallidasError(fallidos);
    }
}