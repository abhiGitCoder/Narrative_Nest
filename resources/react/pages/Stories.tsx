import React, { useEffect, useState } from "react";
import CategorySection from "../components/CategorySection";
import Header from "../components/Header";
import Navigation from "../components/Navigation";
import NowPlayingBar from "../components/NowPlayingBar";

const Stories = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [storiesByGenres, setStoriesByGenres] = useState({});
    const [currentlyPlaying, setCurrentlyPlaying] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [allGenres, setAllGenres] = useState([]);

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
                console.log("Raw API response:", result.data); // Log raw data

                const formattedStories = result.data.map((story) => {
                    console.log("Story genres before formatting:", story.genres); // Log genres before formatting
                    
                    return {
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
                        genres: story.genres ? story.genres : [] // Simplified genres handling
                    };
                });

                console.log("Formatted stories:", formattedStories); // Log formatted stories

                // Extract all unique genres
                const uniqueGenres = [...new Set(
                    formattedStories.map(story => story.genres).flat()
                )].filter(Boolean);
                
                console.log("Unique genres:", uniqueGenres); // Log unique genres
                setAllGenres(uniqueGenres);

                // Group stories by their genres
                const groupedStories = groupStoriesByGenres(formattedStories);
                console.log("Grouped stories:", groupedStories); // Log grouped stories
                setStoriesByGenres(groupedStories);
            }
        } catch (err) {
            console.error("Error details:", err);
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const groupStoriesByGenres = (stories) => {
        const grouped = {};

        stories.forEach(story => {
            if (!story.genres) return;
            
            // If genres is an object, get its values
            const genresArray = Array.isArray(story.genres) 
                ? story.genres 
                : typeof story.genres === 'object' 
                    ? Object.values(story.genres)
                    : [story.genres];

            genresArray.forEach(genre => {
                if (!genre) return;
                
                if (!grouped[genre]) {
                    grouped[genre] = [];
                }
                grouped[genre].push(story);
            });
        });

        // Sort stories within each genre category
        Object.keys(grouped).forEach(genre => {
            grouped[genre].sort((a, b) => b.publishedDate - a.publishedDate);
        });

        return grouped;
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

    return (
        <div className="min-h-screen bg-gray-900 text-white hide-scrollbar overflow-x-hidden">
            <Header />
            <Navigation activeTab="stories" />

            <main className="pb-20 overflow-hidden">
                {/* Display all genres at the top */}
                <div className="px-6 py-4 flex gap-4 overflow-x-auto hide-scrollbar">
                    {allGenres.length > 0 ? (
                        allGenres.map((genre) => (
                            <button
                                key={genre}
                                className="px-4 py-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors whitespace-nowrap"
                            >
                                {genre} ({storiesByGenres[genre]?.length || 0})
                            </button>
                        ))
                    ) : (
                        <div>No genres available</div>
                    )}
                </div>

                {/* Render a section for each genre category */}
                {Object.entries(storiesByGenres).map(([genre, stories]) => (
                    <CategorySection
                        key={genre}
                        title={genre}
                        items={stories}
                        onItemClick={handleContentClick}
                    />
                ))}
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