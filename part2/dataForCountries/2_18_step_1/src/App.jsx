import { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(null);

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
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [searchTerm]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleCountryClick = (country) => {
    setSelectedCountry(country);
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
            <li
              key={country.name.common}
              onClick={() => handleCountryClick(country)}
            >
              {country.name.common}
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
        </div>
      )}
    </div>
  );
};

export default App;
