import { useState } from "react";
import api from "../services/api";

function TaskForm({ onTaskCreated }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/tasks", {
        title,
        description,
        status: "pendiente",
        dueDate,
      });
      setTitle("");
      setDescription("");
      setDueDate("");
      onTaskCreated();
    } catch (err) {
      console.error("Error al crear tarea", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="row g-2">
        <div className="col-md-3">
          <input
            type="text"
            className="form-control"
            placeholder="Título *"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="col-md-3">
          <input
            type="text"
            className="form-control"
            placeholder="Descripción"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="col-md-3">
          <input
            type="date"
            className="form-control"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>
        <div className="col-md-3">
          <button type="submit" className="btn btn-primary w-100">
            Crear Tarea
          </button>
        </div>
      </div>
    </form>
  );
}

export default TaskForm;
