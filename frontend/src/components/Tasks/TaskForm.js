import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../AuthContext";

const TaskForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "open",
    dueDate: "",
  });
  const [loading, setLoading] = useState(false); // Add loading state

  useEffect(() => {
    const fetchTask = async () => {
      if (id) {
        // Only fetch task if in edit mode (id exists)
        try {
          setLoading(true);
          const res = await axios.get(`http://localhost:8000/api/tasks/${id}`);
          setFormData({
            title: res.data.title,
            description: res.data.description,
            status: res.data.status,
            dueDate: res.data.dueDate ? res.data.dueDate.split("T")[0] : "", // Format date for input
          });
        } catch (err) {
          console.error(err);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchTask();
  }, [id]); // Re-fetch task when id changes

  const { title, description, status, dueDate } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        // Update existing task
        await axios.put(`http://localhost:8000/api/tasks/${id}`, formData);
      } else {
        // Create new task
        await axios.post("http://localhost:8000/api/tasks", formData);
      }
      navigate("/"); // Redirect to task list after submission
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
      <h1 className="mb-4">{id ? "Edit Task" : "Add Task"}</h1>{" "}
      {/* Dynamic heading */}
      {loading ? (
        <div>Loading...</div>
      ) : (
        <form onSubmit={onSubmit}>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title:
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              value={title}
              onChange={onChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description:
            </label>
            <textarea
              className="form-control"
              id="description"
              name="description"
              value={description}
              onChange={onChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="status" className="form-label">
              Status:
            </label>
            <select
              className="form-select"
              id="status"
              name="status"
              value={status}
              onChange={onChange}
            >
              <option value="open">Open</option>
              <option value="in progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="dueDate" className="form-label">
              Due Date:
            </label>
            <input
              type="date"
              className="form-control"
              id="dueDate"
              name="dueDate"
              value={dueDate}
              onChange={onChange}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            {id ? "Update Task" : "Create Task"} {/* Dynamic button text */}
          </button>
        </form>
      )}
    </div>
  );
};

export default TaskForm;
