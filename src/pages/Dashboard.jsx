import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCitas } from "../services/api.js";

export default function Dashboard() {
  const [citas, setCitas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getCitas()
      .then(setCitas)
      .catch((e) => setError(e.message))
      .finally(() => setCargando(false));
  }, []);

  return (
    <>
      <h1>Citas</h1>
      {cargando && <p>Cargando citas...</p>}
      {error && <p className="card">⚠️ No se pudieron cargar las citas: {error}</p>}
      {!cargando && !error && citas.length === 0 && <p>Todavía no hay citas registradas.</p>}
      {citas.length > 0 && (
        <table>
          <thead>
            <tr><th>Fecha</th><th>Cliente</th><th>Barbero</th><th>Servicio</th><th>Estado</th><th></th></tr>
          </thead>
          <tbody>
            {citas.map((c) => (
              <tr key={c.id}>
                <td>{c.fecha} {c.hora}</td>
                <td>{c.cliente}</td>
                <td>{c.barbero}</td>
                <td>{c.servicio}</td>
                <td>{c.estado}</td>
                <td><Link to={`/citas/${c.id}`}>Ver</Link></td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}
