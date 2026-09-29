import "./Forecast.css";

function Forecast({ weather, getWeatherInfo }) {
  const { daily } = weather;

  return (
    <section className="forecast-section">
      <div className="section-heading">
        <div>
          <p className="small-title">WEATHER OUTLOOK</p>
          <h2>7-Day Forecast</h2>
        </div>

        <div className="forecast-label">Next 7 Days</div>
      </div>

      <div className="forecast-grid">
        {daily.time.map((date, index) => {
          const day = new Date(`${date}T12:00:00`);

          const dayName =
            index === 0
              ? "Today"
              : day.toLocaleDateString("en-US", {
                  weekday: "short",
                });

          const info = getWeatherInfo(daily.weather_code[index]);

          return (
            <div
              className={`forecast-card ${
                index === 0 ? "today-card" : ""
              }`}
              key={date}
            >
              <p className="forecast-day">{dayName}</p>

              <div className="forecast-icon">{info.icon}</div>

              <p className="forecast-condition">{info.text}</p>

              <div className="forecast-temp">
                <strong>
                  {Math.round(daily.temperature_2m_max[index])}°
                </strong>

                <span>
                  {Math.round(daily.temperature_2m_min[index])}°
                </span>
              </div>

              <div className="rain-probability">
                ☔ {daily.precipitation_probability_max[index]}%
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default Forecast;