import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WeatherPage from './pages/WeatherPage';
import HistoryPage from './pages/HistoryPage';
import AboutUsPage from './pages/AboutUsPage';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HistoryPage />} />
        <Route path="/weather" element={<WeatherPage />} />
        <Route path="/history" element={<HistoryPage />} />
        <Route path="/about-us" element={<AboutUsPage />} />
      </Routes>
    </Router>
  );
}
