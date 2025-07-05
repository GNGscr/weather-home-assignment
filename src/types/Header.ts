import type { City } from "./City";

export type HeaderProps = {
  search: string;
  continent: string;
  sortBy: string;
  units: string;
  cities: City[];
  handleChange: (key: string, value: string) => void;
};