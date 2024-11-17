import React, { useState } from "react";
import { Upload as UploadIcon, X, File } from "lucide-react";
import Header from "../components/Header";
import Cookies from "js-cookie";

const Upload = () => {
    const [primaryCategory, setPrimaryCategory] = useState("");
    const [subCategory, setSubCategory] = useState("");
    const [displayName, setDisplayName] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);
    const [showSuccess, setShowSuccess] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const primaryCategories = ["story", "music", "Podcasts"];

    const subCategories = {
        story: [
            "Fiction",
            "Non-Fiction",
            "Poetry",
            "Folk Tales",
            "Children Stories",
            "Historical",
        ],
        music: ["Rock", "Jazz", "Classical", "Pop", "Hip Hop", "Electronic"],
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
            // Validate file type
            const validTypes = [
                "audio/mpeg",
                "audio/wav",
                "audio/ogg",
                "audio/m4a",
                "audio/x-m4a",
            ];
            if (!validTypes.includes(file.type)) {
                setErrorMessage(
                    "Invalid file type. Please upload MP3, WAV, OGG, or M4A files only."
                );
                return;
            }

            // Validate file size (50MB max)
            const maxSize = 50 * 1024 * 1024; // 50MB in bytes
            if (file.size > maxSize) {
                setErrorMessage("File size too large. Maximum size is 50MB.");
                return;
            }

            setSelectedFile(file);
            setErrorMessage("");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsUploading(true);
        setErrorMessage("");

        const formData = new FormData();
        formData.append("content_type", primaryCategory.toLowerCase());
        formData.append("genres", subCategory);
        formData.append("title", title);
        formData.append("description", description);

        if (selectedFile) {
            formData.append("audio_file", selectedFile); // Changed from audio_url to audio_file
        }

        try {
            const userToken = Cookies.get("_ut");
            const response = await fetch("/api/upload", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${userToken}`,
                    // Remove Content-Type header to let browser set it with boundary for FormData
                },
                body: formData,
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Upload failed");
            }

            // Handle success
            setShowSuccess(true);
            setPrimaryCategory("");
            setSubCategory("");
            setDisplayName("");
            setTitle("");
            setDescription("");
            setSelectedFile(null);

            setTimeout(() => {
                setShowSuccess(false);
            }, 3000);
        } catch (error) {
            console.error("Upload error:", error);
            setErrorMessage(
                error.message || "Failed to upload file. Please try again."
            );
        } finally {
            setIsUploading(false);
        }
    };

    // Render error message if exists
    const renderError = () => {
        if (errorMessage) {
            return (
                <div className="bg-red-500 text-white p-3 rounded-lg mb-4">
                    {errorMessage}
                </div>
            );
        }
        return null;
    };

    // Render success message
    const renderSuccess = () => {
        if (showSuccess) {
            return (
                <div className="bg-green-500 text-white p-3 rounded-lg mb-4">
                    Upload completed successfully!
                </div>
            );
        }
        return null;
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white">
            <Header />

            <div className="max-w-2xl mx-auto p-6">
                <h2 className="text-2xl font-bold mb-6">Upload Content</h2>

                {renderError()}
                {renderSuccess()}

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
                            required
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
                                required
                            >
                                <option value="">Select a sub-category</option>
                                {subCategories[
                                    primaryCategory.toLowerCase()
                                ]?.map((category) => (
                                    <option key={category} value={category}>
                                        {category}
                                    </option>
                                ))}
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
                            required
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
                            required
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
                            required
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
                                                accept="audio/*"
                                                required
                                            />
                                        </label>
                                        <p className="pl-1 text-gray-400">
                                            or drag and drop
                                        </p>
                                    </div>
                                    <p className="text-xs text-gray-400 mt-2">
                                        Supported formats: MP3, WAV, M4A (Max
                                        size: 50MB)
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
                        disabled={isUploading || !selectedFile}
                        className="w-full bg-blue-500 text-white py-3 px-4 rounded-lg hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isUploading ? "Uploading..." : "Upload Content"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Upload;
