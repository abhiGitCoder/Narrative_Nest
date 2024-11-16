import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Menu, Bell, Home, Search, Upload, User } from "lucide-react";

const Header = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // Function to check if the current path matches
    const isActive = (path) => {
        if (path === "/" && location.pathname === "/") return true;
        if (path !== "/" && location.pathname.startsWith(path)) return true;
        return false;
    };

    return (
        <header className="px-4 py-3 sticky top-0 bg-gray-900 z-10 border-b border-gray-800">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    <h1
                        className="text-lg font-semibold cursor-pointer"
                        onClick={() => navigate("/")}
                    >
                        NarrativeNest
                    </h1>
                </div>
                <div className="flex items-center space-x-4">
                    <button
                        className={`p-2 transition-colors duration-200 ${
                            isActive("/")
                                ? "text-blue-500"
                                : "text-gray-400 hover:text-blue-500"
                        }`}
                        onClick={() => navigate("/home")}
                    >
                        <Home className="w-6 h-6" />
                    </button>
                    <button
                        className={`p-2 transition-colors duration-200 ${
                            isActive("/search")
                                ? "text-blue-500"
                                : "text-gray-400 hover:text-blue-500"
                        }`}
                        onClick={() => navigate("/search")}
                    >
                        <Search className="w-6 h-6" />
                    </button>
                    <button
                        className={`p-2 transition-colors duration-200 ${
                            isActive("/upload")
                                ? "text-blue-500"
                                : "text-gray-400 hover:text-blue-500"
                        }`}
                        onClick={() => navigate("/upload")}
                    >
                        <Upload className="w-6 h-6" />
                    </button>
                    <button
                        className={`p-2 transition-colors duration-200 ${
                            isActive("/user")
                                ? "text-blue-500"
                                : "text-gray-400 hover:text-blue-500"
                        }`}
                        onClick={() => navigate("/user")}
                    >
                        <User className="w-6 h-6" />
                    </button>
                    <button
                        className={`p-2 transition-colors duration-200 ${
                            isActive("/notifications")
                                ? "text-blue-500"
                                : "text-gray-400 hover:text-blue-500"
                        }`}
                        onClick={() => navigate("/notifications")}
                    >
                        <Bell className="w-6 h-6" />
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;
