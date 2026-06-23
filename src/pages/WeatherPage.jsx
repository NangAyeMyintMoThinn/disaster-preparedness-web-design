import React, { useEffect, useState } from "react";
import "./WeatherPage.css";
import MainHeader from "../components/MainHeader";
import MainFooter from "../components/MainFooter";

import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";

import L from "leaflet";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const defaultPosition = [22.8298, 97.7483];

function MapClickHandler({ onLocationSelect }) {
  useMapEvents({
    click(e) {
      onLocationSelect(e.latlng.lat, e.latlng.lng);
    },
  });

  return null;
}

const WeatherPage = () => {
  const [position, setPosition] = useState(defaultPosition);

  useEffect(() => {
    fetchWeatherByCoords(defaultPosition[0], defaultPosition[1]);
  }, []);

  async function fetchWeatherByCoords(lat, lon) {
    const apiKey = "49a946a143ae2de332f742f80150732e";

    const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

    const forecastApiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

    try {
      const weatherResponse = await fetch(weatherApiUrl);
      const weatherData = await weatherResponse.json();

      if (!weatherData || Number(weatherData.cod) !== 200) {
        throw new Error(weatherData.message);
      }

      updateWeatherUI(weatherData);
      fetchHourlyForecast(forecastApiUrl);
    } catch (error) {
      console.error(error);
    }
  }

  function updateWeatherUI(data) {
    setInnerText("cityName", data.name);

    setInnerHTML("temperature", `${Math.round(data.main.temp)}&deg;C`);

    setInnerHTML(
      "windSpeed",
      `Wind -- <strong>${data.wind.speed} m/s</strong>`,
    );

    const weatherIcon = document.getElementById("weatherIcon");

    if (weatherIcon) {
      weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    }

    setInnerText("latitude", `${data.coord.lat.toFixed(2)}°`);

    setInnerText("longitude", `${data.coord.lon.toFixed(2)}°`);

    setInnerText(
      "timezone",
      `UTC${data.timezone / 3600 >= 0 ? "+" : ""}${data.timezone / 3600}`,
    );

    const currentTime = new Date((data.dt + data.timezone) * 1000);

    setInnerText(
      "currentTime",
      currentTime.toLocaleTimeString("en-US", {
        timeZone: "UTC",
      }),
    );

    const precipitation = data.rain ? data.rain["1h"] * 0.0393701 : 0;

    setInnerHTML("precipitation", `${precipitation.toFixed(2)} inch`);

    setInnerHTML(
      "pressure",
      `${(data.main.pressure * 0.02953).toFixed(2)} inHg`,
    );

    setInnerText("visibility", `${(data.visibility / 1609).toFixed(1)} mi`);

    setInnerText("clouds", `${data.clouds.all} %`);

    const cloudBaseFeet = (data.main.temp - data.main.temp_min) * 222 + 1000;

    setInnerText("cloudBase", `${Math.round(cloudBaseFeet)} ft`);

    setInnerText("altitude", "N/A");
  }

  async function fetchHourlyForecast(apiUrl) {
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();

      const hourlyContainer = document.getElementById("hourlyForecast");

      if (!hourlyContainer) return;

      hourlyContainer.innerHTML = "";

      data.list.slice(0, 24).forEach((forecast) => {
        const time = new Date(forecast.dt * 1000).toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
        });

        const item = document.createElement("div");

        item.classList.add("group");

        item.innerHTML = `
          <div class="hour">${time}</div>
          <div class="situationImg">
            <img src="https://openweathermap.org/img/wn/${forecast.weather[0].icon}.png">
          </div>
          <div class="hourlyTemp">
            ${Math.round(forecast.main.temp)}°C
          </div>
        `;

        hourlyContainer.appendChild(item);
      });
    } catch (error) {
      console.error(error);
    }
  }

  function setInnerText(id, text) {
    const el = document.getElementById(id);
    if (el) el.innerText = text;
  }

  function setInnerHTML(id, html) {
    const el = document.getElementById(id);
    if (el) el.innerHTML = html;
  }

  const handleLocationSelect = (lat, lng) => {
    setPosition([lat, lng]);
    fetchWeatherByCoords(lat, lng);
  };

  return (
    <>
      <MainHeader />

      <div className="container1">
        <div className="map">
          <MapContainer
            center={position}
            zoom={10}
            style={{
              width: "100%",
              height: "90vh",
            }}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

            <Marker position={position} />

            <MapClickHandler onLocationSelect={handleLocationSelect} />
          </MapContainer>
        </div>

        <div className="forecasting">
          <div className="city">
            <h1 id="cityName" className="cName">
              Lashio
            </h1>

            <p className="location">
              Myanmar / Lat.:
              <span id="latitude"></span>/ Lon.:
              <span id="longitude"></span>/ Altitude:
              <span id="altitude">N/A</span>
              <br />
              Timezone:
              <span id="timezone"></span>/ Current time:
              <span id="currentTime"></span>
            </p>
          </div>

          <div className="prediction">
            <h5 className="currentTitle">CURRENT WEATHER</h5>

            <hr />

            <div className="weatherSection">
              <div className="weatherIcon">
                <img id="weatherIcon" src="" alt="Weather" />
              </div>

              <div className="temperature">
                <div id="temperature" className="temp"></div>

                <div id="windSpeed" className="wind"></div>
              </div>

              <div className="predictSection">
                <p>
                  Precipitation (12 hr.)
                  <br />
                  Air pressure
                  <br />
                  Visibility
                  <br />
                  Clouds
                  <br />
                  Cloud base
                </p>

                <p className="bold">
                  <span id="precipitation"></span>
                  <br />
                  <span id="pressure"></span>
                  <br />
                  <span id="visibility"></span>
                  <br />
                  <span id="clouds"></span>
                  <br />
                  <span id="cloudBase"></span>
                </p>
              </div>
            </div>

            <div className="weatherOverview">
              Click anywhere on the map to view weather.
            </div>
          </div>

          <div className="hourly">
            <h5 className="currentTitle">WEATHER FOR THE NEXT 24 HOURS</h5>

            <div className="timely" id="hourlyForecast"></div>
          </div>
        </div>
      </div>

      <MainFooter />
    </>
  );
};

export default WeatherPage;
