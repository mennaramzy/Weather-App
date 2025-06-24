const API_KEY = "589806cbd13d4c71bd2215018252406";
const searchInput = document.getElementById("search");
const tableBody = document.querySelector(".weather-table tbody");

function getWeather(city) {
    fetch(`https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=3&aqi=no&alerts=no`)
        .then(response => response.json())
        .then(data => {
            if (data && data.forecast && data.forecast.forecastday) {
                renderWeather(data);
            } else {
                tableBody.innerHTML = "<tr><td colspan='3'>No data found</td></tr>";
            }
        })
        .catch(err => {
            console.error(err);
            tableBody.innerHTML = "<tr><td colspan='3'>Error loading data</td></tr>";
        });
}

function renderWeather(data) {
    const days = data.forecast.forecastday;
    const location = data.location.name;
    tableBody.innerHTML = "";

    const rows = [
        `<tr><td data-label="Place">${location}</td><td></td><td></td></tr>`,
        `<tr><td data-label="Temp"><span class="temp">${days[0].day.avgtemp_c.toFixed(1)}°C</span></td><td><span class="temp">${days[1].day.avgtemp_c.toFixed(1)}°C</span></td><td><span class="temp">${days[2].day.avgtemp_c.toFixed(1)}°C</span></td></tr>`,
        `<tr><td data-label="Condition"><img src="https:${days[0].day.condition.icon}" alt="${days[0].day.condition.text}" width="32" style="margin-right: 8px;">${days[0].day.condition.text}</td><td><img src="https:${days[1].day.condition.icon}" alt="${days[1].day.condition.text}" width="32" style="margin-right: 8px;">${days[1].day.condition.text}</td><td><img src="https:${days[2].day.condition.icon}" alt="${days[2].day.condition.text}" width="32" style="margin-right: 8px;">${days[2].day.condition.text}</td></tr>`,
        `<tr><td data-label="Precipitation">${days[0].day.daily_chance_of_rain || "—"}%</td><td>${days[1].day.daily_chance_of_rain || "—"}%</td><td>${days[2].day.daily_chance_of_rain || "—"}%</td></tr>`,
        `<tr><td data-label="Wind">${days[0].day.maxwind_kph}km/h ${days[0].hour[12].wind_dir}</td><td>${days[1].day.maxwind_kph}km/h ${days[1].hour[12].wind_dir}</td><td>${days[2].day.maxwind_kph}km/h ${days[2].hour[12].wind_dir}</td></tr>`
    ].join("");

    tableBody.innerHTML = rows;

 
    setTimeout(() => {
        const rows = tableBody.querySelectorAll("tr");
        rows.forEach(row => row.classList.add("loaded"));
    }, 50);
}

searchInput.addEventListener("input", () => {
    const city = searchInput.value.trim();
    if (city.length >= 4) {
        getWeather(city);
    }
});


getWeather("Cairo");