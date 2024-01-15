import { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [weather, setWeather] = useState(null);
  const [apiError, setApiError] = useState(null);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setCountries([]);
      return;
    }

    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://restcountries.com/v3.1/name/${searchTerm}`
        );
        setCountries(response.data);
        setSelectedCountry(null);
        setWeather(null);

        if (response.data.length === 1) {
          const capital =
            response.data[0].capital && response.data[0].capital[0];
          fetchWeatherData(capital);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [searchTerm]);

  const fetchWeatherData = async (capital) => {
    try {
      const apiKey = import.meta.env.VITE_SOME_KEY;
      const weatherResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${apiKey}&units=metric`
      );
      setWeather(weatherResponse.data);
      setApiError(null);
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setWeather(null);
      setApiError("Failed to fetch weather data. Please try again later.");
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const renderLanguages = (languages) => {
    if (Array.isArray(languages)) {
      return languages.join(", ");
    } else if (typeof languages === "object") {
      return Object.values(languages).join(", ");
    } else {
      return "Unknown";
    }
  };

  const handleShowButtonClick = (country) => {
    setSelectedCountry(country);
    const capital = country.capital && country.capital[0];
    fetchWeatherData(capital);
  };

  return (
    <div>
      <h1>Country Information App</h1>
      <label>
        Search for a country:
        <input type="text" value={searchTerm} onChange={handleSearch} />
      </label>

      {countries.length > 10 && (
        <p>Too many matches, please make your query more specific.</p>
      )}

      {countries.length <= 10 && countries.length > 1 && (
        <ul>
          {countries.map((country) => (
            <li key={country.name.common}>
              {country.name.common}{" "}
              <button onClick={() => handleShowButtonClick(country)}>
                Show
              </button>
            </li>
          ))}
        </ul>
      )}

      {selectedCountry && (
        <div>
          <h2>{selectedCountry.name.common}</h2>
          <p>
            Capital: {selectedCountry.capital && selectedCountry.capital[0]}
          </p>
          <p>Area: {selectedCountry.area && selectedCountry.area}</p>
          <p>
            Languages:{" "}
            {selectedCountry.languages &&
              renderLanguages(selectedCountry.languages)}
          </p>
          {selectedCountry.flags && (
            <img src={selectedCountry.flags.png} alt="Country Flag" />
          )}

          {weather && (
            <div>
              <h3>Weather in {selectedCountry.capital[0]}</h3>
              <p>Temperature: {weather.main.temp} °C</p>
              <p>Weather: {weather.weather[0].description}</p>
              <p>Humidity: {weather.main.humidity}%</p>
              <p>Wind Speed: {weather.wind.speed} m/s</p>
            </div>
          )}

          {apiError && <p>{apiError}</p>}
        </div>
      )}
    </div>
  );
};

export default App;
