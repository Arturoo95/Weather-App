const apiKey = "c03584dafcccba95dc01a01343128e49";
const cityInput = document.querySelector(".cityInput");
const weatherInfo = document.querySelector(".weather-info-display");
const weatherForm = document.querySelector(".weather-form");

weatherForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const city = cityInput.value.trim();

  if (city) {
    try {
      const weatherData = await getWeatherData(city);
      displayWeatherInfo(weatherData);
      weatherInfo.classList.remove("hidden");
    } catch (error) {
      console.error(error);
      displayError(error);
    }
  } else {
    displayError("Please enter a city");
  }
});

async function getWeatherData(city) {
  if (!city) {
    throw new Error("Please enter a city");
  }
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

  const response = await fetch(apiUrl);

  if (!response.ok) {
    throw new Error("Oops! No city under this name found");
  }

  return await response.json();
}

function displayWeatherInfo(data) {
  const {
    name: city,
    main: { temp, humidity },
    weather: [{ description, id }],
  } = data;

  setTimeout(() => {
    weatherInfo.classList.add("show");
  }, 200);

  weatherInfo.textContent = "";
  weatherInfo.style.display = "flex";

  const cityDisplay = document.createElement("h1");
  const tempDisplay = document.createElement("p");
  const humidityDisplay = document.createElement("p");
  const descDisplay = document.createElement("p");
  const weatherEmoji = document.createElement("p");

  cityDisplay.textContent = city;
  tempDisplay.textContent = `${(temp - 273.15).toFixed(1)}°C`;
  humidityDisplay.textContent = `Humidity: ${humidity}%`;
  descDisplay.textContent = description;
  weatherEmoji.textContent = toGetWeatherEmoji(id);

  cityDisplay.classList.add("city-name");
  tempDisplay.classList.add("temperature-display");
  humidityDisplay.classList.add("humidity");
  descDisplay.classList.add("desc-display");
  weatherEmoji.classList.add("weatherEmoji");

  weatherInfo.appendChild(cityDisplay);
  weatherInfo.appendChild(tempDisplay);
  weatherInfo.appendChild(humidityDisplay);
  weatherInfo.appendChild(descDisplay);
  weatherInfo.appendChild(weatherEmoji);
}

function toGetWeatherEmoji(weatherId) {
  switch (true) {
    case weatherId >= 200 && weatherId < 300:
      return "⛈️";
    case weatherId >= 300 && weatherId < 500:
      return "🌧️";
    case weatherId >= 500 && weatherId < 600:
      return "🌧️";
    case weatherId >= 600 && weatherId < 700:
      return "❄️";
    case weatherId >= 700 && weatherId < 800:
      return "🌁";
    case weatherId === 800:
      return "☀️";
    case weatherId >= 801 && weatherId < 810:
      return "☁️";
    default:
      return "❓";
  }
}

function displayError(message) {
  const errorDisplay = document.createElement("p");
  errorDisplay.textContent = message;
  errorDisplay.classList.add(".error-display");

  weatherInfo.textContent = "";
  weatherInfo.style.display = "flex";
  weatherInfo.appendChild(errorDisplay);
}
