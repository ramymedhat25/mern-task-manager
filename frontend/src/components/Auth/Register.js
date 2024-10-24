import React, { useState, useContext } from "react";
import { AuthContext } from "../../AuthContext";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const { register } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "", // Added password confirmation field
  });

  const { name, email, password, password2 } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      alert("Passwords do not match");
    } else {
      try {
        const successful = await register(name, email, password);
        if (successful) {
          navigate("/login");
          alert("Registration successful!");
        } else {
          alert("Registration failed. Please try again.");
        }
      } catch (err) {
        console.error(err.response.data);
      }
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h1 className="text-center mb-4">Register</h1>
          <form onSubmit={onSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name:
              </label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={name}
                onChange={onChange}
                required
              />
            </div>
            <div className="mb-3">
              {" "}
              {/* Added email field */}
              <label htmlFor="email" className="form-label">
                Email:
              </label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={email}
                onChange={onChange}
                required
              />
            </div>
            <div className="mb-3">
              {" "}
              {/* Added password field */}
              <label htmlFor="password" className="form-label">
                Password:
              </label>
              <input
                type="password"
                className="form-control"
                name="password"
                value={password}
                onChange={onChange}
                minLength="6"
                required
              />
            </div>
            <div className="mb-3">
              {" "}
              {/* Added password confirmation field */}
              <label htmlFor="password2" className="form-label">
                Confirm Password:
              </label>
              <input
                type="password"
                className="form-control"
                name="password2"
                value={password2}
                onChange={onChange}
                minLength="6"
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
