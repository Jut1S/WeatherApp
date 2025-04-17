import React from 'react';
import WeatherDetails from './WeatherDetails';

const WeatherDisplay = ({ weatherData, errorMessage }) => {
    return (
        <main className="weather-main">
            {errorMessage ? (
                <p className="error-message">{errorMessage}</p>
            ) : weatherData ? (
                <WeatherDetails weatherData={weatherData} />
            ) : (
                <p>Введите город, чтобы посмотреть погоду</p>
            )}
        </main>
    );
};

export default WeatherDisplay;