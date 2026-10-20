import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getCita } from "../services/api.js";

export default function CitaDetalle() {
  const { id } = useParams();
  const [cita, setCita] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    getCita(id).then(setCita).catch((e) => setError(e.message));
  }, [id]);

  return (
    <>
      <Link to="/">← Volver</Link>
      <h1>Detalle de la cita #{id}</h1>
      {error && <p className="card">⚠️ {error}</p>}
      {!error && !cita && <p>Cargando...</p>}
      {cita && (
        <div className="card">
          <p><b>Cliente:</b> {cita.cliente}</p>
          <p><b>Barbero:</b> {cita.barbero}</p>
          <p><b>Servicio:</b> {cita.servicio}</p>
          <p><b>Fecha:</b> {cita.fecha} {cita.hora}</p>
          <p><b>Estado:</b> {cita.estado}</p>
        </div>
      )}
    </>
  );
}
