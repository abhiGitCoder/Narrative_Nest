import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import LoginPage from "./pages/Login";
import Music from "./pages/Music";
import Podcasts from "./pages/Podcasts";
import Register from "./pages/Register";
import Stories from "./pages/Stories";

// import '../../css/app.css';

function Main() {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/home" element={<Home />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/music" element={<Music />} />
                    <Route path="/stories" element={<Stories />} />
                    <Route path="/podcasts" element={<Podcasts />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

const root = createRoot(document.getElementById("app"));
root.render(<Main />);
