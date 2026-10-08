import { Navigate, Outlet } from "react-router-dom";
import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";
import { useEffect } from "react";
import api from "../api/api.js";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { setUser } from "../slices/userSlice.jsx";

export default function ProtectedRoutes() {
  const [loading, setLoading] = useState(true);

  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");

    async function checkAuth() {
      try {
        if (!token) return;
        const response = await api.get("/me");
        dispatch(setUser(response.data));
      } catch {
        dispatch(setUser(null));
        localStorage.removeItem("token");
      } finally {
        setLoading(false);
      }
    }

    checkAuth();
  }, [dispatch]);

  if (loading) return <h1>Loading</h1>;

  if (!user) return <Navigate to="/login" replace />;

  return (
    <div className="app-container">
      <Navbar />
      <main className="main-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
