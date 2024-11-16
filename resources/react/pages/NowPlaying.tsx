import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    ChevronLeft,
    ChevronRight,
    Play,
    Pause,
    X,
    ChevronDown,
} from "lucide-react";

const NowPlayingPage = () => {
    const navigate = useNavigate();
    const [isPlaying, setIsPlaying] = useState(true);

    // Mock current track data - in a real app this would come from your app's state management
    const currentTrack = {
        title: "The Odyssey",
        description: "An epic Greek poem attributed to Homer",
        image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 240'%3E%3Crect width='400' height='240' fill='%23374151'/%3E%3Cpath d='M200 80 L300 200 L100 200 Z' fill='%234B5563'/%3E%3Ccircle cx='250' cy='100' r='20' fill='%23F59E0B'/%3E%3Cpath d='M150 140 C100 140, 300 140, 250 140 S300 160, 250 180' fill='none' stroke='%2360A5FA' stroke-width='8'/%3E%3C/svg%3E",
        progress: 45,
        duration: 180,
    };

    const handleBack = () => {
        navigate(-1);
    };

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
    };

    return (
        <div className="fixed inset-0 bg-gray-900 text-white flex flex-col">
            {/* Header */}
            <div className="p-4 flex items-center justify-between border-b border-gray-700">
                <button
                    onClick={handleBack}
                    className="p-2 hover:bg-gray-800 rounded-full"
                >
                    <ChevronDown size={24} />
                </button>
                <h1 className="text-lg font-semibold">Now Playing</h1>
                {/* <button
                    onClick={handleBack}
                    className="p-2 hover:bg-gray-800 rounded-full"
                >
                    <X size={24} />
                </button> */}
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col items-center justify-center p-8 space-y-8">
                {/* Image */}
                <div className="w-64 h-64 bg-gray-800 rounded-lg overflow-hidden">
                    <img
                        src={currentTrack.image}
                        alt={currentTrack.title}
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Track Info */}
                <div className="text-center space-y-2">
                    <h2 className="text-2xl font-bold">{currentTrack.title}</h2>
                    <p className="text-gray-400">{currentTrack.description}</p>
                </div>

                {/* Progress Bar */}
                <div className="w-full max-w-md space-y-2">
                    <div className="h-1 bg-gray-700 rounded-full">
                        <div
                            className="h-full bg-white rounded-full"
                            style={{
                                width: `${
                                    (currentTrack.progress /
                                        currentTrack.duration) *
                                    100
                                }%`,
                            }}
                        />
                    </div>
                    <div className="flex justify-between text-sm text-gray-400">
                        <span>{formatTime(currentTrack.progress)}</span>
                        <span>{formatTime(currentTrack.duration)}</span>
                    </div>
                </div>

                {/* Controls */}
                <div className="flex items-center space-x-8">
                    <button className="p-3 hover:bg-gray-800 rounded-full">
                        <ChevronLeft size={24} />
                    </button>
                    <button
                        className="p-4 bg-white text-black rounded-full hover:bg-gray-200"
                        onClick={() => setIsPlaying(!isPlaying)}
                    >
                        {isPlaying ? <Pause size={24} /> : <Play size={24} />}
                    </button>
                    <button className="p-3 hover:bg-gray-800 rounded-full">
                        <ChevronRight size={24} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NowPlayingPage;
