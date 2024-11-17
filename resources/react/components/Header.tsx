import { Bell, Home, Menu, Search, Upload, User, X } from "lucide-react";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Header = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const isActive = (path) => {
        if (path === "/" && location.pathname === "/") return true;
        if (path !== "/" && location.pathname.startsWith(path)) return true;
        return false;
    };

    const navigationItems = [
        { path: "/home", icon: Home, label: "Home" },
        { path: "/search", icon: Search, label: "Search" },
        { path: "/upload", icon: Upload, label: "Upload" },
        { path: "/user", icon: User, label: "Profile" },
        { path: "/notifications", icon: Bell, label: "Notifications" },
    ];

    const handleNavigation = (path) => {
        navigate(path);
        setIsMobileMenuOpen(false);
    };

    return (
        <div className="fixed top-0 left-0 right-0 z-50">
            <header className="px-4 py-3 bg-gray-900 border-b border-gray-800">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <h1 className="text-lg font-semibold cursor-pointer">
                            NarrativeNest
                        </h1>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-4">
                        {navigationItems.map(({ path, icon: Icon }) => (
                            <button
                                key={path}
                                className={`p-2 transition-colors duration-200 ${
                                    isActive(path)
                                        ? "text-blue-500"
                                        : "text-gray-400 hover:text-blue-500"
                                }`}
                                onClick={() => handleNavigation(path)}
                            >
                                <Icon className="w-6 h-6" />
                            </button>
                        ))}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2 text-gray-400 hover:text-blue-500"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? (
                            <X className="w-6 h-6" />
                        ) : (
                            <Menu className="w-6 h-6" />
                        )}
                    </button>
                </div>
            </header>

            {/* Mobile Menu Dropdown */}
            {isMobileMenuOpen && (
                <div className="md:hidden bg-gray-900 border-b border-gray-800 py-2">
                    {navigationItems.map(({ path, icon: Icon, label }) => (
                        <button
                            key={path}
                            className={`flex items-center space-x-3 w-full px-4 py-3 transition-colors duration-200 ${
                                isActive(path)
                                    ? "text-blue-500 bg-gray-800"
                                    : "text-gray-400 hover:text-blue-500 hover:bg-gray-800"
                            }`}
                            onClick={() => handleNavigation(path)}
                        >
                            <Icon className="w-6 h-6" />
                            <span>{label}</span>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Header;