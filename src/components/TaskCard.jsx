import { useState } from "react";
import api from "../services/api";

function TaskCard({ task, refreshTasks }) {
  const [editMode, setEditMode] = useState(false);
  const [edited, setEdited] = useState({
    title: task.title,
    description: task.description || "",
    dueDate: task.dueDate || "",
    status: task.status,
  });

  const handleChange = (e) => {
    setEdited({ ...edited, [e.target.name]: e.target.value });
  };

  const saveChanges = async () => {
    // reglas de edición
    if (task.status === "completada") return alert("No se puede editar una tarea completada.");

    if (task.status === "pendiente" && edited.status !== "pendiente" && edited.status !== "en progreso") {
      return alert("Solo puedes pasar de pendiente a en progreso.");
    }

    if (task.status === "en progreso" && edited.status === "pendiente") {
      return alert("No puedes volver a pendiente desde en progreso.");
    }

    try {
      await api.put(`/tasks/${task.id}`, edited);
      setEditMode(false);
      refreshTasks();
    } catch (err) {
      console.error("Error al actualizar", err);
    }
  };

  const markAsCompleted = async () => {
    if (task.status !== "en progreso") return alert("Solo puedes completar tareas en progreso.");
    try {
      await api.put(`/tasks/${task.id}`, { status: "completada" });
      refreshTasks();
    } catch (err) {
      console.error("Error al marcar como completada", err);
    }
  };

  const deleteTask = async () => {
    if (task.status !== "completada") return alert("Solo puedes eliminar tareas completadas.");
    try {
      await api.delete(`/tasks/${task.id}`);
      refreshTasks();
    } catch (err) {
      console.error("Error al eliminar tarea", err);
    }
  };

  return (
    <div className="card h-100">
      <div className="card-body">
        {editMode ? (
          <>
            <input
              name="title"
              className="form-control mb-2"
              value={edited.title}
              onChange={handleChange}
            />
            <input
              name="description"
              className="form-control mb-2"
              value={edited.description}
              onChange={handleChange}
            />
            <input
              name="dueDate"
              type="date"
              className="form-control mb-2"
              value={edited.dueDate}
              onChange={handleChange}
            />
            <select
              name="status"
              className="form-select mb-2"
              value={edited.status}
              onChange={handleChange}
            >
              <option value="pendiente">Pendiente</option>
              <option value="en progreso">En Progreso</option>
              <option value="completada" disabled>Completada</option>
            </select>
            <button className="btn btn-success btn-sm me-2" onClick={saveChanges}>
              Guardar
            </button>
            <button className="btn btn-secondary btn-sm" onClick={() => setEditMode(false)}>
              Cancelar
            </button>
          </>
        ) : (
          <>
            <h5 className="card-title">{task.title}</h5>
            <p className="card-text">{task.description}</p>
            <p className="card-text">
              <small className="text-muted">Estado: {task.status}</small>
              {task.dueDate && (
                <span className="ms-3">
                  <small className="text-muted">Fecha límite: {task.dueDate}</small>
                </span>
              )}
            </p>

            <div className="mt-2 d-flex gap-2 flex-wrap">
              {task.status === "en progreso" && (
                <button className="btn btn-success btn-sm" onClick={markAsCompleted}>
                  Completar
                </button>
              )}
              {task.status === "completada" && (
                <button className="btn btn-danger btn-sm" onClick={deleteTask}>
                  Eliminar
                </button>
              )}
              {task.status !== "completada" && (
                <button className="btn btn-outline-primary btn-sm" onClick={() => setEditMode(true)}>
                  Editar
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default TaskCard;
