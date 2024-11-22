import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { fetchWeatherData } from "../utils/api";

const Weather = () => {
    const [city, setCity] = useState("");
    const [weatherData, setWeatherData] = useState(null);
    const [error, setError] = useState("");
    const [coordinates] = useState({ lat: 51.505, lon: -0.09 });

    const handleSearch = async () => {
        setError("");
        setWeatherData(null);
        try {
            const data = await fetchWeatherData(coordinates);
            setWeatherData(data);
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="container">
            <h1 className="header">Weather Now</h1>
            <div className="input-group">
                <input
                    type="text"
                    placeholder="Enter city name"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                />
                <button onClick={handleSearch}>Search</button>
            </div>
            {error && <p className="error">{error}</p>}
            {weatherData && (
                <div className="weather-info">
                    <p>Temperature: {weatherData.current_weather.temperature}°C</p>
                    <p>Weather: {weatherData.current_weather.weathercode}</p>
                </div>
            )}
            <div className="map-container">
                <MapContainer
                    center={[coordinates.lat, coordinates.lon]}
                    zoom={13}
                    style={{ height: "100%", width: "100%" }}
                >
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    <Marker position={[coordinates.lat, coordinates.lon]}>
                        <Popup>
                            {weatherData
                                ? `Temperature: ${weatherData.current_weather.temperature}°C`
                                : "Search for weather!"}
                        </Popup>
                    </Marker>
                </MapContainer>
            </div>
        </div>
    );
};

export default Weather;
