import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Favorites from './pages/Favorites';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600">
        <nav className="bg-white/10 backdrop-blur-md p-4">
          <div className="flex justify-between items-center w-full">
            <h1 className="text-2xl font-bold text-white">Weather Finder</h1>
            <div className="space-x-4">
              <Link  to="/"  className="text-white hover:text-blue-200 transition duration-300">
                Home
              </Link>
              <Link to="/favorites" className="text-white hover:text-blue-200 transition duration-300">
                Favorites
              </Link>
              <a href="https://pooranaselvan.vercel.app/" target='_blank' className="text-white hover:text-blue-200 transition duration-300">
                About
              </a>
            </div>
          </div>
        </nav>

        <div className="px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/favorites" element={<Favorites />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;

