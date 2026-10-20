// Vercel Serverless Function - Google Sheets API.
// Hojas esperadas: Clientes, Barberos, Servicios, Citas (fila 1 = encabezados).
import { google } from "googleapis";

const RECURSOS = ["clientes", "barberos", "servicios", "citas"];

function normalizarClave(raw = "") {
  let k = raw.trim().replace(/^"?private_key"?\s*:\s*/, "").replace(/,$/, "").trim();
  if (/^["'].*["']$/.test(k)) k = k.slice(1, -1);
  return k.replace(/\\n/g, "\n");
}

function sheetsClient() {
  const faltan = ["GOOGLE_SHEET_ID", "GOOGLE_SERVICE_ACCOUNT_EMAIL", "GOOGLE_PRIVATE_KEY"].filter(
    (v) => !process.env[v]
  );
  if (faltan.length) throw new Error(`Faltan variables de entorno: ${faltan.join(", ")}`);

  const auth = new google.auth.JWT({
    email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key: normalizarClave(process.env.GOOGLE_PRIVATE_KEY),
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
  return google.sheets({ version: "v4", auth });
}

// Busca el nombre real de la pestaña ignorando mayúsculas, tildes y espacios sobrantes.
const limpio = (t = "") => t.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, "").toLowerCase();
let pestanas = null;

async function nombreReal(nombre) {
  if (!pestanas) {
    const meta = await sheetsClient().spreadsheets.get({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      fields: "sheets.properties.title",
    });
    pestanas = meta.data.sheets.map((s) => s.properties.title);
  }
  const real = pestanas.find((t) => limpio(t) === limpio(nombre));
  if (!real) throw new Error(`No existe la pestaña "${nombre}". Pestañas encontradas: ${pestanas.join(", ")}`);
  return real;
}

async function leerHoja(nombre) {
  const real = await nombreReal(nombre);
  const res = await sheetsClient().spreadsheets.values.get({
    spreadsheetId: process.env.GOOGLE_SHEET_ID,
    range: `'${real.replace(/'/g, "''")}'!A1:Z`,
  });
  const [head = [], ...rows] = res.data.values || [];
  // Limpia los encabezados: minúsculas, sin tildes, espacios ni caracteres invisibles.
  const cols = head.map((h) =>
    String(h).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9_]/g, "")
  );
  return rows.map((r) => Object.fromEntries(cols.map((h, i) => [h, r[i] ?? ""])));
}

// Une cada cita con los nombres de cliente, barbero y servicio.
async function citasConNombres() {
  const [citas, clientes, barberos, servicios] = await Promise.all([
    leerHoja("Citas"), leerHoja("Clientes"), leerHoja("Barberos"), leerHoja("Servicios"),
  ]);
  const nombre = (lista, id) => lista.find((x) => x.id === id)?.nombre ?? id;
  return citas.map((c) => ({
    ...c,
    cliente: nombre(clientes, c.cliente_id),
    barbero: nombre(barberos, c.barbero_id),
    servicio: nombre(servicios, c.servicio_id),
  }));
}

export default async function handler(req, res) {
  try {
    if (req.method === "GET") {
      const { id, recurso } = req.query;
      if (recurso) {
        const r = String(recurso).toLowerCase();
        if (!RECURSOS.includes(r)) return res.status(400).json({ error: "Recurso no válido" });
        return res.json(await leerHoja(r[0].toUpperCase() + r.slice(1)));
      }
      const citas = await citasConNombres();
      return res.json(id ? citas.find((c) => c.id === id) ?? null : citas);
    }

    if (req.method === "POST") {
      const { cliente_id, barbero_id, servicio_id, fecha, hora } = req.body || {};
      if (!cliente_id || !barbero_id || !servicio_id || !fecha || !hora) {
        return res.status(400).json({ error: "Faltan campos obligatorios" });
      }
      const id = `C${Date.now()}`;
      await sheetsClient().spreadsheets.values.append({
        spreadsheetId: process.env.GOOGLE_SHEET_ID,
        range: `'${await nombreReal("Citas")}'!A1`,
        valueInputOption: "USER_ENTERED",
        requestBody: { values: [[id, cliente_id, barbero_id, servicio_id, fecha, hora, "pendiente"]] },
      });
      return res.status(201).json({ id });
    }

    res.status(405).end();
  } catch (e) {
    const msg = e?.response?.data?.error?.message || e.message;
    res.status(500).json({ error: msg });
  }
}