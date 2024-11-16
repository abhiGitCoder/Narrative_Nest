import React from "react";
import { useNavigate } from "react-router-dom";
import CategorySection from "../components/CategorySection";
import Header from "../components/Header";
import Navigation from "../components/Navigation";
import NowPlayingBar from "../components/NowPlayingBar";

const featuredContent = [
    {
        title: "The Odyssey",
        description: "An epic Greek poem attributed to Homer",
        image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 240'%3E%3Crect width='400' height='240' fill='%23374151'/%3E%3Cpath d='M200 80 L300 200 L100 200 Z' fill='%234B5563'/%3E%3Ccircle cx='250' cy='100' r='20' fill='%23F59E0B'/%3E%3Cpath d='M150 140 C100 140, 300 140, 250 140 S300 160, 250 180' fill='none' stroke='%2360A5FA' stroke-width='8'/%3E%3C/svg%3E",
        type: "Stories",
    },
    {
        title: "Jazz Classics",
        description: "A collection of timeless jazz masterpieces",
        image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 240'%3E%3Crect width='400' height='240' fill='%23374151'/%3E%3Ccircle cx='200' cy='120' r='60' fill='%234B5563'/%3E%3Cpath d='M200 80 L200 160 M180 140 L220 140' stroke='%23F59E0B' stroke-width='8'/%3E%3C/svg%3E",
        type: "Music",
    },
    {
        title: "Ancient Tales",
        description: "Stories from ancient civilizations",
        image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 240'%3E%3Crect width='400' height='240' fill='%23374151'/%3E%3Cpath d='M100 200 L200 100 L300 200 Z' fill='%234B5563'/%3E%3Ccircle cx='200' cy='80' r='20' fill='%23F59E0B'/%3E%3C/svg%3E",
        type: "Stories",
    },
    {
        title: "Rock Legends",
        description: "Greatest hits from rock legends",
        image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 240'%3E%3Crect width='400' height='240' fill='%23374151'/%3E%3Cpath d='M150 120 L250 120 M200 70 L200 170' stroke='%23F59E0B' stroke-width='12'/%3E%3C/svg%3E",
        type: "Music",
    },
];

const newReleases = [
    {
        title: "Modern Tales",
        description: "A collection of contemporary stories",
        image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 240'%3E%3Crect width='400' height='240' fill='%23374151'/%3E%3Crect x='100' y='60' width='200' height='120' fill='%234B5563'/%3E%3Ccircle cx='200' cy='120' r='40' fill='%23F59E0B'/%3E%3C/svg%3E",
        type: "Stories",
    },
    {
        title: "Rock Anthems",
        description: "The greatest rock anthems of all time",
        image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 240'%3E%3Crect width='400' height='240' fill='%23374151'/%3E%3Cpath d='M100 180 Q200 60 300 180' stroke='%23F59E0B' stroke-width='8' fill='none'/%3E%3C/svg%3E",
        type: "Music",
    },
    {
        title: "Tech Talks",
        description: "Latest discussions in technology",
        image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 240'%3E%3Crect width='400' height='240' fill='%23374151'/%3E%3Ccircle cx='200' cy='120' r='80' fill='%234B5563' stroke='%23F59E0B' stroke-width='8'/%3E%3C/svg%3E",
        type: "Podcasts",
    },
    {
        title: "Nature Stories",
        description: "Tales from the wild",
        image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 240'%3E%3Crect width='400' height='240' fill='%23374151'/%3E%3Cpath d='M100 200 C150 180, 250 180, 300 200' fill='%234B5563'/%3E%3Ccircle cx='200' cy='100' r='30' fill='%23F59E0B'/%3E%3C/svg%3E",
        type: "Stories",
    },
];

const Home = () => {
    const navigate = useNavigate();

    const handleContentClick = (type) => {
        navigate(`/${type.toLowerCase()}`);
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white">
            <Header />
            <Navigation activeTab="all" />

            <main className="pb-20">
                <CategorySection
                    title="Featured Content"
                    items={featuredContent}
                    onItemClick={handleContentClick}
                />
                <CategorySection
                    title="New Releases"
                    items={newReleases}
                    onItemClick={handleContentClick}
                />
            </main>

            <NowPlayingBar />
        </div>
    );
};

export default Home;
