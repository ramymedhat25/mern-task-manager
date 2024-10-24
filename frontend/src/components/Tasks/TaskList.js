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

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="mt-5">
      <button className="btn btn-danger mb-3" onClick={handleLogout}>
        Logout
      </button>
      <h1 className="mb-4">Task List</h1>
      <ul className="list-group">
        {tasks.map((task) => (
          <li key={task._id} className="list-group-item">
            <Link to={`/tasks/${task._id}`}>
              <h3>{task.title}</h3>
            </Link>
            <p>{task.description}</p>
            <p>Status: {task.status}</p>
            <p>Due Date: {new Date(task.dueDate).toLocaleDateString()}</p>{" "}
            {/* Format due date */}
            <button
              className="btn btn-danger btn-sm"
              onClick={() => handleDelete(task._id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
