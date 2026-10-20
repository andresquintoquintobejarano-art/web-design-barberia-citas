import { NavLink, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard.jsx";
import CitaDetalle from "./pages/CitaDetalle.jsx";
import Configuracion from "./pages/Configuracion.jsx";

export default function App() {
  return (
    <>
      <nav>
        <NavLink to="/">Citas</NavLink>
        <NavLink to="/configuracion">Configuración / IA</NavLink>
      </nav>
      <main>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/citas/:id" element={<CitaDetalle />} />
          <Route path="/configuracion" element={<Configuracion />} />
        </Routes>
      </main>
    </>
  );
}
