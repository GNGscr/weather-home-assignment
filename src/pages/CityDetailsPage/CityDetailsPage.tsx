import { useParams, useSearchParams } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import { CircularProgress } from '@mui/material';
import citiesDataRaw from '../../data/data.json';
import DailyForecasts from '../../components/DailyForecasts';
import Units from '../../components/Units';
import type { ForecastResponse } from '../../types/Forecast';
import type { UnitOption } from '../../types/UnitOptions';
import type { City } from '../../types/City';
import { motion } from 'framer-motion';
import BackButton from '../../components/BackButton';
import NotFoundMessage from '../../components/NotFound';
import './CityDetailsPage.css';

const DEFAULT_UNITS = 'metric';
const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

const CityDetailsPage = () => {

  const { cityName } = useParams();

  const [searchParams] = useSearchParams();

  const urlUnits = (searchParams.get('units') as UnitOption) ?? DEFAULT_UNITS;

  const [weatherData, setWeatherData] = useState<ForecastResponse | null>(null);
  const [units, setUnits] = useState<'metric' | 'imperial'>(urlUnits);

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

  const handleUnitsChange = (key: string, value: string) => {
    if (key === 'units' && (value === 'metric' || value === 'imperial')) {
      setUnits(value);
    }
  };
  
  if (!city) {
    return (
      <div className="centered-content">
        <BackButton />
        <NotFoundMessage message='City not found' />
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
          <BackButton />

          <h1>{city.name}</h1>
          <h2>{city.country}</h2>
          <p>{city.description}</p>

          
          <div className='units-wrapper'>
            <Units
              units={units}
              handleChange={handleUnitsChange}
              isHeader={false}
            />
          </div>
          <DailyForecasts
            weatherData={weatherData}
            units={units}
          />
        </div>
      </motion.div>
    </div>
  );
};

export default CityDetailsPage;