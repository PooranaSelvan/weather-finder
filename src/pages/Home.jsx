import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const weatherImages = {
  clear: '/clear.jpg',
  cloudy: '/cloudy.jpg',
  rain: '/rain.jpg',
  thunderstorm: '/thunderstrom.jpg',
  snow: '/snow.jpg',
  default: '/clear.jpg'
};

function Home() {
  const [location, setLocation] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const API_KEY = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem('weatherFavorites') || '[]');
    setFavorites(savedFavorites);
  }, []);

  const determineWeatherCondition = (weatherCode) => {
     const conditions = {
          // Clear
          1000: 'clear',
        
          // Partly Cloudy
          1100: 'cloudy',
          1101: 'cloudy',
        
          // Cloudy
          1102: 'cloudy',
          2000: 'fog',
          2100: 'light-fog',
        
          // Rain
          4000: 'rain',
          4001: 'rain',
          4200: 'rain',
          4201: 'rain',
        
          // Snow
          5000: 'snow',
          5001: 'snow',
          5100: 'snow',
          5101: 'snow',
        
          // Freezing Rain
          6000: 'rain',
          6001: 'rain',
          6200: 'rain',
          6201: 'rain',
        
          // Ice
          7000: 'snow',
          7101: 'snow',
          7102: 'snow',
        
          // Thunderstorm
          8000: 'thunderstorm'
     };        
    return conditions[weatherCode] || 'default';
  };

  const fetchWeather = async () => {
    try {
      const response = await fetch(
        `https://api.tomorrow.io/v4/weather/forecast?location=${location}&apikey=${API_KEY}`
      );
      const data = await response.json();
      setWeatherData(data);
    } catch (error) {
      console.error('Weather fetch error:', error);
    }
  };

  const addToFavorites = () => {
    if (weatherData && !favorites.some(fav => fav.name === weatherData.location.name)) {
      const newFavorite = {
        name: weatherData.location.name,
        temperature: weatherData.timelines.hourly[0].values.temperature,
        condition: determineWeatherCondition(weatherData.timelines.hourly[0].values.weatherCode)
      };
      const updatedFavorites = [...favorites, newFavorite];
      setFavorites(updatedFavorites);
      localStorage.setItem('weatherFavorites', JSON.stringify(updatedFavorites));
    }
  };

  const renderWeatherDetails = () => {
    if (!weatherData) return null;

    const hourlyData = weatherData.timelines.hourly[0];
//     console.log(hourlyData);
    const condition = determineWeatherCondition(hourlyData.values.weatherCode);
//     console.log(condition);
    
    const backgroundImage = weatherImages[condition];

    return (
      <motion.div initial={{ opacity: 0, y: 50 }}animate={{ opacity: 1, y: 0 }}className="relative mt-8 rounded-xl overflow-hidden shadow-lg">
        <div className="absolute inset-0 bg-cover bg-center"style={{ backgroundImage: `url(${backgroundImage})` }}>
          <div className="absolute inset-0 bg-black opacity-50"></div>
        </div>
        
        <div className="relative z-10 p-6 text-white">
          <div className="flex justify-between items-center gap-5">
            <h2 className="text-3xl font-bold">{weatherData.location.name}</h2>
            <button  onClick={addToFavorites} className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-md transition">
              Add to Favorites
            </button>
          </div>
          <div className="mt-4">
            <p className="text-6xl font-light">
              {Math.round(hourlyData.values.temperature)}°C
            </p>
            <p className="text-xl capitalize">{condition}</p>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm opacity-75">Humidity</p>
                <p>{hourlyData.values.humidity}%</p>
              </div>
              <div>
                <p className="text-sm opacity-75">Wind Speed</p>
                {/* {console.log(hourlyData.values)} */}
                <p>{hourlyData.values.windSpeed} km/h</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white/20 backdrop-blur-md p-6 rounded-xl">
        <div className="flex">
          <input type="text" value={location}onChange={(e) => setLocation(e.target.value)}placeholder="Enter city or location"className="flex-grow px-4 py-2 rounded-l-md bg-white/20 text-white placeholder-white/70"/>
          <button onClick={fetchWeather}className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-r-md transition">
            Search
          </button>
        </div>
      </div>
      
      {renderWeatherDetails()}
    </div>
  );
}

export default Home;

