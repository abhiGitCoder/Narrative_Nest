import React, { useEffect, useState } from "react";
import CategorySection from "../components/CategorySection";
import NowPlayingBar from "../components/NowPlayingBar";
import Header from "../components/Header";
import Navigation from "../components/Navigation";

const Home = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [homeData, setHomeData] = useState({
        featuredContent: [],
        newReleases: [],
    });
    const [currentlyPlaying, setCurrentlyPlaying] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        fetchHomeData();
    }, []);

    const fetchHomeData = async () => {
        try {
            const response = await fetch("/api/home-data");
            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || "Failed to fetch home data");
            }

            if (result.success) {
                const formattedData = {
                    featuredContent: formatContentItems(
                        result.data.featured_content
                    ),
                    newReleases: formatContentItems(result.data.new_releases),
                };
                setHomeData(formattedData);
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const formatContentItems = (items) => {
        return items.map((item) => ({
            title: item.title,
            description: item.description,
            image: item.cover_image || getPlaceholderImage(item.content_type),
            type: capitalizeFirstLetter(item.content_type),
            creator: item.creator,
            duration: item.duration,
            id: item.id,
            audioUrl: item.audio_url,
        }));
    };

    const getPlaceholderImage = (contentType) => {
        const placeholders = {
            story: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 240'%3E%3Crect width='400' height='240' fill='%23374151'/%3E%3Cpath d='M100 200 L200 100 L300 200 Z' fill='%234B5563'/%3E%3Ccircle cx='200' cy='80' r='20' fill='%23F59E0B'/%3E%3C/svg%3E",
            music: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 240'%3E%3Crect width='400' height='240' fill='%23374151'/%3E%3Cpath d='M150 120 L250 120 M200 70 L200 170' stroke='%23F59E0B' stroke-width='12'/%3E%3C/svg%3E",
            podcast:
                "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 240'%3E%3Crect width='400' height='240' fill='%23374151'/%3E%3Ccircle cx='200' cy='120' r='60' fill='%234B5563'/%3E%3Cpath d='M200 80 L200 160 M180 140 L220 140' stroke='%23F59E0B' stroke-width='8'/%3E%3C/svg%3E",
        };
        return placeholders[contentType] || placeholders.story;
    };

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    const handleContentClick = (item) => {
        setCurrentlyPlaying(item);
        setIsPlaying(true);
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center hide-scrollbar">
                <div className="text-xl">Loading...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center hide-scrollbar">
                <div className="text-red-500 text-xl">{error}</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-900 text-white hide-scrollbar overflow-x-hidden">
            <Header />
            <Navigation activeTab="all" />

            <main className="pb-20 overflow-hidden">
                <CategorySection
                    title="Featured Content"
                    items={homeData.featuredContent}
                    onItemClick={handleContentClick}
                />
                <CategorySection
                    title="New Releases"
                    items={homeData.newReleases}
                    onItemClick={handleContentClick}
                />
            </main>

            {currentlyPlaying && (
                <NowPlayingBar
                    item={currentlyPlaying}
                    isPlaying={isPlaying}
                    onPlayPauseClick={() => setIsPlaying(!isPlaying)}
                />
            )}
        </div>
    );
};

export default Home;
