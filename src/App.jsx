import { useState } from "react";
import SearchBar from "./components/SearchBar";
import CurrentWeather from "./components/CurrentWeather";
import WeatherDetails from "./components/WeatherDetails";
import Forecast from "./components/Forecast";
import WeatherAnimation from "./components/WeatherAnimation";
import "./App.css";

const weatherCodes = {
  0: {
    text: "Clear Sky",
    icon: "☀️",
    type: "clear",
  },

  1: {
    text: "Mainly Clear",
    icon: "🌤️",
    type: "clear",
  },

  2: {
    text: "Partly Cloudy",
    icon: "⛅",
    type: "clouds",
  },

  3: {
    text: "Overcast",
    icon: "☁️",
    type: "clouds",
  },

  45: {
    text: "Foggy",
    icon: "🌫️",
    type: "fog",
  },

  48: {
    text: "Rime Fog",
    icon: "🌫️",
    type: "fog",
  },

  51: {
    text: "Light Drizzle",
    icon: "🌦️",
    type: "rain",
  },

  53: {
    text: "Drizzle",
    icon: "🌦️",
    type: "rain",
  },

  55: {
    text: "Heavy Drizzle",
    icon: "🌧️",
    type: "rain",
  },

  61: {
    text: "Light Rain",
    icon: "🌦️",
    type: "rain",
  },

  63: {
    text: "Rain",
    icon: "🌧️",
    type: "rain",
  },

  65: {
    text: "Heavy Rain",
    icon: "🌧️",
    type: "rain",
  },

  71: {
    text: "Light Snow",
    icon: "🌨️",
    type: "snow",
  },

  73: {
    text: "Snow",
    icon: "❄️",
    type: "snow",
  },

  75: {
    text: "Heavy Snow",
    icon: "❄️",
    type: "snow",
  },

  80: {
    text: "Rain Showers",
    icon: "🌦️",
    type: "rain",
  },

  81: {
    text: "Rain Showers",
    icon: "🌧️",
    type: "rain",
  },

  82: {
    text: "Heavy Showers",
    icon: "⛈️",
    type: "storm",
  },

  95: {
    text: "Thunderstorm",
    icon: "⛈️",
    type: "storm",
  },

  96: {
    text: "Thunderstorm + Hail",
    icon: "⛈️",
    type: "storm",
  },

  99: {
    text: "Thunderstorm + Hail",
    icon: "⛈️",
    type: "storm",
  },
};

function App() {
  const [weather, setWeather] = useState(null);

  const [city, setCity] = useState("New Delhi");

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  // =========================================================
  // WEATHER CODE INFORMATION
  // =========================================================

  const getWeatherInfo = (code) => {
    return (
      weatherCodes[code] || {
        text: "Unknown",
        icon: "🌍",
        type: "clouds",
      }
    );
  };

  // =========================================================
  // FETCH WEATHER
  // =========================================================

  const fetchWeather = async (searchCity) => {
  const cleanCity = searchCity.trim();

  if (!cleanCity) {
    setError("Please enter a city name.");
    return;
  }

  setLoading(true);
  setError("");

  try {
    // Panaji ko specifically Goa ke saath search karna
    let searchQuery = cleanCity;

    if (cleanCity.toLowerCase() === "panaji") {
      searchQuery = "Panaji, Goa";
    }

    const geoResponse = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
        searchQuery
      )}&count=10&language=en&format=json`
    );

    if (!geoResponse.ok) {
      throw new Error("Unable to find location.");
    }

    const geoData = await geoResponse.json();

    if (!geoData.results || geoData.results.length === 0) {
      throw new Error(`City "${cleanCity}" was not found.`);
    }

    console.log("All Search Results:", geoData.results);

    let location;

    // Panaji ke liye Goa ko specifically select karo
    if (cleanCity.toLowerCase() === "panaji") {
      location = geoData.results.find(
        (place) =>
          place.admin1?.toLowerCase() === "goa" ||
          place.name?.toLowerCase() === "panaji"
      );
    }

    // Agar Panaji nahi hai, exact city name ko prefer karo
    if (!location) {
      location = geoData.results.find(
        (place) =>
          place.name?.toLowerCase() ===
          cleanCity.toLowerCase()
      );
    }

    // India location ko prefer karo
    if (!location) {
      location = geoData.results.find(
        (place) =>
          place.country_code?.toLowerCase() === "in"
      );
    }

    // Last fallback
    if (!location) {
      location = geoData.results[0];
    }

    if (!location) {
      throw new Error("Location could not be identified.");
    }

    console.log("SELECTED LOCATION:", location);

    const weatherResponse = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_probability_max&timezone=auto&forecast_days=7`
    );

    if (!weatherResponse.ok) {
      throw new Error(
        "Weather data could not be loaded."
      );
    }

    const weatherData = await weatherResponse.json();

    setWeather({
      location,
      current: weatherData.current,
      daily: weatherData.daily,
    });

    setCity(location.name);
  } catch (err) {
    console.error("Weather Error:", err);

    setError(
      err.message ||
        "Something went wrong. Please try again."
    );

    setWeather(null);
  } finally {
    setLoading(false);
  }
};

  // =========================================================
  // SEARCH HANDLER
  // =========================================================

  const handleSearch = (searchCity) => {
    fetchWeather(searchCity);
  };

  // =========================================================
  // WEATHER TYPE
  // =========================================================

  const weatherType = weather
    ? getWeatherInfo(
        weather.current.weather_code
      ).type
    : "clear";

  // =========================================================
  // UI
  // =========================================================

  return (
    <div className={`app ${weatherType}`}>
      
      {/* Animated Weather Background */}
      <WeatherAnimation type={weatherType} />

      <div className="container">

        {/* =================================================
            HEADER
        ================================================= */}

        <header className="header">

          <div className="brand">

            <div className="brand-icon">
              ☁️
            </div>

            <div>
              <h1>Weatherly</h1>

              <p>
                Live Weather Experience
              </p>
            </div>

          </div>

          <div className="header-badge">
            <span></span>
            Live Weather
          </div>

        </header>

        {/* =================================================
            MAIN
        ================================================= */}

        <main>

          {/* Search Bar */}
          <SearchBar
            onSearch={handleSearch}
            defaultCity={city}
          />

          {/* =================================================
              LOADING
          ================================================= */}

          {loading && (
            <div className="loading">

              <div className="loader"></div>

              <p>
                Fetching weather data...
              </p>

            </div>
          )}

          {/* =================================================
              ERROR
          ================================================= */}

          {error && !loading && (
            <div className="error-box">

              <span>⚠️</span>

              <p>{error}</p>

            </div>
          )}

          {/* =================================================
              WEATHER
          ================================================= */}

          {weather && !loading && (
            <>

              {/* Current Weather */}
              <CurrentWeather
                weather={weather}
                getWeatherInfo={getWeatherInfo}
              />

              {/* Weather Details */}
              <WeatherDetails
                weather={weather}
                getWeatherInfo={getWeatherInfo}
              />

              {/* 7 Day Forecast */}
              <Forecast
                weather={weather}
                getWeatherInfo={getWeatherInfo}
              />

            </>
          )}

          {/* =================================================
              WELCOME
          ================================================= */}

          {!weather &&
            !loading &&
            !error && (
              <div className="welcome">

                <div className="welcome-icon">
                  🌤️
                </div>

                <h2>
                  Discover the Weather
                </h2>

                <p>
                  Search for any city and explore
                  live weather conditions,
                  temperature, wind, humidity
                  and a 7-day forecast.
                </p>

              </div>
            )}

        </main>

        {/* =================================================
            FOOTER
        ================================================= */}

        <footer>

          <p>
            Built with{" "}
            <span>React</span>{" "}
            &{" "}
            <span>Open-Meteo</span>
          </p>

          <p>
            © 2026 Weatherly
          </p>

        </footer>

      </div>
    </div>
  );
}

export default App;