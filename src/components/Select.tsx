import type { SelectTypes, Continent } from "../types/SelectTypes";

const Select = ({ continent, handleChange, allContinents }: SelectTypes) => {
  return (
    <div className='action-wrapper'>
        <div className="title">Continent</div>
        <select value={continent} onChange={(e) => handleChange('continent', e.target.value)}>
            <option value=""></option>
            {allContinents.map((cont: Continent) => (
                <option key={cont} value={cont}>
                {cont}
                </option>
            ))}
        </select>
  </div>
  )
}

export default Select;