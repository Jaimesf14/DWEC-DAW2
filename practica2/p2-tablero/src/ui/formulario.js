// formulario.js — Bloque B · 👀 leerFormulario (RESUELTO) y ✍️ B2 (mostrarErrores).

// 👀 Resuelto. Del formulario TODO llega como texto: aquí se limpia y se convierte.
/**
 * Lee el formulario de alta y devuelve los datos LIMPIOS para el modelo:
 * { titulo, prioridad, limite, cadaDias }. Texto sin espacios de más, limite "AAAA-MM-DD" o null,
 * cadaDias un número o undefined (si está vacío).
 */
export function leerFormulario(form) {
  const campos = Object.fromEntries(new FormData(form));
  const datos = {
    titulo: (campos.titulo ?? "").trim(),
    prioridad: campos.prioridad,
    limite: campos.limite ? campos.limite : null,
  };
  if (campos.cadaDias?.trim()) datos.cadaDias = Number(campos.cadaDias);
  return datos;
}

// ✍️ B2 · mostrarErrores(form, errores)   errores = { campo: "mensaje" }
//   - Recorre los <p data-error-de="campo"> del formulario (querySelectorAll)
//   - Si ese campo tiene error: el mensaje en el <p> y aria-invalid="true" en el control
//     (el control es form.elements[campo])
//   - Si no lo tiene: <p> vacío y SIN aria-invalid (removeAttribute)
//   Pista: p.dataset.errorDe es el nombre del campo (data-error-de → dataset.errorDe)
export function mostrarErrores(form, errores) {
  //busco los elementos que contienen el atributo data-error-de
  const parrafos= form.querySelectorAll('[data-error-de]');
  //Recorro los parrafos
  for(const p of parrafos){
    //Obtengo el tipo o mensaje de data -error-de
    const tipo_error = p.dataset.errorDe;
    //obtengo el input que contenga el tipo del error
    const input_error = form.elements[tipo_error];
    //compruebo si hay mensaje
    if(errores[tipo_error]){
      //Escribo el mensaje específico
      p.textContent = errores[tipo_error];

      //añado el atributo arial-invalid=true al input, que indica que el campo tiene un error
      input_error.setAttribute("aria-invalid", "true");
    } else {
      //Si no hay mensaje dejo el parrafo vacio, y elimino del input el arial-invalid, porque si no hay mensaje, no hay errores
      p.textContent ="";
      input_error.removeAttribute("aria-invalid");
    }
  } 
}
