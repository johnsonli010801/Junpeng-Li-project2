import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from "./App.jsx";

import HomePage from "./routes/HomePage.jsx";
import GamesPage from "./routes/GamesPage.jsx";   
import GamePage from "./routes/GamePage.jsx";     
import RulesPage from "./routes/RulesPage.jsx";
import ScoresPage from "./routes/ScoresPage.jsx";
import LoginPage from "./routes/LoginPage.jsx";
import RegisterPage from "./routes/RegisterPage.jsx";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          {/* / */}
          <Route index element={<HomePage />} />

          {/* /games -> Selection Page */}
          <Route path="games" element={<GamesPage />} />

          {/* /games/easy & /games/normal -> GamePage */}
          <Route path="games/easy" element={<GamePage mode="easy" />} />
          <Route path="games/normal" element={<GamePage mode="normal" />} />
          <Route path="rules" element={<RulesPage />} />
          <Route path="scores" element={<ScoresPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
