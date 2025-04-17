import React from 'react';

const WeatherDetails = ({ weatherData }) => {
    return (
        <div className="weather-info">
            <div className="weather-icon">
                <img
                    src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                    alt="Weather Icon"
                />
            </div>
            <div className="weather-details">
                <h2>{weatherData.name}</h2>
                <p>Температура: {weatherData.main.temp}°C</p>
                <p>Описание: {weatherData.weather[0].description}</p>
                <p>Влажность: {weatherData.main.humidity}%</p>
                <p>Ветер: {weatherData.wind.speed} м/с</p>
            </div>
        </div>
    );
};

export default WeatherDetails;