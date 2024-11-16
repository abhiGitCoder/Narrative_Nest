import React, { useState } from "react";
import {
    User as UserIcon,
    Settings,
    BookOpen,
    Music,
    Headphones,
    LogOut,
} from "lucide-react";
import Header from "../components/Header";

const User = () => {
    const [activeTab, setActiveTab] = useState("profile");

    const userProfile = {
        name: "John Doe",
        email: "john.doe@example.com",
        joinDate: "January 2024",
        preferences: {
            theme: "dark",
            notifications: true,
            autoplay: true,
        },
        stats: {
            storiesRead: 42,
            songsPlayed: 156,
            podcastsListened: 23,
        },
    };

    const renderContent = () => {
        switch (activeTab) {
            case "profile":
                return (
                    <div className="space-y-6">
                        <div className="flex items-center space-x-4">
                            <div className="w-20 h-20 bg-gray-700 rounded-full flex items-center justify-center">
                                <UserIcon className="w-10 h-10 text-gray-400" />
                            </div>
                            <div>
                                <h2 className="text-xl font-semibold">
                                    {userProfile.name}
                                </h2>
                                <p className="text-gray-400">
                                    Member since {userProfile.joinDate}
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                            <div className="bg-gray-800 rounded-lg border border-gray-700 p-4">
                                <div className="text-center">
                                    <BookOpen className="w-8 h-8 mx-auto mb-2 text-blue-500" />
                                    <div className="text-2xl font-bold">
                                        {userProfile.stats.storiesRead}
                                    </div>
                                    <div className="text-sm text-gray-400">
                                        Stories Read
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-800 rounded-lg border border-gray-700 p-4">
                                <div className="text-center">
                                    <Music className="w-8 h-8 mx-auto mb-2 text-blue-500" />
                                    <div className="text-2xl font-bold">
                                        {userProfile.stats.songsPlayed}
                                    </div>
                                    <div className="text-sm text-gray-400">
                                        Songs Played
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-800 rounded-lg border border-gray-700 p-4">
                                <div className="text-center">
                                    <Headphones className="w-8 h-8 mx-auto mb-2 text-blue-500" />
                                    <div className="text-2xl font-bold">
                                        {userProfile.stats.podcastsListened}
                                    </div>
                                    <div className="text-sm text-gray-400">
                                        Podcasts
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            case "settings":
                return (
                    <div className="space-y-6">
                        <div className="bg-gray-800 rounded-lg border border-gray-700 p-4">
                            <h3 className="text-lg font-semibold mb-4">
                                Account Settings
                            </h3>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <span>Email</span>
                                    <span className="text-gray-400">
                                        {userProfile.email}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span>Theme</span>
                                    <select className="bg-gray-700 rounded px-3 py-1">
                                        <option>Dark</option>
                                        <option>Light</option>
                                    </select>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span>Notifications</span>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            className="sr-only peer"
                                            defaultChecked={
                                                userProfile.preferences
                                                    .notifications
                                            }
                                        />
                                        <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                    </label>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span>Autoplay</span>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            className="sr-only peer"
                                            defaultChecked={
                                                userProfile.preferences.autoplay
                                            }
                                        />
                                        <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                    </label>
                                </div>
                            </div>
                        </div>

                        <button className="w-full py-3 px-4 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center justify-center space-x-2">
                            <LogOut className="w-5 h-5" />
                            <span>Sign Out</span>
                        </button>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white p-4">
            <Header />
            <div className="max-w-2xl mx-auto">
                <div className="flex space-x-4 mb-6">
                    <button
                        onClick={() => setActiveTab("profile")}
                        className={`px-4 py-2 rounded-lg flex items-center space-x-2 ${
                            activeTab === "profile"
                                ? "bg-blue-500 text-white"
                                : "bg-gray-800 text-gray-400 hover:bg-gray-700"
                        }`}
                    >
                        <UserIcon className="w-5 h-5" />
                        <span>Profile</span>
                    </button>
                    <button
                        onClick={() => setActiveTab("settings")}
                        className={`px-4 py-2 rounded-lg flex items-center space-x-2 ${
                            activeTab === "settings"
                                ? "bg-blue-500 text-white"
                                : "bg-gray-800 text-gray-400 hover:bg-gray-700"
                        }`}
                    >
                        <Settings className="w-5 h-5" />
                        <span>Settings</span>
                    </button>
                </div>

                {renderContent()}
            </div>
        </div>
    );
};

export default User;
