import { Tarea } from "./Tarea.js";
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
        if (hasta !== "Hecho") return;            
        const fallidos = /* TU TURNO: los nombres cuyo fallos NO es 0 (null también cuenta) */;
        if (fallidos.length > 0) throw new PruebasFallidasError(fallidos);
    }
}