import type { HeaderProps } from "../../types/Header";
import { useMemo } from "react";
import Search from "../Search";
import Select from "../Select";
import Sort from "../Sort";
import Units from "../Units";
import './Header.css';

const Header = ({ search, continent, sortBy, units, cities, handleChange }: HeaderProps) => {
  const allContinents = useMemo(() => {
    const continents = cities.map((c) => c.continent);
    return Array.from(new Set(continents));
  }, [cities]);
  return (
    <div className="header">
      <div className="search-continent">
        <Search search={search} handleChange={handleChange} />
        <Select
          continent={continent}
          handleChange={handleChange}
          allContinents={allContinents} />
      </div>

      <div className="sort-units">
        <Sort sortBy={sortBy} handleChange={handleChange} isHeader={true} />
        <Units units={units} handleChange={handleChange} isHeader={true} />
      </div>
    </div>
  );
};

export default Header;
