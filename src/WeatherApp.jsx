import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchBar from './components/SearchBar';
import WeatherDisplay from './components/WeatherDisplay';
import Footer from './components/Footer';
import './App.css';

const WeatherApp = () => {
    const [weatherData, setWeatherData] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [city, setCity] = useState('');

    const apiKey = '7a333b0051bb95b8234e4bd2a2bff446';

    useEffect(() => {
        const getWeatherData = async () => {
            if (!city) return;
            try {
                const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
                    params: { q: city, appid: apiKey, units: 'metric' }
                });
                setWeatherData(response.data);
                setErrorMessage('');
            } catch (error) {
                if (error.response?.status === 404) {
                    setErrorMessage('Город не найден. Проверьте ввод.');
                } else {
                    setErrorMessage('Ошибка соединения. Попробуйте позже.');
                }
                setWeatherData(null);
            }
        };
        getWeatherData();
    }, [city]);

    return (
        <div className="weather-app">
            <SearchBar setCity={setCity} />
            <WeatherDisplay weatherData={weatherData} errorMessage={errorMessage} />
            <Footer />
        </div>
    );
};

export default WeatherApp;