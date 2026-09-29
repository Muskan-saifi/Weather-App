import "./WeatherAnimation.css";

function WeatherAnimation({ type }) {
  if (type === "rain" || type === "storm") {
    return (
      <div className="weather-animation rain-animation">
        <div className="animated-cloud cloud-one"></div>
        <div className="animated-cloud cloud-two"></div>

        <div className="rain-drops">
          {Array.from({ length: 45 }).map((_, index) => (
            <span key={index}></span>
          ))}
        </div>

        {type === "storm" && <div className="lightning">⚡</div>}
      </div>
    );
  }

  if (type === "snow") {
    return (
      <div className="weather-animation snow-animation">
        <div className="animated-cloud cloud-one"></div>
        <div className="animated-cloud cloud-two"></div>

        <div className="snowflakes">
          {Array.from({ length: 35 }).map((_, index) => (
            <span key={index}>❄</span>
          ))}
        </div>
      </div>
    );
  }

  if (type === "clouds") {
    return (
      <div className="weather-animation clouds-animation">
        <div className="animated-cloud cloud-one"></div>
        <div className="animated-cloud cloud-two"></div>
        <div className="animated-cloud cloud-three"></div>
      </div>
    );
  }

  if (type === "fog") {
    return (
      <div className="weather-animation fog-animation">
        <div className="fog-line fog-one"></div>
        <div className="fog-line fog-two"></div>
        <div className="fog-line fog-three"></div>
      </div>
    );
  }

  return (
    <div className="weather-animation clear-animation">
      <div className="sun"></div>

      <div className="sun-rays">
        {Array.from({ length: 12 }).map((_, index) => (
          <span key={index}></span>
        ))}
      </div>

      <div className="floating-cloud cloud-one"></div>
      <div className="floating-cloud cloud-two"></div>
    </div>
  );
}

export default WeatherAnimation;