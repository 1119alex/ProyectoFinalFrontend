import TaskCard from "./TaskCard";

function TaskList({ tasks, refreshTasks }) {
  if (!tasks.length) return <p className="text-muted">No tienes tareas aún.</p>;

  return (
    <div className="row">
      {tasks.map((task) => (
        <div className="col-md-6 mb-3" key={task.id}>
          <TaskCard task={task} refreshTasks={refreshTasks} />
        </div>
      ))}
    </div>
  );
}

export default TaskList;
