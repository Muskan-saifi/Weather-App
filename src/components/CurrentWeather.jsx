import "./CurrentWeather.css";

function CurrentWeather({ weather, getWeatherInfo }) {
  const { location, current } = weather;
  const info = getWeatherInfo(current.weather_code);

  const date = new Date(current.time);

  const formattedDate = date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <section className="current-card">
      <div className="current-left">
        <div className="location">
          <span>📍</span>

          <div>
            <h2>{location.name}</h2>

            <p>
              {location.admin1 ? `${location.admin1}, ` : ""}
              {location.country}
            </p>
          </div>
        </div>

        <p className="date">{formattedDate}</p>

        <div className="temperature">
          <span>{Math.round(current.temperature_2m)}</span>
          <sup>°C</sup>
        </div>

        <h3>{info.text}</h3>

        <p className="feels">
          Feels like {Math.round(current.apparent_temperature)}°C
        </p>
      </div>

      <div className="current-right">
        <div className="weather-icon-large">
          {info.icon}
        </div>

        <div className="day-status">
          {current.is_day ? "☀️ Daytime" : "🌙 Nighttime"}
        </div>
      </div>
    </section>
  );
}

export default CurrentWeather;