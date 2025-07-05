import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import type { SortOption } from '../../types/SortOption';
import type { UnitOption } from '../../types/UnitOptions';
import type { City } from '../../types/City';
import Header from '../../components/Header/Header';
import FilteredCities from '../../components/FilteredCities/FilteredCities';
import citiesDataRaw from '../../data/data.json';
import { setUniqueCities } from '../../utils/setUniqueCities';

const MainPage = () => {
  const [cities, setCities] = useState<City[]>([]);

  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get('search') ?? '';
  const continent = searchParams.get('continent') ?? '';
  const sortBy = (searchParams.get('sort') as SortOption) ?? 'name';
  const units = (searchParams.get('units') as UnitOption) ?? 'metric';

  useEffect(() => {
    const rawCities = (citiesDataRaw as { cities: City[] }).cities;
    console.log(rawCities);
    
    setUniqueCities(rawCities);
  
    const uniqueCitiesMap = new Map<string, City>();
    rawCities.forEach((city) => {
      if (city.active && !uniqueCitiesMap.has(city.name)) {
        uniqueCitiesMap.set(city.name, city);
      }
    });
  
    const uniqueCities = Array.from(uniqueCitiesMap.values());
    setCities(uniqueCities);
  }, []);

  const handleChange = (key: string, value: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (value) newParams.set(key, value);
    else newParams.delete(key);

    setSearchParams(newParams);
  };

  return (
    <>
      <Header
        search={search}
        continent={continent}
        sortBy={sortBy}
        units={units}
        cities={cities}
        handleChange={handleChange}
      />
      <FilteredCities
        searchParams={searchParams}
        cities={cities}
        search={search}
        continent={continent}
        sortBy={sortBy}
      />
    </>
  );
};

export default MainPage;
