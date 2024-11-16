import React from "react";
import Header from "../components/Header";
import Navigation from "../components/Navigation";
import CategorySection from "../components/CategorySection";
import NowPlayingBar from "../components/NowPlayingBar";

const PodcastsCategories = {
    historical: [
        {
            title: "Ancient Greece",
            description: "Tales from mythology",
            image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 240'%3E%3Crect width='400' height='240' fill='%23374151'/%3E%3Cpath d='M200 60 L300 180 L100 180 Z' fill='%23F59E0B'/%3E%3C/svg%3E",
            type: "podcasts",
        },
    ],
    fantasy: [
        {
            title: "Dragon Tales",
            description: "Epic fantasy adventures",
            image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 240'%3E%3Crect width='400' height='240' fill='%23374151'/%3E%3Cpath d='M150 180 Q200 80 250 180' stroke='%23F59E0B' stroke-width='8' fill='none'/%3E%3C/svg%3E",
            type: "podcasts",
        },
    ],
};

const Podcasts = () => {
    return (
        <div className="min-h-screen bg-gray-900 text-white">
            <Header />
            <Navigation activeTab="podcasts" />

            <main className="pb-20">
                {Object.entries(PodcastsCategories).map(([category, items]) => (
                    <CategorySection
                        key={category}
                        title={
                            category.charAt(0).toUpperCase() + category.slice(1)
                        }
                        items={items}
                    />
                ))}
            </main>

            <NowPlayingBar />
        </div>
    );
};

export default Podcasts;
