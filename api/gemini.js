// Vercel Serverless Function - Esqueleto de integración con Gemini API (REST).
export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();
  try {
    const { prompt } = req.body;
    const r = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent",
      {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-goog-api-key": process.env.GEMINI_API_KEY },
        body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
      }
    );
    const data = await r.json();
    res.json({ text: data.candidates?.[0]?.content?.parts?.[0]?.text ?? "" });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
