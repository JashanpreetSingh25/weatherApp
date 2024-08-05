import express from "express";
import axios from "axios";

const app = express();
const port = 3000;

app.use(express.static("public"))

const apiKey = "ENTER YOUR API KEY";

app.get("/", async (req, res) => {
    const city = req.query.city || "London"; // Default to London if no city is provided
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const result = await axios.get(URL);
        const weatherData = result.data;
        const weatherCondition = weatherData.weather && weatherData.weather[0] ? weatherData.weather[0].main.toLowerCase() : "default";

        console.log(weatherData);

        let weatherIcon = "";
        switch (weatherCondition) {
            case "clouds":
                weatherIcon = "clouds.png";
                break;
            case "clear":
                weatherIcon = "clear.png";
                break;
            case "rain":
                weatherIcon = "rain.png";
                break;
            case "drizzle":
                weatherIcon = "drizzle.png";
                break;
            case "mist":
                weatherIcon = "mist.png"
                break;
            default:
                break;
        }

        res.render("index.ejs", {
            city: weatherData.name,
            temperature: Math.floor(weatherData.main.temp),
            humidity: weatherData.main.humidity,
            wind: weatherData.wind.speed,
            weatherIcon: `/images/${weatherIcon}`,
            weather: weatherData.weather[0].main
        });
    } catch (error) {
        console.error(error);
        res.render("index", {
            city: "Error",
            temperature: "N/A",
            humidity: "N/A",
            wind: "N/A",
            weatherIcon: "N/A",
            weather: "Error"
        });
    }
})


app.listen(port, () => {
    console.log(`Listening on port ${port}.`)
});
