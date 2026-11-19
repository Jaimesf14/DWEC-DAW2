// tarjeta.js — Bloque B · 👀 EJEMPLO RESUELTO (crearTarjeta) y ✍️ B1 (pintarLista).
import { formatear } from "../modelo/fechas.js";

/** Tarea → <article class="tarjeta tarjeta--alta" data-id="3"> con su título y su límite */
export function crearTarjeta(tarea, hoy = new Date()) {
  const tarjeta = document.createElement("article");
  tarjeta.classList.add("tarjeta", `tarjeta--${tarea.prioridad}`);
  tarjeta.classList.toggle("tarjeta--vencida", tarea.estaVencida(hoy));
  tarjeta.dataset.id = tarea.id; // en el HTML: data-id="3" (siempre texto)

  const titulo = document.createElement("h3");
  titulo.textContent = tarea.titulo; // textContent, NUNCA innerHTML con lo que escribe el usuario
  tarjeta.append(titulo);

  if (tarea.limite) {
    const limite = document.createElement("p");
    limite.className = "tarjeta__limite";
    limite.textContent = `Límite: ${formatear(tarea.limite)}`;
    tarjeta.append(limite);
  }
  return tarjeta;
}

// ✍️ B1 · pintarLista(contenedor, tareas, hoy = new Date())
//   - Vacía el contenedor y pone una tarjeta por tarea (usa crearTarjeta), en el mismo orden.
//   - Pintar dos veces NO puede duplicar: primero vacía. Pista: contenedor.replaceChildren(...)
//   - Sin tareas: deja SOLO un <p class="vacia">Sin tareas</p>
export function pintarLista(contenedor, tareas, hoy = new Date()) {
  // Vacío el contenedor para que no se dupliquen las tarjetas
  contenedor.replaceChildren();
  // compruebo que el array de tareas está vacío, y si lo está, creo un elemento p, le añado la clase vacía, y le introduzco un texto.
  if(tareas.length === 0){
    const elemento = document.createElement("p");
    elemento.className = "vacia";
    elemento.textContent = "Sin tareas";

    //añado el párrafo al contenedor
    contenedor.append(elemento);

    // cuando haga eso corto para que no siga recorriendo el array.
    return;
  }
  //Recorro tareas para poder crear las tarjetas en el contenedor por cada tarea.
  for (const tarea of tareas){
    // creo la tarjeta asignandole la tarea y la fecha actual.
    const tarjeta = crearTarjeta(tarea, hoy);
    //Añado la terjeta al contenedor.
    contenedor.append(tarjeta);
  }

}
