import React, { useState } from "react";
import { Upload as UploadIcon, X, File } from "lucide-react";
import Header from "../components/Header";

const Upload = () => {
    const [primaryCategory, setPrimaryCategory] = useState("");
    const [subCategory, setSubCategory] = useState("");
    const [displayName, setDisplayName] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);

    const primaryCategories = ["Stories", "Music", "Podcasts"];

    const subCategories = {
        Stories: [
            "Fiction",
            "Non-Fiction",
            "Poetry",
            "Folk Tales",
            "Children Stories",
            "Historical",
        ],
        Music: ["Rock", "Jazz", "Classical", "Pop", "Hip Hop", "Electronic"],
        Podcasts: [
            "Technology",
            "Science",
            "History",
            "True Crime",
            "Comedy",
            "Education",
        ],
    };

    const handleFileSelect = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission here
        console.log({
            primaryCategory,
            subCategory,
            displayName,
            title,
            description,
            selectedFile,
        });
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white">
            <Header />

            <div className="max-w-2xl mx-auto p-6">
                <h2 className="text-2xl font-bold mb-6">Upload Content</h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Primary Category Selection */}
                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Select Category
                        </label>
                        <select
                            value={primaryCategory}
                            onChange={(e) => {
                                setPrimaryCategory(e.target.value);
                                setSubCategory("");
                            }}
                            className="w-full px-4 py-3 bg-gray-800 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        >
                            <option value="">Select a category</option>
                            {primaryCategories.map((category) => (
                                <option key={category} value={category}>
                                    {category}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Sub-Category Selection */}
                    {primaryCategory && (
                        <div>
                            <label className="block text-sm font-medium mb-2">
                                Select {primaryCategory} Category
                            </label>
                            <select
                                value={subCategory}
                                onChange={(e) => setSubCategory(e.target.value)}
                                className="w-full px-4 py-3 bg-gray-800 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            >
                                <option value="">Select a sub-category</option>
                                {subCategories[primaryCategory].map(
                                    (category) => (
                                        <option key={category} value={category}>
                                            {category}
                                        </option>
                                    )
                                )}
                            </select>
                        </div>
                    )}

                    {/* Display Name */}
                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Display Name
                        </label>
                        <input
                            type="text"
                            value={displayName}
                            onChange={(e) => setDisplayName(e.target.value)}
                            placeholder="Enter your display name"
                            className="w-full px-4 py-3 bg-gray-800 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                    </div>

                    {/* Content Title */}
                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Title
                        </label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Enter content title"
                            className="w-full px-4 py-3 bg-gray-800 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Description
                        </label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Enter content description"
                            rows="4"
                            className="w-full px-4 py-3 bg-gray-800 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                    </div>

                    {/* File Upload */}
                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Upload File
                        </label>
                        <div className="border-2 border-dashed border-gray-700 rounded-lg p-6">
                            {!selectedFile ? (
                                <div className="text-center">
                                    <UploadIcon className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                                    <div className="flex text-sm justify-center">
                                        <label className="relative cursor-pointer bg-gray-800 rounded-md font-medium text-blue-500 hover:text-blue-400">
                                            <span>Upload a file</span>
                                            <input
                                                type="file"
                                                className="sr-only"
                                                onChange={handleFileSelect}
                                            />
                                        </label>
                                        <p className="pl-1 text-gray-400">
                                            or drag and drop
                                        </p>
                                    </div>
                                    <p className="text-xs text-gray-400 mt-2">
                                        Supported formats depending on category
                                    </p>
                                </div>
                            ) : (
                                <div className="flex items-center justify-between bg-gray-800 p-4 rounded-lg">
                                    <div className="flex items-center">
                                        <File className="h-6 w-6 text-gray-400 mr-2" />
                                        <span className="text-sm">
                                            {selectedFile.name}
                                        </span>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => setSelectedFile(null)}
                                        className="text-gray-400 hover:text-white"
                                    >
                                        <X className="h-5 w-5" />
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-3 px-4 rounded-lg hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Upload Content
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Upload;
