import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          axios.defaults.headers.common["x-auth-token"] = token;
          setIsAuthenticated(true);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    checkLoggedIn();
  }, []);

  const login = async (email, password) => {
    try {
      const res = await axios.post("http://localhost:8000/api/auth/login", {
        email,
        password,
      });
      localStorage.setItem("token", res.data.token);
      axios.defaults.headers.common["x-auth-token"] = res.data.token;
      setIsAuthenticated(true);
      return true; // Indicate successful login
    } catch (err) {
      console.error(err.response.data);
      return err.response.data.msg;
    }
  };

  const register = async (name, email, password) => {
    try {
      const res = await axios.post("http://localhost:8000/api/auth/register", {
        name,
        email,
        password,
      });
      console.log(res.data);
      return true; // Indicate successful registration
    } catch (err) {
      console.error(err.response.data);
      return err.response.data.msg; 
    }
  };
  const logout = () => {
    localStorage.removeItem("token");
    delete axios.defaults.headers.common["x-auth-token"];
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, loading, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
