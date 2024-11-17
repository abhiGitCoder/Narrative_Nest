// src/components/Navigation.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const Navigation = ({ activeTab }) => {
    const navigate = useNavigate();

    return (
        <div className="px-4 border-b border-gray-800 bg-gray-900 lg:mx-10 ">
            <nav className="flex space-x-6 overflow-x-auto hide-scrollbar">
                <button
                    className={`py-2 whitespace-nowrap ${
                        activeTab === "all"
                            ? "text-white border-b-2 border-white"
                            : "text-gray-400"
                    }`}
                    onClick={() => navigate("/home")}
                >
                    All
                </button>
                <button
                    className={`py-2 whitespace-nowrap ${
                        activeTab === "music"
                            ? "text-white border-b-2 border-white"
                            : "text-gray-400"
                    }`}
                    onClick={() => navigate("/music")}
                >
                    Music
                </button>
                <button
                    className={`py-2 whitespace-nowrap ${
                        activeTab === "stories"
                            ? "text-white border-b-2 border-white"
                            : "text-gray-400"
                    }`}
                    onClick={() => navigate("/stories")}
                >
                    Stories
                </button>
                <button
                    className={`py-2 whitespace-nowrap ${
                        activeTab === "podcasts"
                            ? "text-white border-b-2 border-white"
                            : "text-gray-400"
                    }`}
                    onClick={() => navigate("/podcasts")}
                >
                    Podcasts
                </button>
            </nav>
        </div>
    );
};

export default Navigation;
