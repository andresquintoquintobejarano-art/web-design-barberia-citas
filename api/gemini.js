// Vercel Serverless Function - Esqueleto de integración con Gemini API (REST).
export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();
  if (!process.env.GEMINI_API_KEY) {
    return res.status(500).json({ error: "Falta la variable de entorno GEMINI_API_KEY" });
  }
  try {
    const { prompt } = req.body;
    // gemini-2.0-flash fue retirado por Google. El modelo se puede cambiar con GEMINI_MODEL sin tocar el código.
    const modelo = process.env.GEMINI_MODEL || "gemini-3.8-flash";
    const r = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${modelo}:generateContent`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-goog-api-key": process.env.GEMINI_API_KEY },
        body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
      }
    );
    const data = await r.json();
    // Si Gemini responde con error (clave inválida, modelo no disponible, límite), se muestra el motivo
    if (!r.ok || data.error) {
      return res.status(r.status || 500).json({ error: data.error?.message || `Gemini respondió ${r.status}` });
    }
    res.json({ text: data.candidates?.[0]?.content?.parts?.[0]?.text ?? "" });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
