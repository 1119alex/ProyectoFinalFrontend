import { useEffect, useState } from "react";
import api from "../services/api";
import TaskList from "../components/TaskList";
import TaskForm from "../components/TaskForm";
import Navbar from "../components/Navbar";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [filters, setFilters] = useState({
    status: "",
    search: "",
    dueDate: "",
  });

  const fetchTasks = async () => {
    try {
      let query = "";
      const params = [];

      if (filters.status) params.push(`status=${filters.status}`);
      if (filters.search) params.push(`search=${filters.search}`);
      if (filters.dueDate) params.push(`dueDate=${filters.dueDate}`);

      if (params.length) query = "?" + params.join("&");

      const res = await api.get(`/tasks${query}`);
      setTasks(res.data);
    } catch (err) {
      console.error("Error al obtener tareas", err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [filters]);

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const clearFilters = () => {
    setFilters({
      status: "",
      search: "",
      dueDate: "",
    });
  };

  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <h2 className="mb-4">Panel de Tareas</h2>

        {/* Filtros */}
        <div className="row g-2 mb-4">
          <div className="col-md-3">
            <select
              name="status"
              className="form-select"
              value={filters.status}
              onChange={handleChange}
            >
              <option value="">-- Estado --</option>
              <option value="pendiente">Pendiente</option>
              <option value="en progreso">En Progreso</option>
              <option value="completada">Completada</option>
            </select>
          </div>

          <div className="col-md-4">
            <input
              type="text"
              name="search"
              className="form-control"
              placeholder="Buscar por título o palabra"
              value={filters.search}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-3">
            <input
              type="date"
              name="dueDate"
              className="form-control"
              value={filters.dueDate}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-2">
            <button className="btn btn-secondary w-100" onClick={clearFilters}>
              Limpiar filtros
            </button>
          </div>
        </div>

        <TaskForm onTaskCreated={fetchTasks} />
        <TaskList tasks={tasks} refreshTasks={fetchTasks} />
      </div>
    </>
  );
}

export default Dashboard;
