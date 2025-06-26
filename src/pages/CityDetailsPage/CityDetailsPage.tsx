import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import { CircularProgress } from '@mui/material';
import citiesDataRaw from '../../data/data.json';
import DailyForecasts from '../../components/DailyForecasts';
import Units from '../../components/Units';
import type { ForecastResponse } from '../../types/Forecast';
import type { City } from '../../types/City';
import { motion } from 'framer-motion';
import './CityDetailsPage.css';

const DEFAULT_UNITS = 'metric';
const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

const CityDetailsPage = () => {
  const { cityName } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [weatherData, setWeatherData] = useState<ForecastResponse | null>(null);
  const [units, setUnits] = useState<'metric' | 'imperial'>(DEFAULT_UNITS);

  const city = useMemo(() => {
    const allCities = (citiesDataRaw as { cities: City[] }).cities;
    return allCities.find((c) => c.name === cityName);
  }, [cityName]);

  useEffect(() => {
    if (!city) return;
    
    const { lat, lng } = city.coords;
    const fetchWeather = async () => {
      try {
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lng}&units=${units}&appid=${API_KEY}`
        );
        const data = await res.json();
        setWeatherData(data);
      } catch (err) {
        console.error('Error fetching weather:', err);
      }
    };

    fetchWeather();
  }, [city, units]);


  const dailyForecasts = useMemo(() => {
    if (!weatherData || !weatherData.list) {
      return [];
    }
  
    const forecastByDate: Record<string, typeof weatherData.list> = {};
  
    for (const item of weatherData.list) {
      const date = item.dt_txt.split(' ')[0];
      if (!forecastByDate[date]) {
        forecastByDate[date] = [];
      }
      forecastByDate[date].push(item);
    }
  
    return Object.entries(forecastByDate)
      .slice(0, 5)
      .map(([date, items]) => {
        const noonItem =
          items.find((i) => i.dt_txt.includes('12:00:00')) ||
          items[Math.floor(items.length / 2)];
        return {
          date,
          temp: Math.round(noonItem.main.temp),
          description: noonItem.weather[0].main,
        };
      });
  }, [weatherData]);

  const handleUnitsChange = (key: string, value: string) => {
    if (key === 'units' && (value === 'metric' || value === 'imperial')) {
      setUnits(value);
    }
  };
  
  if (!city) {
    return (
      <div className="centered-content">
          <button className='back-btn' onClick={() => navigate(`/?${location.search}`)}>
            ← Back
          </button> 
        <motion.p
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 2, opacity: 1 }}
            transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}>
            City not found 😕
        </motion.p>
    </div>
    );
  }
  

  if (!weatherData?.list) {
      return (
      <div className='centered-content'>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <CircularProgress size={80} />
        </motion.div>

      </div>
      );
  }


  return (
    <div className='city-details-wrapper'>
      <motion.div 
        className='city-details'
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{  backgroundImage: `url(${city.image})` }}
      >
        <div className='city-details-content'>
          <button className='back-btn' onClick={() => navigate(`/?${location.search}`)}>
            ← Back
          </button>

          <h1>{city.name}</h1>
          <h2>{city.country}</h2>
          <p>{city.description}</p>

          
          <div className='units-wrapper'>
            <Units
              units={units}
              handleChange={(key, value) => handleUnitsChange(key, value)}
              isHeader={false}
            />
          </div>
          <DailyForecasts
            weatherData={weatherData}
            units={units}
            dailyForecasts={dailyForecasts}
          />
        </div>
      </motion.div>
    </div>
  );
};

export default CityDetailsPage;