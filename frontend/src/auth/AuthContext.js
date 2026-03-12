import React, { createContext, useState, useEffect } from "react";
import API from "../services/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {


    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        checkAuth();
    }, []);

    // CHECK AUTH
    const checkAuth = async () => {

        const token = localStorage.getItem("access");

        if (!token) {
            setUser(null);
            setLoading(false);
            return null;
        }

        try {

            const res = await API.get("/me/");
            setUser(res.data);

            return res.data; // ⭐ IMPORTANT

        } catch (error) {

            console.warn("Auth check failed:", error);

            localStorage.removeItem("access");
            localStorage.removeItem("refresh");

            setUser(null);

            return null;

        } finally {

            setLoading(false);

        }
    };

    // LOGIN
    const login = async (username, password) => {

        try {

            localStorage.removeItem("access");
            localStorage.removeItem("refresh");

            const res = await API.post("/api/token/", { username, password });

            localStorage.setItem("access", res.data.access);
            localStorage.setItem("refresh", res.data.refresh);

            const userRes = await API.get("/me/");
            setUser(userRes.data);

            return {
                success: true,
                user: userRes.data
            };

        } catch (error) {

            return {
                success: false,
                error: error.response?.data?.detail || "Invalid credentials"
            };

        }

    };

    // REGISTER
    const register = async (userData) => {

        try {

            await API.post("/register/", userData);

            return await login(userData.username, userData.password);

        } catch (error) {

            return {
                success: false,
                error: error.response?.data?.error || "Registration failed"
            };

        }

    };

    // LOGOUT
    const logout = () => {

        localStorage.removeItem("access");
        localStorage.removeItem("refresh");

        setUser(null);

        window.location.href = "/login";

    };

    if (loading) {
        return null;
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                login,
                register,
                logout,
                checkAuth
            }}
        >
            {children}
        </AuthContext.Provider>
    );


};
