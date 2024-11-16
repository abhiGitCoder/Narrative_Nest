import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Play, Pause } from "lucide-react";

const NowPlayingBar = () => {
    const navigate = useNavigate();
    const [isPlaying, setIsPlaying] = useState(true);

    const handleBarClick = () => {
        navigate("/now-playing");
    };

    return (
        <div
            className="fixed bottom-0 left-0 right-0 bg-gray-800 border-t border-gray-700 p-4 cursor-pointer"
            onClick={handleBarClick}
        >
            <div className="flex items-center justify-between max-w-screen-xl mx-auto">
                <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gray-700 rounded">
                        <img
                            src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 240'%3E%3Crect width='400' height='240' fill='%23374151'/%3E%3Cpath d='M200 80 L300 200 L100 200 Z' fill='%234B5563'/%3E%3Ccircle cx='250' cy='100' r='20' fill='%23F59E0B'/%3E%3C/svg%3E"
                            alt="Now Playing"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div>
                        <h3 className="font-semibold">The Odyssey</h3>
                        <p className="text-sm text-gray-400">
                            An epic Greek poem attributed to Homer
                        </p>
                    </div>
                </div>

                <button
                    className="p-2 hover:bg-gray-700 rounded-full"
                    onClick={(e) => {
                        e.stopPropagation();
                        setIsPlaying(!isPlaying);
                    }}
                >
                    {isPlaying ? <Pause size={24} /> : <Play size={24} />}
                </button>
            </div>
        </div>
    );
};

export default NowPlayingBar;
