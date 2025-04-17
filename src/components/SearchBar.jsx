import React, { useState } from 'react';

const SearchBar = ({ setCity }) => {
    const [inputText, setInputText] = useState('');

    const handleSearch = () => {
        if (inputText.trim()) {
            setCity(inputText.trim());
            setInputText('');
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') handleSearch();
    };

    return (
        <header className="weather-header">
            <input
                type="text"
                placeholder="Введите город"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={handleKeyDown}
            />
            <button onClick={handleSearch}>Применить</button>
        </header>
    );
};

export default SearchBar;