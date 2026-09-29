import { useState } from "react";
import "./SearchBar.css";

function SearchBar({ onSearch, defaultCity }) {
  const [search, setSearch] = useState(defaultCity || "");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (search.trim()) {
      onSearch(search);
    }
  };

  return (
    <form className="search-container" onSubmit={handleSubmit}>
      <div className="search-box">
        <span className="search-icon">⌕</span>

        <input
          type="text"
          placeholder="Search city..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {search && (
          <button
            type="button"
            className="clear-btn"
            onClick={() => setSearch("")}
          >
            ×
          </button>
        )}

        <button className="search-btn" type="submit">
          Search
        </button>
      </div>
    </form>
  );
}

export default SearchBar;