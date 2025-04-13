import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!validateEmail(email)) {
      return setError("Correo inválido");
    }

    try {
      await axios.post("http://localhost:5000/api/auth/register", {
        name,
        email,
        password,
      });
      navigate("/login");
    } catch (err) {
      setError("No se pudo registrar. Intente con otro correo.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <h2 className="text-center mb-4">Registrarse</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit} className="mx-auto" style={{ maxWidth: 400 }}>
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Nombre completo"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            className="form-control mb-3"
            placeholder="Correo"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            className="form-control mb-3"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="btn btn-success w-100">
            Registrarse
          </button>
        </form>
      </div>
    </>
  );
}

export default Register;
