import { createContext, useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Feedback from "./components/Feedback/feedback";
import Register from "./components/Register/register";
import Login from "./components/Login/login";
import Dashboard from "./components/Dashboard/dashboard";
import ProtectedRoute from "./components/ProtectedRoute/protectedRoute";

export const AdminContext = createContext();

function App() {
  const [admin, setAdmin] = useState({});

  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Feedback />} />
      </Routes>
      <AdminContext.Provider value={{ admin, setAdmin }}>
        <Routes>
          <Route exact path="/admin/register" element={<Register />} />
          <Route exact path="/admin/login" element={<Login />} />
          <Route exact path="/admin/dashboard" element={<ProtectedRoute />}>
            <Route exact path="/admin/dashboard" element={<Dashboard />} />
          </Route>
        </Routes>
      </AdminContext.Provider>
    </div>
  );
}

export default App;
