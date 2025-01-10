import React, { useEffect, useRef, useState } from 'react';
import './Weather.css';
import 'react-loading-skeleton/dist/skeleton.css';
import search_icon from '../assets/search.png';
import location_icon from '../assets/location.png'; // GPS ikonka
import clear_icon from '../assets/clear.png';
import humidity_icon from '../assets/humidity.png';
import wind_icon from '../assets/wind.png';
import { Toaster, toast } from 'react-hot-toast';
import { Skeleton } from '@mui/material'; // Import Skeleton from MUI


const Weather = () => {
    const inputRef = useRef();
    const [weatherData, setWeatherData] = useState(null);

    const [loading, setLoading] = useState(false); // Track loading state

    const allIcons = {
        "01d": clear_icon,
        "01n": "http://openweathermap.org/img/wn/01n@2x.png",
        "02d": "http://openweathermap.org/img/wn/02d@2x.png",
        "02n": "http://openweathermap.org/img/wn/02n@2x.png",
        "03d": "http://openweathermap.org/img/wn/03d@2x.png",
        "03n": "http://openweathermap.org/img/wn/03n@2x.png",
        "04d": "http://openweathermap.org/img/wn/04d@2x.png",
        "04n": "http://openweathermap.org/img/wn/04n@2x.png",
        "09d": "http://openweathermap.org/img/wn/09d@2x.png",
        "09n": "http://openweathermap.org/img/wn/09n@2x.png",
        "10d": "http://openweathermap.org/img/wn/10d@2x.png",
        "10n": "http://openweathermap.org/img/wn/10n@2x.png",
        "13d": "http://openweathermap.org/img/wn/13d@2x.png",
        "13n": "http://openweathermap.org/img/wn/13n@2x.png",
    };

    const search = async (city) => {
        if (city === "") {
            toast.error("Enter City Name");
            return;
        }
        fetchWeatherByCity(city);
    };

    const fetchWeatherByCity = async (city) => {
        setLoading(true); // Set loading to true while fetching
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;

            const response = await fetch(url);
            const data = await response.json();

            if (!response.ok) {
                toast.error(data.message);
                return;
            }

            const icon = allIcons[data.weather[0].icon] || clear_icon;
            setWeatherData({
                humidity: data.main.humidity,
                windSpeed: data.wind.speed,
                temperature: Math.floor(data.main.temp),
                location: data.name,
                icon: icon
            });
        } catch (error) {
            setWeatherData(null);
            console.log("Error in fetching weather data");
        } finally {
            setLoading(false); // Set loading to false once data is fetched
        }
    };

    const fetchWeatherByLocation = async (lat, lon) => {
        setLoading(true);
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;

            const response = await fetch(url);
            const data = await response.json();

            if (!response.ok) {
                toast.error(data.message);
                return;
            }

            const icon = allIcons[data.weather[0].icon] || clear_icon;
            setWeatherData({
                humidity: data.main.humidity,
                windSpeed: data.wind.speed,
                temperature: Math.floor(data.main.temp),
                location: data.name,
                icon: icon
            });
        } catch (error) {
            setWeatherData(null);
            console.log("Error in fetching weather data");
        } finally {
            setLoading(false);
        }
    };

    const getUserLocation = () => {
        if (!navigator.geolocation) {
            toast.error("Geolocation is not supported by your browser.");
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                fetchWeatherByLocation(latitude, longitude);
            },
            (error) => {
                toast.error("Unable to retrieve your location.");
                console.error(error);
            }
        );
    };

    return (
        <div className='weather'>
            <h1 className='version'>v1.0</h1>
            <Toaster position="top-right" reverseOrder={false} />
            <div className="search-bar">
                <input ref={inputRef} type="search" placeholder='Search...'  onKeyDown={(e) => {
            if (e.key === 'Enter') {
                search(inputRef.current.value);
            }
        }} />
                <img onClick={() => search(inputRef.current.value)} src={search_icon} alt="search_icon" />
                <img onClick={getUserLocation} src={location_icon} alt="location_icon" className="location-icon" />
            </div>
            {loading ? (
                <div className="weather-skeleton">
                    {/* Skeleton Loader */}
                    <Skeleton variant="circle" width={80} height={80} sx={{ margin: '30px auto' }} />
                    <Skeleton variant="text" width={100} height={40} sx={{ marginBottom: 1 }} />
                    <Skeleton variant="text" width={150} height={30} sx={{ marginBottom: 1 }} />
                    <div className="weather-data-skeleton" style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Skeleton variant="text" width={100} height={20} />
                        <Skeleton variant="text" width={100} height={20} />
                    </div>
                </div>
            ) : weatherData === null ? (
                <p className="placeholder-text">Enter a city name or use your location to see the weather</p>
            ) : (
                <>
                    <img src={weatherData.icon} alt="weather_icon" className='weather-icon' />
                    <p className='temperature'>{weatherData.temperature}°c</p>
                    <p className='location'>{weatherData.location}</p>
                    <div className="weather-data">
                        <div className="col">
                            <img src={humidity_icon} alt="humidity_icon" />
                            <div>
                                <p>{weatherData.humidity} %</p>
                                <span>Humidity</span>
                            </div>
                        </div>
                        <div className="col">
                            <img src={wind_icon} alt="wind_icon" />
                            <div>
                                <p>{weatherData.windSpeed} km/h</p>
                                <span>Wind Speed</span>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default Weather;
