import type { SearchProps } from "../types/Search";

const Search = ({ search, handleChange }: SearchProps) => {
  return (
    <div className='action-wrapper'>
        <div className="title">Search</div>
        <input
          name="search"
          type="search"
          placeholder="Type to search"
          value={search}
          onChange={(e) => handleChange('search', e.target.value)}
        />
        {search && (
          <button
            name="button"
            className="clear-btn"
            aria-label="Clear search"
          >
          </button>
        )}
  </div>
  )
}

export default Search;