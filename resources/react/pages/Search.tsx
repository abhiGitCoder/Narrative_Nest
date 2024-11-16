import React, { useState } from "react";
import { Search as SearchIcon, Filter, X } from "lucide-react";
import Header from "../components/Header";

const Search = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedFilter, setSelectedFilter] = useState("all");

    const filters = ["All", "Stories", "Music", "Podcasts"];

    const sampleResults = [
        {
            id: 1,
            title: "The Odyssey",
            type: "Stories",
            description: "An epic Greek poem attributed to Homer",
        },
        {
            id: 2,
            title: "Jazz Classics",
            type: "Music",
            description: "A collection of timeless jazz masterpieces",
        },
        {
            id: 3,
            title: "Tech Talk Daily",
            type: "Podcasts",
            description: "Daily technology news and discussions",
        },
    ].filter(
        (item) =>
            searchQuery &&
            (item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.description
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase()))
    );

    return (
        <div className="min-h-screen bg-gray-900 text-white p-4">
            <Header />
            <div className="max-w-4xl mx-auto">
                <div className="relative mb-6">
                    <div className="relative">
                        <SearchIcon className="absolute left-4 top-3 text-gray-400 w-6 h-6" />
                        <input
                            type="text"
                            placeholder="Search for stories, music, or podcasts..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-10 py-3 bg-gray-800 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {searchQuery && (
                            <button
                                onClick={() => setSearchQuery("")}
                                className="absolute right-4 top-3 text-gray-400 hover:text-white"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        )}
                    </div>
                </div>

                <div className="flex space-x-4 mb-6 overflow-x-auto pb-2">
                    {filters.map((filter) => (
                        <button
                            key={filter}
                            onClick={() =>
                                setSelectedFilter(filter.toLowerCase())
                            }
                            className={`px-4 py-2 rounded-full ${
                                selectedFilter === filter.toLowerCase()
                                    ? "bg-blue-500 text-white"
                                    : "bg-gray-800 text-gray-400 hover:bg-gray-700"
                            }`}
                        >
                            {filter}
                        </button>
                    ))}
                </div>

                {searchQuery ? (
                    <div className="space-y-4">
                        {sampleResults.length > 0 ? (
                            sampleResults.map((result) => (
                                <div
                                    key={result.id}
                                    className="bg-gray-800 rounded-lg border border-gray-700 p-4 hover:bg-gray-750 transition-colors"
                                >
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="text-lg font-semibold mb-1">
                                                {result.title}
                                            </h3>
                                            <p className="text-gray-400 text-sm mb-2">
                                                {result.description}
                                            </p>
                                            <span className="inline-block px-2 py-1 text-xs bg-gray-700 rounded">
                                                {result.type}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center text-gray-400 py-8">
                                No results found for "{searchQuery}"
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="text-center text-gray-400 py-8">
                        Start typing to search...
                    </div>
                )}
            </div>
        </div>
    );
};

export default Search;
