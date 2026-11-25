// red.js — Bloque C · ✍️ C2. Pedir un JSON con fetch y async/await, sin fiarse de nada.

// ✍️ C2 · async obtenerJSON(url, fetchFn = fetch) → el JSON ya convertido
//   - const respuesta = await fetchFn(url)
//   - Si !respuesta.ok → lanza un Error con el código (respuesta.status) Y la url en el mensaje
//   - Si la cabecera content-type no incluye "application/json" → lanza un Error con la url
//     (Vite devuelve su index.html, con un 200, cuando el fichero no existe)
//   - Si todo va bien, devuelve respuesta.json()
//   - Los errores de red (sin conexión) NO se capturan aquí: que le lleguen a quien llama
export async function obtenerJSON(url, fetchFn = fetch) {
  // realiza una peticion http a la url. Await espera a que acabe la peticion antes de continuar
  const respuesta = await fetchFn(url);
  //compruebo si respuesta no es ok, y si no lo es lanzo un error. respuesta.ststus es es codigo de estado http
  if(!respuesta.ok){
    throw new Error(`Error ${respuesta.status} al pedir ${url}`);
  }
  //compruebo el tipo de contenido que devuelve el servidor, compruebo si no existe, y si es asi tipo esta vacio
  let tipo = respuesta.headers.get("content-type");
  if (tipo === null){
    tipo = "";
  }
  //si tipo no incluye .../json, no es json
  if(!tipo.includes("application/json")){
    throw new Error(`${url} no es JSON`);
  }
  return respuesta.json();
}
