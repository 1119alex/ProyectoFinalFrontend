// src/components/Layout.js
import { Link } from 'react-router-dom';

const Layout = ({ children }) => {
  const isLoggedIn = !!localStorage.getItem('token');

  return (
    <div>
      <nav>
        <Link to="/">Inicio</Link>
        {!isLoggedIn ? (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Registro</Link>
          </>
        ) : (
          <button onClick={() => {
            localStorage.removeItem('token');
            window.location.reload();
          }}>
            Cerrar sesión
          </button>
        )}
      </nav>
      <main>{children}</main>
    </div>
  );
};

export default Layout;