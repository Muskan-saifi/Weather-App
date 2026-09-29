import "./WeatherDetails.css";

function WeatherDetails({ weather }) {
  const { current, daily } = weather;

  const sunrise = new Date(daily.sunrise[0]).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });

  const sunset = new Date(daily.sunset[0]).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });

  const details = [
    {
      icon: "💧",
      title: "Humidity",
      value: `${current.relative_humidity_2m}%`,
    },
    {
      icon: "💨",
      title: "Wind Speed",
      value: `${Math.round(current.wind_speed_10m)} km/h`,
    },
    {
      icon: "🌧️",
      title: "Precipitation",
      value: `${current.precipitation} mm`,
    },
    {
      icon: "🌅",
      title: "Sunrise",
      value: sunrise,
    },
    {
      icon: "🌇",
      title: "Sunset",
      value: sunset,
    },
    {
      icon: "☔",
      title: "Rain Chance",
      value: `${daily.precipitation_probability_max[0]}%`,
    },
  ];

  return (
    <section className="details-grid">
      {details.map((item, index) => (
        <div className="detail-card" key={index}>
          <div className="detail-icon">{item.icon}</div>

          <div>
            <p>{item.title}</p>
            <h3>{item.value}</h3>
          </div>
        </div>
      ))}
    </section>
  );
}

export default WeatherDetails;