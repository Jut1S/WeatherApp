import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

const WeatherApp = () => {
    const [weatherData, setWeatherData] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [city, setCity] = useState('');
    const [inputText, setInputText] = useState('');

    const apiKey = '7a333b0051bb95b8234e4bd2a2bff446';

    const handleInput = (event) => {
        setInputText(event.target.value);
    };

    const changeCity = () => {
        if (inputText.trim() !== '') {
            setCity(inputText.trim());
            setWeatherData(null);
            setErrorMessage('');
            setInputText('');
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            changeCity();
        }
    };

    useEffect(() => {
        const getWeatherData = async () => {
            if (!city) return;
            try {
                const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather`,
                    {
                        params: {
                            q : city,
                            appid: apiKey,
                            units: 'metric'
                        }
                    }
                    )
                setWeatherData(response.data);
                setErrorMessage('');

            } catch (error) {
                if (error.response && error.response.status === 400) {
                    setWeatherData(null);
                    setErrorMessage('Город не найден. Проверьте ввод.');
                } else {
                    setWeatherData(null);
                    setErrorMessage('Ошибка соединения. Попробуйте позже.');
                }
                console.error('Ошибка при получении данных о погоде:', error);
            }
        }

        getWeatherData();
    }, [city])

    return (
        <div className="weather-app">
            <header className="weather-header">
                <input
                    type="text"
                    placeholder="Введите город"
                    value={inputText}
                    onChange={handleInput}
                    onKeyDown={handleKeyDown}
                />
                <button onClick={changeCity}>Применить</button>
            </header>
            <main className="weather-main">
                {errorMessage ? (
                    <p className="error-message">{errorMessage}</p>
                ) : weatherData ? (
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
                ) : (
                    <p>Введите город, чтобы посмотреть погоду</p>
                )}
            </main>
            <footer className="weather-footer">
                <p>Данные предоставлены OpenWeatherMap</p>
            </footer>
        </div>
    );
};

export default WeatherApp;
