document.addEventListener("DOMContentLoaded", () => {
  const API_KEY = "42e94355d00f795e3fbb2feb94c2c458";
  const cityInput = document.querySelector("input");
  const submitBtn = document.querySelector("button");
  const temperatureDisplay = document.querySelector(".temp");
  const cityDisplay = document.querySelector(".city");
  const humidityDisplay = document.querySelector(".humidity");
  const windDisplay = document.querySelector(".wind");
  const feelslikeDisplay = document.querySelector(".feels-like");
  const weatherIconDisplay = document.querySelector(".weather-icon");

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

  cityInput.addEventListener("keydown", async(e) => {
    if(e.key === "Enter"){
      const city = cityInput.value.trim();
      cityInput.value = ''
    if (!city) return;

    try{
        const weatherData = await fetchWeatherData(city);
        displayWeatherData(weatherData)
    }catch (error){
        showError()
    }
    }
  })

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

    const { name, main, wind, weather } = data 
    cityDisplay.textContent = name
    temperatureDisplay.textContent = `${Math.round(main.temp)}°C`
    feelslikeDisplay.textContent = `Feels like ${Math.round(main.feels_like)}°C`
    humidityDisplay.textContent = `${main.humidity}%`
    windDisplay.textContent = `${wind.speed} km/h`

    if(weather[0].main == "Rain"){
        weatherIconDisplay.src ="./images/rain.png"
    }else if(weather[0].main == "Clouds"){
        weatherIconDisplay.src ="./images/clouds.png"
    }else if(weather[0].main == "Drizzle"){
        weatherIconDisplay.src = "./images/drizzle.png"
    }else if(weather[0].main == "Clear"){
        weatherIconDisplay.src ="./images/clear.png"
    }else if(weather[0].main == "Mist"){
        weatherIconDisplay.src ="./images/mist.png"
    }else if(weather[0].main == "Snow"){
        weatherIconDisplay.src ="./images/snow.png"
    }

  }

  function showError() {
   alert("City not found")
   cityInput.value = '';
  }
});
