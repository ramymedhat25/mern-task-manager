import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const TaskDetails = () => {
  const { id } = useParams(); // Get the task ID from the URL
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const res = await axios.get(`/api/tasks/${id}`);
        setTask(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [id]); // Include `id` in the dependency array to re-fetch when the ID changes

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/tasks/${id}`);
      navigate("/"); // Redirect to task list after deletion
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!task) {
    return <div>Task not found</div>;
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h1 className="mb-4">{task.title}</h1>
          <div className="card">
            <div className="card-body">
              <p>**Description:** {task.description}</p>
              <p>**Status:** {task.status}</p>
              <p>**Due Date:** {task.dueDate}</p>
              {/* Add more details as needed */}
              <button className="btn btn-danger" onClick={handleDelete}>
                Delete Task
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetails;
