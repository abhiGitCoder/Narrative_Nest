import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Navigation from "../components/Navigation";
import CategorySection from "../components/CategorySection";
import NowPlayingBar from "../components/NowPlayingBar";

const Stories = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [stories, setStories] = useState([]);
    const [currentlyPlaying, setCurrentlyPlaying] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        fetchStoriesData();
    }, []);

    const fetchStoriesData = async () => {
        try {
            const response = await fetch("/api/story-data");
            const result = await response.json();

            if (!response.ok) {
                throw new Error(
                    result.message || "Failed to fetch stories data"
                );
            }

            if (result.success) {
                const formattedStories = result.data.map((story) => ({
                    id: story.id,
                    title: story.title,
                    description: story.description,
                    image: story.cover_image
                        ? `/storage/${story.cover_image}`
                        : getPlaceholderImage(),
                    type: "Story",
                    creator: story.creator,
                    duration: story.duration,
                    audioUrl: story.audio_url,
                    publishedDate: new Date(story.published_date),
                }));
                setStories(formattedStories);
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const getPlaceholderImage = () => {
        return "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 240'%3E%3Crect width='400' height='240' fill='%23374151'/%3E%3Cpath d='M100 200 L200 100 L300 200 Z' fill='%234B5563'/%3E%3Ccircle cx='200' cy='80' r='20' fill='%23F59E0B'/%3E%3C/svg%3E";
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

    // Sort stories by published date (newest first)
    const sortedStories = [...stories].sort(
        (a, b) => b.publishedDate - a.publishedDate
    );

    return (
        <div className="min-h-screen bg-gray-900 text-white hide-scrollbar overflow-x-hidden">
            <Header />
            <Navigation activeTab="stories" />

            <main className="pb-20 overflow-hidden">
                {sortedStories.length > 0 && (
                    <CategorySection
                        title="All Stories"
                        items={sortedStories}
                        onItemClick={handleContentClick}
                    />
                )}
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

export default Stories;
