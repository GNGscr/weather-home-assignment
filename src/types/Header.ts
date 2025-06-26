export type HeaderProps = {
  search: string;
  continent: string;
  sortBy: string;
  units: string;
  allContinents: string[];
  handleChange: (key: string, value: string) => void;
};