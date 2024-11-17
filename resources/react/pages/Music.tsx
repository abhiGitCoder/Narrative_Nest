// src/pages/Music.jsx
import React from "react";
import Header from "../components/Header";
import Navigation from "../components/Navigation";
import CategorySection from "../components/CategorySection";
import NowPlayingBar from "../components/NowPlayingBar";

const musicCategories = {
    melodies: [
        {
            title: "Classical Symphony",
            description: "Orchestral masterpieces",
            image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 240'%3E%3Crect width='400' height='240' fill='%23374151'/%3E%3Cpath d='M150 180 Q200 60 250 180' stroke='%23F59E0B' stroke-width='8' fill='none'/%3E%3C/svg%3E",
            type: "Music",
        },
    ],
    hiphop: [
        {
            title: "Urban Beats",
            description: "Modern hip-hop collection",
            image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 240'%3E%3Crect width='400' height='240' fill='%23374151'/%3E%3Crect x='150' y='80' width='100' height='100' fill='%23F59E0B'/%3E%3C/svg%3E",
            type: "Music",
        },
    ],
    rock: [
        {
            title: "Classic Rock",
            description: "Timeless rock anthems",
            image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 240'%3E%3Crect width='400' height='240' fill='%23374151'/%3E%3Cpath d='M100 180 L200 60 L300 180' stroke='%23F59E0B' stroke-width='8' fill='none'/%3E%3C/svg%3E",
            type: "Music",
        },
    ],
};

const Music = () => {
    return (
        <div className="min-h-screen bg-gray-900 text-white">
            <Header />
            <Navigation activeTab="music" />
        </div>
    );
};

export default Music;
