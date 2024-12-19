import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

function Favorites() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem('weatherFavorites') || '[]');
    setFavorites(savedFavorites);
  }, []);

  const removeFromFavorites = (name) => {
    const updatedFavorites = favorites.filter(fav => fav.name !== name);
    setFavorites(updatedFavorites);
    localStorage.setItem('weatherFavorites', JSON.stringify(updatedFavorites));
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-white mb-6">Favorite Locations</h1>
      {favorites.length === 0 ? (
        <p className="text-white text-center">No favorite locations yet</p>
      ) : (
        <div className="grid gap-4">
          {favorites.map((location, index) => (
            <motion.div key={index} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} className="bg-white/20 backdrop-blur-md p-4 rounded-xl flex justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold text-white">{location.name}</h2>
                <p className="text-white/70">
                  {Math.round(location.temperature)}°C, {location.condition}
                </p>
              </div>
              <button onClick={() => removeFromFavorites(location.name)}className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md transition">
                Remove
              </button>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Favorites;

