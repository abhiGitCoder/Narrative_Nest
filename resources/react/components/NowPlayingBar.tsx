import React from "react";

const NowPlayingBar = () => (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-800 p-2 border-t border-gray-700">
        <div className="flex items-center space-x-3">
            <img
                src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 40'%3E%3Crect width='40' height='40' fill='%23374151'/%3E%3Ccircle cx='20' cy='20' r='12' fill='%23F59E0B'/%3E%3C/svg%3E"
                alt="Now Playing"
                className="w-10 h-10 rounded"
            />
            <div className="flex-1">
                <h4 className="font-medium">Currently Playing</h4>
                <p className="text-sm text-gray-400">Artist/Author</p>
            </div>
            <div className="flex items-center space-x-4">
                <button className="p-2">⏸️</button>
                <button className="p-2">⏭️</button>
            </div>
        </div>
    </div>
);

export default NowPlayingBar;
