// 49a946a143ae2de332f742f80150732e
// const apiKey = "49a946a143ae2de332f742f80150732e";
// const city = "Lashio";

// const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
// const forecastApiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

// async function fetchWeather() {
//     try {
//         const response = await fetch(weatherApiUrl);
//         const data = await response.json();

//         if (!data || data.cod !== 200) {
//             throw new Error(`Weather API error: ${data.message}`);
//         }

//         updateWeatherUI(data);
//         fetchHourlyForecast();
//     } catch (error) {
//         console.error("Error fetching weather data:", error);
//     }
// }

// function updateWeatherUI(data) {
//     setInnerText("cityName", data.name);
//     setInnerHTML("temperature", `${Math.round(data.main.temp)}&deg;C`);
//     setInnerHTML("windSpeed", `Wind -- <strong>${data.wind.speed} m/s</strong>`);

//     // Weather Icon
//     const weatherIcon = document.getElementById("weatherIcon");
//     if (weatherIcon) {
//         const iconCode = data.weather[0].icon;  // This should be dynamic
//         // document.getElementById("weatherIcon").src = `https://openweathermap.org/img/wn/01d@2x.png`;
//         document.getElementById("weatherIcon").src = `https://openweathermap.org/img/wn/${iconCode}@2x.png?${new Date().getTime()}`;
//     }

//     setInnerText("latitude", `${data.coord.lat.toFixed(2)}°`);
//     setInnerText("longitude", `${data.coord.lon.toFixed(2)}°`);
//     setInnerText("timezone", `UTC${data.timezone / 3600 >= 0 ? "+" : ""}${data.timezone / 3600}`);

//     const currentTime = new Date((data.dt + data.timezone) * 1000);
//     setInnerText("currentTime", currentTime.toLocaleTimeString("en-US", { timeZone: "UTC" }));

//     // Precipitation
//     const precipitation = data.rain ? data.rain["1h"] * 0.0393701 : 0;
//     setInnerHTML("precipitation", `${precipitation.toFixed(2)} inch`);

//     // Air Pressure
//     setInnerHTML("pressure", `${(data.main.pressure * 0.02953).toFixed(2)} inHg`);

//     // Visibility
//     setInnerText("visibility", `${(data.visibility / 1609).toFixed(1)} mi`);

//     // Clouds
//     setInnerText("clouds", `${data.clouds.all} %`);

//     // Cloud Base Approximation
//     const cloudBaseFeet = (data.main.temp - data.main.temp_min) * 222 + 1000;
//     setInnerText("cloudBase", `${Math.round(cloudBaseFeet)} ft`);

//     // Fetch Elevation Data
//     fetch(`https://api.opentopodata.org/v1/srtm90m?locations=${data.coord.lat},${data.coord.lon}`)
//         .then(res => res.json())
//         .then(elevationData => {
//             const altitude = elevationData.results?.[0]?.elevation || "N/A";
//             setInnerText("altitude", `${Math.round(altitude)} ft`);
//         })
//         .catch(error => console.error("Error fetching elevation:", error));
// }

// async function fetchHourlyForecast() {
//     try {
//         const response = await fetch(forecastApiUrl);
//         const data = await response.json();

//         if (!data.list) {
//             throw new Error("Invalid forecast data");
//         }

//         const hourlyContainer = document.getElementById("hourlyForecast");
//         if (!hourlyContainer) return;

//         hourlyContainer.innerHTML = "";

//         for (let i = 0; i < Math.min(8, data.list.length); i++) {
//             const forecast = data.list[i];
//             const time = new Date(forecast.dt * 1000).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
//             const temp = `${Math.round(forecast.main.temp)}°C`;
//             const iconUrl = `https://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`;

//             const forecastItem = document.createElement("div");
//             forecastItem.classList.add("group");
//             forecastItem.innerHTML = `
//                 <div class="hour">${time}</div>
//                 <div class="situationImg">
//                     <img src="${iconUrl}" alt="${forecast.weather[0].description}">
//                 </div>
//                 <div class="hourlyTemp">${temp}</div>
//             `;

//             hourlyContainer.appendChild(forecastItem);
//         }
//     } catch (error) {
//         console.error("Error fetching hourly forecast:", error);
//     }
// }

// // Utility function to prevent null errors
// function setInnerText(id, text) {
//     const element = document.getElementById(id);
//     if (element) element.innerText = text;
// }

// function setInnerHTML(id, html) {
//     const element = document.getElementById(id);
//     if (element) element.innerHTML = html;
// }

// fetchWeather();
const apiKey = "49a946a143ae2de332f742f80150732e";

// Function to fetch weather data dynamically
async function fetchWeather(lat, lon) {
    try {
        const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
        const forecastApiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
        
        const response = await fetch(weatherApiUrl);
        const data = await response.json();

        if (!data || data.cod !== 200) {
            throw new Error(`Weather API error: ${data.message}`);
        }
        
        updateWeatherUI(data);
        fetchHourlyForecast(forecastApiUrl);
    } catch (error) {
        console.error("Error fetching weather data:", error);
    }
}

// Function to update the weather UI
function updateWeatherUI(data) {
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
    
    fetchElevation(data.coord.lat, data.coord.lon);
}

// Fetch elevation data
async function fetchElevation(lat, lon) {
    try {
        const response = await fetch(`https://api.opentopodata.org/v1/srtm90m?locations=${lat},${lon}`);
        const elevationData = await response.json();
        const altitude = elevationData.results?.[0]?.elevation || "N/A";
        setInnerText("altitude", `${Math.round(altitude)} ft`);
    } catch (error) {
        console.error("Error fetching elevation:", error);
    }
}

// Fetch hourly forecast
async function fetchHourlyForecast(apiUrl) {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        if (!data.list) throw new Error("Invalid forecast data");
        
        const hourlyContainer = document.getElementById("hourlyForecast");
        hourlyContainer.innerHTML = "";

        for (let i = 0; i < Math.min(8, data.list.length); i++) {
            const forecast = data.list[i];
            const time = new Date(forecast.dt * 1000).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
            const temp = `${Math.round(forecast.main.temp)}°C`;
            const iconUrl = `https://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`;
            
            const forecastItem = document.createElement("div");
            forecastItem.classList.add("group");
            forecastItem.innerHTML = `
                <div class="hour">${time}</div>
                <div class="situationImg"><img src="${iconUrl}" alt="${forecast.weather[0].description}"></div>
                <div class="hourlyTemp">${temp}</div>
            `;
            hourlyContainer.appendChild(forecastItem);
        }
    } catch (error) {
        console.error("Error fetching hourly forecast:", error);
    }
}

// Utility functions to set text and HTML
function setInnerText(id, text) {
    const element = document.getElementById(id);
    if (element) element.innerText = text;
}

function setInnerHTML(id, html) {
    const element = document.getElementById(id);
    if (element) element.innerHTML = html;
}

// Initialize Google Map with click event
function initMap() {
    const defaultLocation = { lat: 16.8053, lng: 96.1561 }; // Example: Default location
    const map = new google.maps.Map(document.getElementById("map"), {
        center: defaultLocation,
        zoom: 8,
    });
    
    let marker = new google.maps.Marker({
        position: defaultLocation,
        map: map,
    });
    
    map.addListener("click", (event) => {
        const lat = event.latLng.lat();
        const lon = event.latLng.lng();
        
        marker.setPosition({ lat, lng: lon });
        fetchWeather(lat, lon);
    });
}

// Load default weather
fetchWeather(16.8053, 96.1561); // Default location (can be changed)
