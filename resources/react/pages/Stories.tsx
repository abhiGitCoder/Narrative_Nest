import React, { useEffect, useState, useRef } from "react";
import {
    Play,
    Pause,
    ChevronLeft,
    ChevronRight,
    Volume2,
    VolumeX,
    Clock,
} from "lucide-react";
import Header from "../components/Header";
import Navigation from "../components/Navigation";

const Stories = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [storiesByGenres, setStoriesByGenres] = useState({});
    const [currentlyPlaying, setCurrentlyPlaying] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [allGenres, setAllGenres] = useState([]);
    const [selectedGenre, setSelectedGenre] = useState(null);
    const [isMuted, setIsMuted] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const audioRef = useRef(new Audio());
    const progressBarRef = useRef(null);

    useEffect(() => {
        fetchStoriesData();

        // Handle screen orientation
        const handleResize = () => {
            document.documentElement.style.setProperty(
                "--vh",
                `${window.innerHeight * 0.01}px`
            );
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        const audio = audioRef.current;

        const handleTimeUpdate = () => {
            setCurrentTime(audio.currentTime);
            setDuration(audio.duration);
        };

        const handleEnded = () => {
            setIsPlaying(false);
            setCurrentTime(0);
        };

        audio.addEventListener("timeupdate", handleTimeUpdate);
        audio.addEventListener("ended", handleEnded);

        if (currentlyPlaying) {
            audio.src = currentlyPlaying.audioUrl;
            audio.muted = isMuted;

            if (isPlaying) {
                audio.play().catch((error) => {
                    console.error("Error playing audio:", error);
                });
            } else {
                audio.pause();
            }
        }

        return () => {
            audio.removeEventListener("timeupdate", handleTimeUpdate);
            audio.removeEventListener("ended", handleEnded);
            audio.pause();
            audio.src = "";
        };
    }, [currentlyPlaying, isPlaying, isMuted]);

    const formatTime = (seconds) => {
        if (!seconds) return "0:00";
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, "0")}`;
    };

    const handleProgressClick = (e) => {
        const progressBar = progressBarRef.current;
        if (!progressBar) return;

        const rect = progressBar.getBoundingClientRect();
        const pos = (e.clientX - rect.left) / rect.width;
        const newTime = pos * duration;
        audioRef.current.currentTime = newTime;
        setCurrentTime(newTime);
    };

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
                    genres: Array.isArray(story.genres)
                        ? story.genres
                        : typeof story.genres === "object"
                        ? Object.values(story.genres)
                        : [story.genres],
                }));

                const uniqueGenres = [
                    ...new Set(
                        formattedStories.flatMap((story) => story.genres)
                    ),
                ].filter(Boolean);

                setAllGenres(uniqueGenres);
                setStoriesByGenres(groupStoriesByGenres(formattedStories));
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

        stories.forEach((story) => {
            story.genres.forEach((genre) => {
                if (!genre) return;
                if (!grouped[genre]) grouped[genre] = [];
                grouped[genre].push(story);
            });
        });

        Object.keys(grouped).forEach((genre) => {
            grouped[genre].sort((a, b) => b.publishedDate - a.publishedDate);
        });

        return grouped;
    };

    const getPlaceholderImage = () => {
        return "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 240'%3E%3Crect width='400' height='240' fill='%23374151'/%3E%3Cpath d='M100 200 L200 100 L300 200 Z' fill='%234B5563'/%3E%3Ccircle cx='200' cy='80' r='20' fill='%23F59E0B'/%3E%3C/svg%3E";
    };

    const StoryCard = ({ story }) => (
        <div
            className="flex-shrink-0 w-36 sm:w-44 md:w-56 lg:w-62  cursor-pointer group"
            onClick={() => handleStoryClick(story)}
        >
            <div className="relative aspect-[5/4] mb-2">
                <img
                    src={story.image}
                    alt={story.title}
                    className="w-full h-full object-cover rounded-lg"
                    loading="lazy"
                />
                <div
                    className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 
                               transition-all duration-200 rounded-lg flex items-center justify-center"
                >
                    <div
                        className="opacity-0 group-hover:opacity-100 transform translate-y-2 
                                  group-hover:translate-y-0 transition-all duration-200"
                    >
                        <button
                            className="p-3 bg-green-500 rounded-full hover:scale-105 
                                     transition-transform active:scale-95"
                            onClick={(e) => {
                                e.stopPropagation();
                                if (currentlyPlaying?.id === story.id) {
                                    setIsPlaying(!isPlaying);
                                } else {
                                    handleStoryClick(story);
                                }
                            }}
                        >
                            {currentlyPlaying?.id === story.id && isPlaying ? (
                                <Pause className="w-6 h-6" />
                            ) : (
                                <Play className="w-6 h-6" />
                            )}
                        </button>
                    </div>
                </div>
            </div>
            <div className="space-y-1">
                <h3 className="font-semibold text-sm md:text-base truncate">
                    {story.title}
                </h3>
                <p className="text-xs md:text-sm text-gray-400 truncate">
                    {story.creator}
                </p>
                <div className="flex items-center text-xs text-gray-400 gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{formatTime(story.duration)}</span>
                </div>
            </div>
        </div>
    );

    const handleStoryClick = (story) => {
        setCurrentlyPlaying(story);
        setIsPlaying(true);
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
                <div className="text-xl">Loading...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
                <div className="text-red-500 text-xl">{error}</div>
            </div>
        );
    }

    const filteredStories = selectedGenre
        ? { [selectedGenre]: storiesByGenres[selectedGenre] }
        : storiesByGenres;

    return (
        <div className="min-h-screen bg-gray-900 text-white flex flex-col">
            <Header />
            <Navigation activeTab="stories" />

            <div className="sticky top-0  bg-gray-900 bg-opacity-95 backdrop-blur-sm lg-mx-10">
                <div className="px-4 py-3 overflow-x-auto hide-scrollbar">
                    <div className="flex gap-2 md:gap-3">
                        <button
                            onClick={() => setSelectedGenre(null)}
                            className={`px-3 py-1.5 rounded-full transition-colors whitespace-nowrap text-sm
                                      ${
                                          !selectedGenre
                                              ? "bg-green-500"
                                              : "bg-gray-700 hover:bg-gray-600"
                                      }
                                      active:scale-95 focus:outline-none focus:ring-2 focus:ring-green-400`}
                        >
                            All Genres
                        </button>
                        {allGenres.map((genre) => (
                            <button
                                key={genre}
                                onClick={() => setSelectedGenre(genre)}
                                className={`px-3 py-1.5 rounded-full transition-colors whitespace-nowrap text-sm
                                          ${
                                              selectedGenre === genre
                                                  ? "bg-green-500"
                                                  : "bg-gray-700 hover:bg-gray-600"
                                          }
                                          active:scale-95 focus:outline-none focus:ring-2 focus:ring-green-400`}
                            >
                                {genre} ({storiesByGenres[genre]?.length || 0})
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <main className="flex-1 overflow-y-auto pb-24 lg:mx-10">
                {Object.entries(filteredStories).map(([genre, stories]) => (
                    <section key={genre} className="mb-8">
                        <h2 className="text-xl font-bold px-4 mb-4 capitalize">
                            {genre}
                        </h2>
                        <div className="px-4 overflow-x-auto hide-scrollbar">
                            <div className="flex gap-4 pb-4">
                                {stories.map((story) => (
                                    <StoryCard key={story.id} story={story} />
                                ))}
                            </div>
                        </div>
                    </section>
                ))}
            </main>

            {currentlyPlaying && (
                <div className="fixed bottom-0 left-0 right-0 bg-gray-800 border-t  border-gray-700 bg-red-500">
                    <div
                        className="w-full bg-gray-600 cursor-pointer"
                        style={{ height: "2px" }}
                        onClick={handleProgressClick}
                        ref={progressBarRef}
                    >
                        <div
                            className="h-full bg-green-500"
                            style={{
                                width: `${(currentTime / duration) * 100}%`,
                            }}
                        />
                    </div>
                    <div className="p-3 md:p-4">
                        <div className="flex items-center justify-between max-w-screen-xl mx-auto">
                            <div className="flex items-center space-x-3 flex-1 min-w-0">
                                <div className="w-12 h-12 bg-gray-700 rounded flex-shrink-0">
                                    <img
                                        src={currentlyPlaying.image}
                                        alt={currentlyPlaying.title}
                                        className="w-full h-full object-cover rounded"
                                    />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <h3 className="font-semibold text-sm md:text-base truncate">
                                        {currentlyPlaying.title}
                                    </h3>
                                    <p className="text-xs md:text-sm text-gray-400 truncate">
                                        {currentlyPlaying.creator}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center space-x-2 md:space-x-3">
                                <span className="text-xs text-gray-400 hidden sm:block">
                                    {formatTime(currentTime)} /{" "}
                                    {formatTime(duration)}
                                </span>
                                <button
                                    className="p-2 hover:bg-gray-700 rounded-full transition-colors"
                                    onClick={() => setIsMuted(!isMuted)}
                                >
                                    {isMuted ? (
                                        <VolumeX className="w-5 h-5" />
                                    ) : (
                                        <Volume2 className="w-5 h-5" />
                                    )}
                                </button>
                                <button
                                    className="p-2 hover:bg-gray-700 rounded-full transition-colors"
                                    onClick={() => setIsPlaying(!isPlaying)}
                                >
                                    {isPlaying ? (
                                        <Pause className="w-6 h-6" />
                                    ) : (
                                        <Play className="w-6 h-6" />
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <style jsx global>{`
                .hide-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .hide-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
        </div>
    );
};

export default Stories;
