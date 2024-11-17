import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import LoginPage from "./pages/Login";
import Music from "./pages/Music";
import Notifications from "./pages/Notifications";
import NowPlayingPage from "./pages/NowPlaying";
import Podcasts from "./pages/Podcasts";
import Register from "./pages/Register";
import Search from "./pages/Search";
import Stories from "./pages/Stories";
import StoryTeller from "./pages/StoryTeller";
import Upload from "./pages/Upload";
import User from "./pages/User";

// import '../../css/app.css';

function Main() {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<LoginPage />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/register" element={<Register />} />

                    <Route path="/music" element={<Music />} />
                    <Route path="/stories" element={<Stories />} />
                    <Route path="/podcasts" element={<Podcasts />} />
                    <Route path="/search" element={<Search />} />
                    <Route path="/user" element={<User />} />
                    <Route path="/notifications" element={<Notifications />} />
                    <Route path="/upload" element={<Upload />} />
                    <Route path="/now-playing" element={<NowPlayingPage />} />
                    <Route path="/storyteller" element={<StoryTeller/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

const root = createRoot(document.getElementById("app"));
root.render(<Main />);
