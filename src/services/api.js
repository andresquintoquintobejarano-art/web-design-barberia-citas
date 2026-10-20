// Cliente del frontend: solo habla con nuestras funciones /api (las claves viven en el servidor).
async function pedir(url, opciones) {
  const r = await fetch(url, opciones);
  let data = null;
  try { data = await r.json(); }
  catch { throw new Error("La API no responde. Ejecuta el proyecto con: npx vercel dev"); }
  if (!r.ok) throw new Error(data?.error || `Error ${r.status}`);
  return data;
}

const post = (url, body) =>
  pedir(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });

export const getCitas = () => pedir("/api/citas");
export const getCita = (id) => pedir(`/api/citas?id=${encodeURIComponent(id)}`);
export const crearCita = (data) => post("/api/citas", data);
export const getRecurso = (nombre) => pedir(`/api/citas?recurso=${nombre}`); // clientes | barberos | servicios
export const preguntarIA = (prompt) => post("/api/gemini", { prompt });
