import React, { useEffect } from 'react';
import './WeatherPage.css';
import MainHeader from '../components/MainHeader';
import MainFooter from '../components/MainFooter';

const WeatherPage = () => {

  useEffect(() => {
    let map;
    let marker;

    async function fetchWeatherByCoords(lat, lon) {
      const apiKey = "49a946a143ae2de332f742f80150732e";
      const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
      const forecastApiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

      try {
        console.log("Fetching weather data for new location...");

        const weatherResponse = await fetch(weatherApiUrl);
        const weatherData = await weatherResponse.json();

        if (!weatherData || weatherData.cod !== 200) {
          throw new Error(`Weather API error: ${weatherData.message}`);
        }

        updateWeatherUI(weatherData);
        fetchHourlyForecast(forecastApiUrl);
      } catch (error) {
        console.error("Error fetching weather:", error);
      }
    }

    function updateWeatherUI(data) {
      marker.setPosition({ lat: data.coord.lat, lng: data.coord.lon });
      setInnerText("cityName", data.name);
      setInnerHTML("temperature", `${Math.round(data.main.temp)}&deg;C`);
      setInnerHTML("windSpeed", `Wind -- <strong>${data.wind.speed} m/s</strong>`);

      const weatherIcon = document.getElementById("weatherIcon");
      if (weatherIcon) {
        const iconCode = data.weather[0].icon;
        weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png?${new Date().getTime()}`;
      }

      setInnerText("latitude", `${data.coord.lat.toFixed(2)}°`);
      setInnerText("longitude", `${data.coord.lon.toFixed(2)}°`);
      setInnerText("timezone", `UTC${data.timezone / 3600 >= 0 ? "+" : ""}${data.timezone / 3600}`);

      const currentTime = new Date((data.dt + data.timezone) * 1000);
      setInnerText("currentTime", currentTime.toLocaleTimeString("en-US", { timeZone: "UTC" }));

      const precipitation = data.rain ? data.rain["1h"] * 0.0393701 : 0;
      setInnerHTML("precipitation", `${precipitation.toFixed(2)} inch`);

      setInnerHTML("pressure", `${(data.main.pressure * 0.02953).toFixed(2)} inHg`);
      setInnerText("visibility", `${(data.visibility / 1609).toFixed(1)} mi`);
      setInnerText("clouds", `${data.clouds.all} %`);

      const cloudBaseFeet = (data.main.temp - data.main.temp_min) * 222 + 1000;
      setInnerText("cloudBase", `${Math.round(cloudBaseFeet)} ft`);

      fetch(`https://api.opentopodata.org/v1/srtm90m?locations=${data.coord.lat},${data.coord.lon}`)
        .then(res => res.json())
        .then(elevationData => {
          const altitude = elevationData.results?.[0]?.elevation || "N/A";
          setInnerText("altitude", `${Math.round(altitude)} ft`);
        })
        .catch(error => console.error("Error fetching elevation:", error));
    }

    async function fetchHourlyForecast(apiUrl) {
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (!data.list) {
          throw new Error("Invalid forecast data");
        }

        const hourlyContainer = document.getElementById("hourlyForecast");
        if (!hourlyContainer) return;
        hourlyContainer.innerHTML = "";

        for (let i = 0; i < 24; i++) {
          const forecast = data.list[i];
          const time = new Date(forecast.dt * 1000).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
          const temp = `${Math.round(forecast.main.temp)}°C`;
          const iconUrl = `https://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`;

          const forecastItem = document.createElement("div");
          forecastItem.classList.add("group");
          forecastItem.innerHTML = `
            <div class="hour">${time}</div>
            <div class="situationImg"><img src="${iconUrl}" alt="${forecast.weather[0].description}"></div>
            <div class="hourlyTemp">${temp}</div>`;

          hourlyContainer.appendChild(forecastItem);
        }
      } catch (error) {
        console.error("Error fetching hourly forecast:", error);
      }
    }

    function setInnerText(id, text) {
      const element = document.getElementById(id);
      if (element) element.innerText = text;
    }

    function setInnerHTML(id, html) {
      const element = document.getElementById(id);
      if (element) element.innerHTML = html;
    }

    function initMap() {
      map = new window.google.maps.Map(document.getElementById('map'), {
        center: { lat: 22.8298, lng: 97.7483 },
        zoom: 10,
      });

      marker = new window.google.maps.Marker({
        position: { lat: 22.8298, lng: 97.7483 },
        map: map,
        draggable: true,
      });

      fetchWeatherByCoords(22.8298, 97.7483);

      map.addListener('click', (event) => {
        const newLat = event.latLng.lat();
        const newLng = event.latLng.lng();
        marker.setPosition({ lat: newLat, lng: newLng });
        fetchWeatherByCoords(newLat, newLng);
      });
    }

    if (window.google && window.google.maps) {
      initMap();
    } else {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCBHk7wCcchDDhF_W7XOMNbXr7IFSUN_HQ&callback=initMap`;
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
      script.onload = initMap;
    }
  }, []);

  return (
    <>
      <MainHeader />
      <div className="container1">
        <div className="map" id="map"></div>
        <div className="forecasting">
          <div className="city">
            <h1 id="cityName" className="cName">City Name</h1>
            <p className="location" id="locationInfo">
              Myanmar / Lat.: <span id="latitude">22&deg;0'N</span> / Lon.: <span id="longitude">96&deg;4'E</span> / Altitude: <span id="altitude">253 ft</span><br />
              Timezone: <span id="timezone">Asia/Rangoon</span> (UTC+6) / Current time: <span id="currentTime">08:56 PM 01/16/2025</span>
            </p>
          </div>
          <div className="prediction">
            <h5 className="currentTitle">CURRENT WEATHER</h5>
            <hr />
            <div className="weatherSection">
              <div className="weatherIcon">
                <img id="weatherIcon" src="" alt="Weather icon" />
              </div>
              <div className="temperature">
                <div id="temperature" className="temp">12&deg;F</div>
                <div id="windSpeed" className="wind"> Wind -- <strong>0 mph</strong></div>
              </div>
              <div className="predictSection">
                <p>
                  Precipitation (12 hr.)<br />
                  Air pressure<br />
                  Visibility<br />
                  Clouds<br />
                  Cloud base
                </p>
                <p className="bold">
                  <span id="precipitation"></span><br />
                  <span id="pressure"></span><br />
                  <span id="visibility"></span><br />
                  <span id="clouds"></span><br />
                  <span id="cloudBase"></span>
                </p>
              </div>
            </div>
            <div className="weatherOverview">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat, sunt?
            </div>
          </div>
          <div class="hourly">
              <h5 class="currentTitle">
                  WEATHER FOR THE NEXT 24 HOURS
              </h5> 
              <div class="timely" id="hourlyForecast">
                  {/* <div class="group">
                      <div class="hour">
                          09 PM
                      </div>
                      <div class="situationImg">
                          <img src="./images/cloud-37010_1280.webp">
                      </div>
                  </div>  */}
              </div>
          </div>
        </div>
      </div>

      <MainFooter />
    </>
  );
};

export default WeatherPage;
