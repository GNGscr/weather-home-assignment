import type { City } from "../types/City";

export function setUniqueCities({ rawCities }: any) {  
    if (!rawCities) return;
    // console.log(rawCities)
    const uniqueCitiesMap = new Map<string, City>();
    rawCities.forEach((city: City) => {
      if (city.active && !uniqueCitiesMap.has(city.name)) {
        uniqueCitiesMap.set(city.name, city);
      }
    });
    return Array.from(uniqueCitiesMap.values());
}