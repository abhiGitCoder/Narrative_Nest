import React, { useEffect, useRef } from "react";
import { Play, Pause } from "lucide-react";

const NowPlayingBar = ({ item, isPlaying, onPlayPauseClick }) => {
    const audioRef = useRef(new Audio(item.audioUrl));

    useEffect(() => {
        const audio = audioRef.current;

        // Update audio source when item changes
        audio.src = item.audioUrl;

        // Play/pause based on isPlaying state
        if (isPlaying) {
            audio.play().catch((error) => {
                console.error("Error playing audio:", error);
            });
        } else {
            audio.pause();
        }

        // Cleanup on unmount
        return () => {
            audio.pause();
            audio.src = "";
        };
    }, [item.audioUrl, isPlaying]);

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-gray-800 border-t border-gray-700 p-4">
            <div className="flex items-center justify-between max-w-screen-xl mx-auto">
                <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gray-700 rounded">
                        <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-cover rounded"
                        />
                    </div>
                    <div>
                        <h3 className="font-semibold">{item.title}</h3>
                        <p className="text-sm text-gray-400">
                            {item.creator || item.description}
                        </p>
                    </div>
                </div>

                <button
                    className="p-2 hover:bg-gray-700 rounded-full transition-colors"
                    onClick={(e) => {
                        e.stopPropagation();
                        onPlayPauseClick();
                    }}
                >
                    {isPlaying ? <Pause size={24} /> : <Play size={24} />}
                </button>
            </div>
        </div>
    );
};

export default NowPlayingBar;
