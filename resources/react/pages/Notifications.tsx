import React, { useState } from "react";
import {
    Bell,
    Clock,
    Check,
    X,
    AlertCircle,
    Music,
    BookOpen,
} from "lucide-react";
import Header from "../components/Header";

const Notifications = () => {
    const [notifications, setNotifications] = useState([
        {
            id: 1,
            type: "new_content",
            title: "New Story Available",
            message: 'The latest chapter of "The Odyssey" is now available',
            time: "2 hours ago",
            read: false,
            icon: BookOpen,
        },
        {
            id: 2,
            type: "recommendation",
            title: "Recommended for You",
            message: 'Based on your interests: "Jazz Classics Collection"',
            time: "5 hours ago",
            read: false,
            icon: Music,
        },
        {
            id: 3,
            type: "system",
            title: "System Update",
            message: "NarrativeNest has been updated with new features",
            time: "1 day ago",
            read: true,
            icon: AlertCircle,
        },
    ]);

    const [filter, setFilter] = useState("all");

    const markAsRead = (id) => {
        setNotifications(
            notifications.map((notif) =>
                notif.id === id ? { ...notif, read: true } : notif
            )
        );
    };

    const removeNotification = (id) => {
        setNotifications(notifications.filter((notif) => notif.id !== id));
    };

    const markAllAsRead = () => {
        setNotifications(
            notifications.map((notif) => ({ ...notif, read: true }))
        );
    };

    const clearAllNotifications = () => {
        setNotifications([]);
    };

    const filteredNotifications = notifications.filter((notif) => {
        if (filter === "unread") return !notif.read;
        if (filter === "read") return notif.read;
        return true;
    });

    const getIconComponent = (IconComponent) => {
        return <IconComponent className="w-6 h-6 text-blue-500" />;
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white p-4">
            <Header />
            <div className="max-w-2xl mx-auto">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center space-x-2">
                        <Bell className="w-6 h-6 text-blue-500" />
                        <h1 className="text-xl font-semibold">Notifications</h1>
                        {notifications.filter((n) => !n.read).length > 0 && (
                            <span className="bg-blue-500 text-white text-sm px-2 py-1 rounded-full">
                                {notifications.filter((n) => !n.read).length}
                            </span>
                        )}
                    </div>
                    <div className="flex space-x-2">
                        {notifications.some((n) => !n.read) && (
                            <button
                                onClick={markAllAsRead}
                                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-sm"
                            >
                                Mark all as read
                            </button>
                        )}
                        {notifications.length > 0 && (
                            <button
                                onClick={clearAllNotifications}
                                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 text-sm"
                            >
                                Clear all
                            </button>
                        )}
                    </div>
                </div>

                {/* Filters */}
                <div className="flex space-x-2 mb-6">
                    {["all", "unread", "read"].map((filterType) => (
                        <button
                            key={filterType}
                            onClick={() => setFilter(filterType)}
                            className={`px-4 py-2 rounded-lg text-sm capitalize ${
                                filter === filterType
                                    ? "bg-blue-500 text-white"
                                    : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                            }`}
                        >
                            {filterType}
                        </button>
                    ))}
                </div>

                {/* Notifications List */}
                <div className="space-y-4">
                    {filteredNotifications.length === 0 ? (
                        <div className="text-center py-8 text-gray-400">
                            No notifications to display
                        </div>
                    ) : (
                        filteredNotifications.map((notification) => (
                            <div
                                key={notification.id}
                                className={`p-4 rounded-lg ${
                                    notification.read
                                        ? "bg-gray-800"
                                        : "bg-gray-700"
                                } transition-colors duration-200`}
                            >
                                <div className="flex items-start justify-between">
                                    <div className="flex items-start space-x-3">
                                        <div className="mt-1">
                                            {getIconComponent(
                                                notification.icon
                                            )}
                                        </div>
                                        <div>
                                            <h3 className="font-medium">
                                                {notification.title}
                                            </h3>
                                            <p className="text-gray-400 text-sm mt-1">
                                                {notification.message}
                                            </p>
                                            <div className="flex items-center space-x-2 mt-2 text-sm text-gray-400">
                                                <Clock className="w-4 h-4" />
                                                <span>{notification.time}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex space-x-2">
                                        {!notification.read && (
                                            <button
                                                onClick={() =>
                                                    markAsRead(notification.id)
                                                }
                                                className="p-1 hover:bg-gray-600 rounded-full"
                                                title="Mark as read"
                                            >
                                                <Check className="w-5 h-5 text-green-500" />
                                            </button>
                                        )}
                                        <button
                                            onClick={() =>
                                                removeNotification(
                                                    notification.id
                                                )
                                            }
                                            className="p-1 hover:bg-gray-600 rounded-full"
                                            title="Remove notification"
                                        >
                                            <X className="w-5 h-5 text-red-500" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default Notifications;
