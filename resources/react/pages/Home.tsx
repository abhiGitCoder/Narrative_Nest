import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Navigation from "../components/Navigation";
import NowPlayingBar from "../components/NowPlayingBar";

// Enhanced CategorySection Component
const CategorySection = ({ title, items, onItemClick }) => {
  return (
    <section className="mt-6">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <div className="relative">
        <div className="flex overflow-x-auto scrollbar-hide gap-4 pb-4" style={{
          msOverflowStyle: 'none',
          scrollbarWidth: 'none',
        }}>
          {items.map((item, index) => (
            <div 
              key={item.id || index}
              className="flex-none w-64 cursor-pointer transition-transform hover:scale-105"
              onClick={() => onItemClick(item.type)}
            >
              <div className="bg-[#282828] rounded-lg overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-semibold truncate">{item.title}</h3>
                  <p className="text-gray-400 text-sm mt-1 line-clamp-2">{item.description}</p>
                  <div className="flex items-center mt-2 text-sm text-gray-400">
                    <span>{item.type}</span>
                    {item.duration && (
                      <>
                        <span className="mx-2">•</span>
                        <span>{item.duration}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Enhanced Home Component
const Home = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [homeData, setHomeData] = useState({
        featuredContent: [],
        newReleases: []
    });

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
                    featuredContent: formatContentItems(result.data.featured_content),
                    newReleases: formatContentItems(result.data.new_releases)
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
        return items.map(item => ({
            title: item.title,
            description: item.description,
            image: item.cover_image || getPlaceholderImage(item.content_type),
            type: capitalizeFirstLetter(item.content_type),
            creator: item.creator,
            duration: item.duration,
            id: item.id
        }));
    };

    const getPlaceholderImage = (contentType) => {
        const placeholders = {
            story: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 240'%3E%3Crect width='400' height='240' fill='%23374151'/%3E%3Cpath d='M100 200 L200 100 L300 200 Z' fill='%234B5563'/%3E%3Ccircle cx='200' cy='80' r='20' fill='%23F59E0B'/%3E%3C/svg%3E",
            music: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 240'%3E%3Crect width='400' height='240' fill='%23374151'/%3E%3Cpath d='M150 120 L250 120 M200 70 L200 170' stroke='%23F59E0B' stroke-width='12'/%3E%3C/svg%3E",
            podcast: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 240'%3E%3Crect width='400' height='240' fill='%23374151'/%3E%3Ccircle cx='200' cy='120' r='60' fill='%234B5563'/%3E%3Cpath d='M200 80 L200 160 M180 140 L220 140' stroke='%23F59E0B' stroke-width='8'/%3E%3C/svg%3E"
        };
        return placeholders[contentType] || placeholders.story;
    };

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    const handleContentClick = (type) => {
        navigate(`/${type.toLowerCase()}`);
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-[#121212] text-white flex items-center justify-center">
                <div className="text-xl animate-pulse">Loading...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-[#121212] text-white flex items-center justify-center">
                <div className="text-red-500 text-xl bg-[#282828] p-4 rounded-lg shadow-lg">{error}</div>
            </div>
        );
    }

    return (
        <div className="relative min-h-screen bg-[#121212] text-white">
            {/* Hide status bar */}
            <div className="fixed top-0 left-0 right-0 h-8 bg-[#121212] -mt-8" />
            
            {/* Main content wrapper */}
            <div className="flex flex-col h-screen">
                {/* Header section */}
                <div className="bg-gradient-to-b from-[#232323] to-[#121212] pb-4">
                    <Header />
                    <Navigation activeTab="all" />
                </div>

                {/* Scrollable main content with hidden scrollbar */}
                <main className="flex-1 overflow-y-auto scrollbar-hide" style={{
                    msOverflowStyle: 'none',
                    scrollbarWidth: 'none',
                }}>
                    <style>
                        {`
                            .scrollbar-hide::-webkit-scrollbar {
                                display: none;
                            }
                            .scrollbar-hide {
                                -ms-overflow-style: none;
                                scrollbar-width: none;
                            }
                        `}
                    </style>
                    <div className="px-4 md:px-6 lg:px-8 max-w-7xl mx-auto">
                        <CategorySection
                            title="Featured Content"
                            items={homeData.featuredContent}
                            onItemClick={handleContentClick}
                        />
                        <div className="h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent my-8" />
                        <CategorySection
                            title="New Releases"
                            items={homeData.newReleases}
                            onItemClick={handleContentClick}
                        />
                    </div>
                </main>

                {/* Now playing bar */}
                <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-[#181818] to-[#282828] shadow-lg">
                    <NowPlayingBar />
                </div>
            </div>
        </div>
    );
};

export default Home;