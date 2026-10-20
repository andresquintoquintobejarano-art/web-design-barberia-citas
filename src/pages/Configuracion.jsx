import { useState } from "react";
import { preguntarIA } from "../services/api.js";

export default function Configuracion() {
  const [prompt, setPrompt] = useState("Sugiere un recordatorio amable para un cliente con cita mañana a las 3 pm.");
  const [respuesta, setRespuesta] = useState("");

  const enviar = async () => {
    const r = await preguntarIA(prompt);
    setRespuesta(r.text ?? r.error ?? "");
  };

  return (
    <>
      <h1>Configuración / Asistente IA (Gemini)</h1>
      <textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} />
      <button onClick={enviar}>Generar mensaje</button>
      {respuesta && <div className="card">{respuesta}</div>}
    </>
  );
}
