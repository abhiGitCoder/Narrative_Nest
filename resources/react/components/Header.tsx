import React from "react";
import { useNavigate } from "react-router-dom";
import { Menu, Bell, Home, Search, Upload, User } from "lucide-react";

const Header = () => {
    const navigate = useNavigate();

    return (
        <header className="px-4 py-3 sticky top-0 bg-gray-900 z-10 border-b border-gray-800">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    <Menu className="w-6 h-6" />
                    <h1 className="text-lg font-semibold">NarrativeNest</h1>
                </div>
                <div className="flex items-center space-x-4">
                    <button
                        className="p-2 text-blue-500"
                        onClick={() => navigate("/")}
                    >
                        <Home className="w-6 h-6" />
                    </button>
                    <button className="p-2 text-gray-400">
                        <Search className="w-6 h-6" />
                    </button>
                    <button className="p-2 text-gray-400">
                        <Upload className="w-6 h-6" />
                    </button>
                    <button className="p-2 text-gray-400">
                        <User className="w-6 h-6" />
                    </button>
                    <button className="p-2 text-gray-400">
                        <Bell className="w-6 h-6" />
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;
