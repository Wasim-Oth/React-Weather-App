import React from "react";

const Search = ({ change, fetch, cityname }) => {
  return (
    <div className="search">
      <input
        type="text"
        value={cityname}
        onChange={change}
        placeholder="Search City"
      />

      <button
        onClick={fetch}
        disabled={!cityname ? true : false}
        style={{ cursor: !cityname ? "not-allowed" : "pointer" }}
      >
        Search
      </button>
    </div>
  );
};

export default Search;
