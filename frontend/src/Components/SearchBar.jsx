import React, { useState } from 'react';
const SearchBar = ({ search }) => {
    const [searchText, setsearchText] = useState('');
    const handleTextChange = (e) => {
        setsearchText(e.target.value);
    };
    const handleSearch = (e) => {
        e.preventDefault();
        if (searchText === null) {
        } else {
            search(searchText); // Pass the value to the search function
        }
    };
    return (
        <form onSubmit={handleSearch}>
            <label className="input input-accent input-bordered flex items-center gap-2">
                <input
                    type="text"
                    className="grow"
                    placeholder="Search recipes"
                    value={searchText}
                    onChange={handleTextChange}
                />
                <button onClick={handleSearch} className="btn btn-primary">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="h-4 w-4 opacity-70"
                    >
                        <path
                            fillRule="evenodd"
                            d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                            clipRule="evenodd"
                        />
                    </svg>
                </button>
            </label>
        </form>
    );
};

export { SearchBar };
