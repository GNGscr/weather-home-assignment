export type Continent = string;

export type SelectTypes = {
    continent: Continent;
    handleChange: (name: string, value: string) => void;
    allContinents: string[];
}