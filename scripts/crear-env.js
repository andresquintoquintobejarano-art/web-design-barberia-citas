// Uso: node scripts/crear-env.js "C:/ruta/a/la-clave.json"
// Crea el .env completo a partir del JSON de la cuenta de servicio. NUNCA imprime la clave.
import fs from "node:fs";
import crypto from "node:crypto";

const SHEET_ID = "1zR5O0NkRwQMvo4KQjHFSmO-babOikizFncLe2JpruQQ";
const ruta = process.argv[2];
if (!ruta || !fs.existsSync(ruta)) {
  console.error('Falta la ruta al JSON. Ejemplo: node scripts/crear-env.js "C:/Users/Usuario/Downloads/clave.json"');
  process.exit(1);
}

const j = JSON.parse(fs.readFileSync(ruta, "utf8"));
if (!j.private_key || !j.client_email) { console.error("Ese JSON no es una clave de cuenta de servicio."); process.exit(1); }
try { crypto.createPrivateKey(j.private_key); } catch { console.error("La clave del JSON está dañada. Crea otra en Google Cloud."); process.exit(1); }

let gemini = "pendiente";
if (fs.existsSync(".env")) {
  const m = fs.readFileSync(".env", "utf8").match(/^GEMINI_API_KEY=(.*)$/m);
  if (m && m[1].trim()) gemini = m[1].trim();
}

fs.writeFileSync(
  ".env",
  [
    `GEMINI_API_KEY=${gemini}`,
    `GOOGLE_SHEET_ID=${SHEET_ID}`,
    `GOOGLE_SERVICE_ACCOUNT_EMAIL=${j.client_email}`,
    `GOOGLE_PRIVATE_KEY="${j.private_key.trim().replace(/\n/g, "\\n")}\\n"`,
    "",
  ].join("\n")
);
console.log("Listo: .env creado con", j.client_email);
console.log("Recuerda compartir la hoja con ese correo como Editor y borrar el JSON de Descargas.");
