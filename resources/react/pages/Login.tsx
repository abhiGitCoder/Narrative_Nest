import axios from "axios";
import Cookies from 'js-cookie';
import { Eye, EyeOff } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [apiError, setApiError] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
        // Clear errors when user starts typing
        if (errors[name]) {
            setErrors((prev) => ({
                ...prev,
                [name]: "",
            }));
        }
        setApiError("");
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        }

        if (!formData.password.trim()) {
            newErrors.password = "Password is required";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            setIsLoading(true);
            setApiError("");

            try {
                const response = await axios.post('/api/login', {
                    login: formData.email,
                    password: formData.password
                });

                if (response.data.status === "success") {
                    // Store token in cookie
                    const token = response.data.data.authorization.token;
                    Cookies.set('_ut', token, { 
                        expires: 7, // Cookie expires in 7 days
                        secure: true, // Cookie only sent over HTTPS
                        sameSite: 'strict' // Protect against CSRF
                    });

                    // Navigate to home page
                    navigate("/home");
                }
            } catch (error) {
                console.error('Login error:', error);
                setApiError(
                    error.response?.data?.message || 
                    "An error occurred during login. Please try again."
                );
            } finally {
                setIsLoading(false);
            }
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center px-4">
            <div className="w-full max-w-md space-y-8">
                <div>
                    <h1 className="text-2xl font-bold text-white mb-6">
                        Welcome Back
                    </h1>
                </div>

                {apiError && (
                    <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-2 rounded-lg">
                        {apiError}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">
                            Email
                        </label>
                        <input
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter email"
                            disabled={isLoading}
                            className={`w-full px-3 py-2 bg-gray-800 border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                                errors.email
                                    ? "border-red-500"
                                    : "border-gray-700"
                            }`}
                        />
                        {errors.email && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.email}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">
                            Password
                        </label>
                        <div className="relative">
                            <input
                                name="password"
                                type={showPassword ? "text" : "password"}
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Enter password"
                                disabled={isLoading}
                                className={`w-full px-3 py-2 bg-gray-800 border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                                    errors.password
                                        ? "border-red-500"
                                        : "border-gray-700"
                                }`}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400"
                                disabled={isLoading}
                            >
                                {showPassword ? (
                                    <EyeOff size={20} />
                                ) : (
                                    <Eye size={20} />
                                )}
                            </button>
                        </div>
                        {errors.password && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.password}
                            </p>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-white font-medium transition-colors mt-8 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? "Logging in..." : "Log In"}
                    </button>

                    <div className="text-center">
                        <a
                            href="/register"
                            className="text-indigo-400 hover:text-indigo-300 text-sm"
                        >
                            Don't have an account? Sign Up
                        </a>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;