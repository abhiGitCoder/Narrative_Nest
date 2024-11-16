import { Eye, EyeOff } from "lucide-react";
import React, { useEffect, useState } from "react";

const Register = () => {
    const [formData, setFormData] = useState({
        name: "",
        username: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    const [showPassword, setShowPassword] = useState({
        password: false,
        confirmation: false,
    });

    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [notification, setNotification] = useState({
        message: "",
        type: "",
    });

    useEffect(() => {
        if (notification.message) {
            const timer = setTimeout(() => {
                setNotification({ message: "", type: "" });
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [notification]);

    useEffect(() => {
        if (Object.keys(errors).length > 0) {
            setErrors({});
        }
    }, [formData]);

    const validateForm = () => {
        const newErrors = {};

        if (!formData.name) {
            newErrors.name = "Name is required";
        } else if (formData.name.length < 2) {
            newErrors.name = "Name must be at least 2 characters";
        }

        if (!formData.username) {
            newErrors.username = "Username is required";
        } else if (formData.username.length < 3) {
            newErrors.username = "Username must be at least 3 characters";
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email) {
            newErrors.email = "Email is required";
        } else if (!emailRegex.test(formData.email)) {
            newErrors.email = "Please enter a valid email address";
        }

        if (!formData.password) {
            newErrors.password = "Password is required";
        } else if (formData.password.length < 8) {
            newErrors.password = "Password must be at least 8 characters";
        }

        if (!formData.password_confirmation) {
            newErrors.password_confirmation = "Please confirm your password";
        } else if (formData.password !== formData.password_confirmation) {
            newErrors.password_confirmation = "Passwords do not match";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            setNotification({
                message: "Please fix the errors in the form",
                type: "error",
            });
            return;
        }

        setIsLoading(true);

        try {
            const response = await fetch("/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                if (response.status === 422) {
                    if (data.errors) {
                        setErrors(data.errors);
                        setNotification({
                            message:
                                "Validation failed. Please check your input.",
                            type: "error",
                        });
                    } else {
                        setNotification({
                            message:
                                data.message ||
                                "Validation failed. Please check your input.",
                            type: "error",
                        });
                    }
                } else {
                    throw new Error(data.message || "Registration failed");
                }
                return;
            }

            setNotification({
                message: "Registration successful",
                type: "success",
            });

            setTimeout(() => {
                window.location.href = "/";
            }, 2000);
        } catch (error) {
            setNotification({
                message:
                    error.message || "An error occurred during registration",
                type: "error",
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="h-screen bg-gray-900 flex flex-col items-center justify-center p-2">
            <div className="w-full max-w-md bg-gray-800 p-4 rounded-xl shadow-lg">
                <div className="text-center mb-3">
                    <h1 className="text-2xl font-bold text-white">
                        Create Account
                    </h1>
                    <p className="text-sm text-gray-400">
                        Join NarrativeNest today
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-3">
                    {/* Name field */}
                    <div>
                        <label className="block text-xs font-medium text-gray-200">
                            Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className={`w-full mt-1 px-3 py-1.5 bg-gray-700 border rounded-lg text-white text-sm ${
                                errors.name
                                    ? "border-red-500"
                                    : "border-gray-600"
                            }`}
                            disabled={isLoading}
                        />
                        {errors.name && (
                            <p className="text-xs text-red-500 mt-0.5">
                                {errors.name}
                            </p>
                        )}
                    </div>

                    {/* Username field */}
                    <div>
                        <label className="block text-xs font-medium text-gray-200">
                            User id
                        </label>
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            className={`w-full mt-1 px-3 py-1.5 bg-gray-700 border rounded-lg text-white text-sm ${
                                errors.username
                                    ? "border-red-500"
                                    : "border-gray-600"
                            }`}
                            disabled={isLoading}
                        />
                        {errors.username && (
                            <p className="text-xs text-red-500 mt-0.5">
                                {errors.username}
                            </p>
                        )}
                    </div>

                    {/* Email field */}
                    <div>
                        <label className="block text-xs font-medium text-gray-200">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={`w-full mt-1 px-3 py-1.5 bg-gray-700 border rounded-lg text-white text-sm ${
                                errors.email
                                    ? "border-red-500"
                                    : "border-gray-600"
                            }`}
                            disabled={isLoading}
                        />
                        {errors.email && (
                            <p className="text-xs text-red-500 mt-0.5">
                                {errors.email}
                            </p>
                        )}
                    </div>

                    {/* Password field */}
                    <div>
                        <label className="block text-xs font-medium text-gray-200">
                            Password
                        </label>
                        <div className="relative mt-1">
                            <input
                                type={
                                    showPassword.password ? "text" : "password"
                                }
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className={`w-full px-3 py-1.5 bg-gray-700 border rounded-lg text-white text-sm ${
                                    errors.password
                                        ? "border-red-500"
                                        : "border-gray-600"
                                }`}
                                disabled={isLoading}
                            />
                            <button
                                type="button"
                                onClick={() =>
                                    setShowPassword((prev) => ({
                                        ...prev,
                                        password: !prev.password,
                                    }))
                                }
                                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400"
                            >
                                {showPassword.password ? (
                                    <EyeOff size={16} />
                                ) : (
                                    <Eye size={16} />
                                )}
                            </button>
                        </div>
                        {errors.password && (
                            <p className="text-xs text-red-500 mt-0.5">
                                {errors.password}
                            </p>
                        )}
                    </div>

                    {/* Password confirmation field */}
                    <div>
                        <label className="block text-xs font-medium text-gray-200">
                            Confirm Password
                        </label>
                        <div className="relative mt-1">
                            <input
                                type={
                                    showPassword.confirmation
                                        ? "text"
                                        : "password"
                                }
                                name="password_confirmation"
                                value={formData.password_confirmation}
                                onChange={handleChange}
                                className={`w-full px-3 py-1.5 bg-gray-700 border rounded-lg text-white text-sm ${
                                    errors.password_confirmation
                                        ? "border-red-500"
                                        : "border-gray-600"
                                }`}
                                disabled={isLoading}
                            />
                            <button
                                type="button"
                                onClick={() =>
                                    setShowPassword((prev) => ({
                                        ...prev,
                                        confirmation: !prev.confirmation,
                                    }))
                                }
                                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400"
                            >
                                {showPassword.confirmation ? (
                                    <EyeOff size={16} />
                                ) : (
                                    <Eye size={16} />
                                )}
                            </button>
                        </div>
                        {errors.password_confirmation && (
                            <p className="text-xs text-red-500 mt-0.5">
                                {errors.password_confirmation}
                            </p>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-1.5 px-4 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 
                     text-white font-medium rounded-lg transition-colors duration-200 text-sm mt-2"
                    >
                        {isLoading ? "Creating Account..." : "Create Account"}
                    </button>
                </form>

                <p className="text-center text-xs text-gray-400 mt-3">
                    Already have an account?{" "}
                    <a
                        href="/"
                        className="text-indigo-400 hover:text-indigo-300"
                    >
                        Sign in
                    </a>
                </p>
            </div>

            {/* Auto-dismissing notification popup */}
            {notification.message && (
                <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-lg shadow-lg text-white text-xs font-medium animate-fade-in-up">
                    <div
                        className={`${
                            notification.type === "success"
                                ? "bg-green-600"
                                : "bg-red-600"
                        } px-3 py-1.5 rounded-lg`}
                    >
                        {notification.message}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Register;
