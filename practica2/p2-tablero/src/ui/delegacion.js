// delegacion.js — Bloque B · ✍️ B3 (delegar).

// ✍️ B3 · delegar(contenedor, tipo, selector, manejador)
//   - UN solo addEventListener, en el contenedor (no en cada botón)
//   - Dentro: el elemento que encaja es evento.target.closest(selector). Si lo hay y está DENTRO
//     del contenedor (contenedor.contains(...)), llama a manejador(elemento, evento)
//   - Devuelve una función que quita el listener (removeEventListener con la MISMA función)
export function delegar(contenedor, tipo, selector, manejador) {
  //creo una funcion que actua como listener
  function listener(evento){
    //cojo el elemento o el mas cercano al pulsado
    const elemento_marcado = evento.target.closest(selector);
    //compuebo que no sea nulo
    if(elemento_marcado === null){
      return;
    }
    //compruebo que el contenedor contine el elemento marcado, y si lo contiene añado a manejador  el elemento y el evento
    const existe = contenedor.contains(elemento_marcado);
    if (existe === true){
      manejador(elemento_marcado, evento);
    }
  }
  //añado el listener al contenedor
  contenedor.addEventListener(tipo, listener);

  //devuelvo una función que pueda eliminar el listener
  return function quitarListener(){
    contenedor.removeEventListener(tipo, listener);
  }
}
