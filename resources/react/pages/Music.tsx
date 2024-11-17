import React, { useEffect, useState, useRef } from "react";
import { Play, Pause } from "lucide-react";
import Header from "../components/Header";
import Navigation from "../components/Navigation";

const Music = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [musicData, setMusicData] = useState({});
    const [currentlyPlaying, setCurrentlyPlaying] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [groupBy, setGroupBy] = useState("genre"); // 'genre' or 'language'
    const audioRef = useRef(new Audio());

    useEffect(() => {
        fetchMusicData();
    }, []);

    useEffect(() => {
        const audio = audioRef.current;

        if (currentlyPlaying) {
            audio.src = currentlyPlaying.audioUrl;
            if (isPlaying) {
                audio.play().catch((error) => {
                    console.error("Error playing audio:", error);
                });
            } else {
                audio.pause();
            }
        }

        return () => {
            audio.pause();
            audio.src = "";
        };
    }, [currentlyPlaying, isPlaying]);

    const fetchMusicData = async () => {
        try {
            const response = await fetch("/api/music-data");
            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || "Failed to fetch music data");
            }

            if (result.success) {
                // Group songs by both genre and language
                const groupedByGenre = {};
                const groupedByLanguage = {};

                result.data.forEach((song) => {
                    // Group by genre
                    const genre = song.genre.toLowerCase();
                    if (!groupedByGenre[genre]) {
                        groupedByGenre[genre] = [];
                    }
                    groupedByGenre[genre].push(formatSong(song));

                    // Group by language
                    const language = song.music_language.toLowerCase();
                    if (!groupedByLanguage[language]) {
                        groupedByLanguage[language] = [];
                    }
                    groupedByLanguage[language].push(formatSong(song));
                });

                setMusicData({
                    byGenre: groupedByGenre,
                    byLanguage: groupedByLanguage,
                });
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const formatSong = (song) => ({
        id: song.id,
        title: song.title,
        description: song.description,
        image:
            song.cover_image === "default_image.jpg"
                ? getPlaceholderImage()
                : song.cover_image,
        type: song.content_type,
        creator: song.creator,
        duration: song.duration,
        audioUrl: song.audio_url,
        genre: song.genre,
        language: song.music_language,
        album: song.album,
        publishedDate: song.published_date,
        isFeatured: song.is_featured,
        isNewRelease: song.is_new_release,
    });

    const getPlaceholderImage = () => {
        return "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 240'%3E%3Crect width='400' height='240' fill='%23374151'/%3E%3Cpath d='M150 120 L250 120 M200 70 L200 170' stroke='%23F59E0B' stroke-width='12'/%3E%3C/svg%3E";
    };

    const handleSongClick = (song) => {
        setCurrentlyPlaying(song);
        setIsPlaying(true);
    };

    const handlePlayPauseClick = () => {
        setIsPlaying(!isPlaying);
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

    const currentGrouping =
        groupBy === "genre" ? musicData.byGenre : musicData.byLanguage;

    return (
        <div className="min-h-screen bg-gray-900 text-white">
            <Header />
            <Navigation activeTab="music" />

            <div className="px-6 py-4 flex space-x-4">
                <button
                    onClick={() => setGroupBy("genre")}
                    className={`px-4 py-2 rounded-full ${
                        groupBy === "genre" ? "bg-green-500" : "bg-gray-700"
                    }`}
                >
                    Group by Genre
                </button>
                <button
                    onClick={() => setGroupBy("language")}
                    className={`px-4 py-2 rounded-full ${
                        groupBy === "language" ? "bg-green-500" : "bg-gray-700"
                    }`}
                >
                    Group by Language
                </button>
            </div>

            <main className="pb-24">
                {Object.entries(currentGrouping).map(([category, songs]) => (
                    <div key={category} className="mb-8">
                        <h2 className="text-2xl font-bold px-6 mb-4 capitalize">
                            {category}
                        </h2>
                        <div className="relative">
                            <div className="flex overflow-x-auto hide-scrollbar px-6 space-x-4">
                                {songs.map((song) => (
                                    <div
                                        key={song.id}
                                        className="flex-shrink-0 w-48 cursor-pointer"
                                        onClick={() => handleSongClick(song)}
                                    >
                                        <div className="relative group">
                                            <img
                                                src={song.image}
                                                alt={song.title}
                                                className="w-48 h-48 object-cover rounded-lg"
                                            />
                                            <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-60 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button
                                                    className="p-3 bg-green-500 rounded-full hover:scale-105 transition-transform"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        if (
                                                            currentlyPlaying?.id ===
                                                            song.id
                                                        ) {
                                                            handlePlayPauseClick();
                                                        } else {
                                                            handleSongClick(
                                                                song
                                                            );
                                                        }
                                                    }}
                                                >
                                                    {currentlyPlaying?.id ===
                                                        song.id && isPlaying ? (
                                                        <Pause size={24} />
                                                    ) : (
                                                        <Play size={24} />
                                                    )}
                                                </button>
                                            </div>
                                        </div>
                                        <h3 className="mt-2 font-semibold truncate">
                                            {song.title}
                                        </h3>
                                        <p className="text-sm text-gray-400 truncate">
                                            {song.album !== "Unknown Album"
                                                ? song.album
                                                : song.creator}
                                        </p>
                                        {song.isNewRelease && (
                                            <span className="inline-block bg-green-500 text-xs px-2 py-1 rounded-full mt-1">
                                                New Release
                                            </span>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </main>

            {currentlyPlaying && (
                <div className="fixed bottom-0 left-0 right-0 bg-gray-800 border-t border-gray-700 p-4">
                    <div className="flex items-center justify-between max-w-screen-xl mx-auto">
                        <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-gray-700 rounded">
                                <img
                                    src={currentlyPlaying.image}
                                    alt={currentlyPlaying.title}
                                    className="w-full h-full object-cover rounded"
                                />
                            </div>
                            <div>
                                <h3 className="font-semibold">
                                    {currentlyPlaying.title}
                                </h3>
                                <p className="text-sm text-gray-400">
                                    {currentlyPlaying.album !== "Unknown Album"
                                        ? `${currentlyPlaying.creator} • ${currentlyPlaying.album}`
                                        : currentlyPlaying.creator}
                                </p>
                            </div>
                        </div>

                        <button
                            className="p-2 hover:bg-gray-700 rounded-full transition-colors"
                            onClick={handlePlayPauseClick}
                        >
                            {isPlaying ? (
                                <Pause size={24} />
                            ) : (
                                <Play size={24} />
                            )}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Music;
