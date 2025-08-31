import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const API_URL = "https://api.openweathermap.org/data/2.5/weather";
const API_KEY = "70959f46b5886217987ea311e5ccfcad";

//middle wares
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
  (res.locals.city = "Default"),
  (res.locals.isReturned = "Default"),
  (res.locals.iconName = "atmosphere"),
  (res.locals.HumidityValue = "Default"),
  (res.locals.windSpeedValue = "Default"),
  (res.locals.temperature = "Default"),
  (res.locals.condition = "Default"),
  next();
});

//app.methods
app.get("/", (req, res) => {
  res.render("index.ejs",{
    isReturned: "Default"
  });
});

app.post("/getWeather", async (req, res) => {
  try {
    const location = req.body.city;
    const response = await axios.get(
      `${API_URL}?q=${location}&appid=${API_KEY}`
    );

    let iconName = response.data.weather[0].main.toLowerCase();

    res.render("index.ejs", {
      isReturned: "success",
      city: response.data.name,
      iconName: iconName, //need to work on this to change the icon
      HumidityValue: response.data.main.humidity,
      windSpeedValue: response.data.wind.speed,
      temperature: response.data.main.temp,
      condition: response.data.weather[0].main
    });
  } catch (error) {
    console.log(`Error in method: post - /getWeather: ${error}`);
    res.render("index.ejs", {
      isReturned: "error",
    });
  }
});

app.listen(port, () => {
  console.log(`App is listening on the port ${port}`);
});
