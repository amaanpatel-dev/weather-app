document.addEventListener("DOMContentLoaded", () => {
  const API_KEY = "42e94355d00f795e3fbb2feb94c2c458";
  const cityInput = document.querySelector("input");
  const submitBtn = document.querySelector("button");
  const temperatureDisplay = document.querySelector(".temp");
  const cityDisplay = document.querySelector(".city");
  const humidityDisplay = document.querySelector(".humidity");
  const windDisplay = document.querySelector(".wind");
  const feelslikeDisplay = document.querySelector(".feels-like");

  submitBtn.addEventListener("click", async (e) => {
      const city = cityInput.value.trim();
      cityInput.value = ''
    if (!city) return;

    try{
        const weatherData = await fetchWeatherData(city);
        displayWeatherData(weatherData)
    }catch (error){
        showError()
    }
  });

  async function fetchWeatherData(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("City not found");
    }
    const data = await response.json();
    return data;
  }

  function displayWeatherData(data) {
    console.log(data);

    const { name, main, wind } = data 
    cityDisplay.textContent = name
    temperatureDisplay.textContent = `${Math.round(main.temp)}°C`
    feelslikeDisplay.textContent = `Feels like ${Math.round(main.feels_like)}°C`
    humidityDisplay.textContent = `${main.humidity}%`
    windDisplay.textContent = `${wind.speed} km/h`

  }

  function showError() {
   alert("City not found")
   cityInput.value = '';
  }
});
