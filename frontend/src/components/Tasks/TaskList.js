import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../../AuthContext";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const { logout } = useContext(AuthContext);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/tasks");
        setTasks(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchTasks();
  }, []);

  const handleDelete = async (taskId) => {
    try {
      await axios.delete(`http://localhost:8000/api/tasks/${taskId}`);
      setTasks(tasks.filter((task) => task._id !== taskId));
    } catch (err) {
      console.error(err);
    }
  };

  const handleToggleComplete = async (taskId, currentStatus) => {
    try {
      const newStatus = currentStatus === "completed" ? "open" : "completed";
      await axios.put(`http://localhost:8000/api/tasks/${taskId}`, {
        status: newStatus,
      });
      setTasks(
        tasks.map((task) =>
          task._id === taskId ? { ...task, status: newStatus } : task
        )
      );
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="mt-5">
      {/* <button className="btn btn-danger mb-3" onClick={handleLogout}>
        Logout
      </button> */}
      <h1 className="mb-4">Task List</h1>
      <ul className="list-group">
        {tasks.map((task) => (
          <li key={task._id} className="list-group-item">
            <Link to={`/tasks/${task._id}`}>
              <h3
                style={{
                  textDecoration:
                    task.status === "completed" ? "line-through" : "none",
                }}
              >
                {task.title}
              </h3>
            </Link>
            <p>{task.description}</p>
            <p>Status: {task.status}</p>
            <p>Due Date: {new Date(task.dueDate).toLocaleDateString()}</p>
            <div className="d-flex justify-content-between align-items-center">
              <button
                className={`btn btn-sm ${
                  task.status === "completed" ? "btn-success" : "btn-secondary"
                }`}
                onClick={() => handleToggleComplete(task._id, task.status)}
              >
                {task.status === "completed" ? "Reopen" : "Complete"}
              </button>
              <div>
                <Link
                  to={`/tasks/${task._id}/edit`}
                  className="btn btn-warning btn-sm me-2"
                >
                  Edit
                </Link>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(task._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
