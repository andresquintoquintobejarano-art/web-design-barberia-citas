// Uso: node scripts/arreglar-env.js
// Arregla la línea de la clave privada del .env (formato JSON -> formato .env)
// y comprueba que la clave sea válida. NUNCA imprime la clave.
import fs from "node:fs";
import crypto from "node:crypto";

const ruta = ".env";
if (!fs.existsSync(ruta)) { console.error("No encuentro .env en esta carpeta."); process.exit(1); }

const lineas = fs.readFileSync(ruta, "utf8").split(/\r?\n/).filter((l) => l.trim());
const salida = [];
let clave = "";

for (const l of lineas) {
  const m = l.match(/^\s*(?:GOOGLE_PRIVATE_KEY\s*=|"?private_key"?\s*:)\s*(.*)$/);
  if (m) {
    let v = m[1].trim().replace(/,$/, "").trim();
    if (/^["'].*["']$/.test(v)) v = v.slice(1, -1);
    clave = v.replace(/\\n/g, "\n");
  } else if (/^[A-Z_]+=/.test(l)) {
    salida.push(l);
  }
}

if (!clave.includes("BEGIN PRIVATE KEY")) {
  console.error("No encontré una clave privada completa en el .env. Crea una clave JSON nueva y vuelve a intentar.");
  process.exit(1);
}
try { crypto.createPrivateKey(clave); }
catch { console.error("La clave está incompleta o dañada. Crea una clave JSON nueva."); process.exit(1); }

salida.push('GOOGLE_PRIVATE_KEY="' + clave.trim().replace(/\n/g, "\\n") + '\\n"');
fs.writeFileSync(ruta, salida.join("\n") + "\n");
console.log("Listo: .env corregido y clave válida. Variables:", salida.map((s) => s.split("=")[0]).join(", "));
