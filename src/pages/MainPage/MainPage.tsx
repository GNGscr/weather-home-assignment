import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getDistanceFromLatLonInKm } from '../../utils/distance';
import type { SortOption } from '../../types/SortOption';
import type { UnitOption } from '../../types/UnitOptions';
import type { City } from '../../types/City';
import Header from '../../components/Header/Header';
import FilteredCities from '../../components/FilteredCities/FilteredCities';
import citiesDataRaw from '../../data/data.json';

const TEL_AVIV_COORDS = { lat: 32.0853, lng: 34.7818 };

const MainPage = () => {
  const [cities, setCities] = useState<City[]>([]);

  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get('search') ?? '';
  const continent = searchParams.get('continent') ?? '';
  const sortBy = (searchParams.get('sort') as SortOption) ?? 'name';
  const units = (searchParams.get('units') as UnitOption) ?? 'metric';

  useEffect(() => {
    const rawCities = (citiesDataRaw as { cities: City[] }).cities;
  
    const uniqueCitiesMap = new Map<string, City>();
    rawCities.forEach((city) => {
      if (city.active && !uniqueCitiesMap.has(city.name)) {
        uniqueCitiesMap.set(city.name, city);
      }
    });
  
    const uniqueCities = Array.from(uniqueCitiesMap.values());
    setCities(uniqueCities);
  }, []);
  

  const filteredCities = useMemo(() => {
    let result = [...cities];

    if (search) {
      result = result.filter((c) =>
          c.name.toLowerCase().includes(search.toLowerCase()) ||
          c.country.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (continent) {
      result = result.filter((c) => c.continent === continent);
    }

    switch (sortBy) {
      case 'name':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'distance':
        result.sort((a, b) =>
          getDistanceFromLatLonInKm(a.coords.lat, a.coords.lng, TEL_AVIV_COORDS.lat, TEL_AVIV_COORDS.lng) -
          getDistanceFromLatLonInKm(b.coords.lat, b.coords.lng, TEL_AVIV_COORDS.lat, TEL_AVIV_COORDS.lng)
        );
        break;

      default:
        break;
    }

    return result;
  }, [cities, search, continent, sortBy]);

  const handleChange = (key: string, value: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (value) newParams.set(key, value);
    else newParams.delete(key);

    setSearchParams(newParams);
  };

  const allContinents = useMemo(() => {
    const continents = cities.map((c) => c.continent);
    return Array.from(new Set(continents));
  }, [cities]);

  return (
    <>
      <Header
        search={search}
        continent={continent}
        sortBy={sortBy}
        units={units}
        allContinents={allContinents}
        handleChange={handleChange}
      />
      <FilteredCities
        filteredCities={filteredCities}
        searchParams={searchParams}
      />
    </>
  );
};

export default MainPage;
