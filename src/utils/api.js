import axios from "axios";

export const fetchWeatherData = async (city) => {
    try {
        const response = await axios.get(
            `https://api.open-meteo.com/v1/forecast?latitude=${city.lat}&longitude=${city.lon}&current_weather=true`
        );
        return response.data;
    } catch (error) {
        throw new Error("Unable to fetch weather data. Please try again.");
    }
};
