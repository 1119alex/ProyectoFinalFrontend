import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
      <Link className="navbar-brand" to={user ? "/dashboard" : "/"}>
        Gestor de Tareas
      </Link>

      <div className="collapse navbar-collapse justify-content-end">
        <ul className="navbar-nav">
          {!user && (
            <>
              <li className="nav-item">
                <Link
                  to="/login"
                  className={`nav-link ${location.pathname === "/login" ? "active" : ""}`}
                >
                  Iniciar Sesión
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/register"
                  className={`nav-link ${location.pathname === "/register" ? "active" : ""}`}
                >
                  Registrarse
                </Link>
              </li>
            </>
          )}

          {user && (
            <>
              <li className="nav-item">
                <span className="nav-link text-white">Hola, {user.name}</span>
              </li>
              <li className="nav-item">
                <button className="btn btn-outline-light btn-sm ms-2" onClick={handleLogout}>
                  Cerrar sesión
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
