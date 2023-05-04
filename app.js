const express = require("express");
const https = require("https");

const bodyParser = require("body-parser");
const app = express();


app.use(bodyParser.urlencoded({extended: true}));


app.get("/", (req, res)=>{
    res.sendFile(__dirname+"/index.html");
  
});


app.post("/",(req, res)=>{
    
const query = req.body.cityName;
const apikey = "7eca2ae54fbf941392732d1cf911b36e"

const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apikey;

https.get(url, (response) => {
    

    response.on("data", (data) => {

        const weatherData = JSON.parse(data);
        const temp = weatherData.main.temp;
        const weatherDesc = weatherData.weather[0].description;
        const icon = weatherData.weather[0].icon;
        const imgurl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

        res.write("<p>the weather id currently  "+weatherDesc + "<p>");
        res.write("<img src="+imgurl+">");
        res.write("<h1>The temperature in "+query+" is "+temp+"degree celsius</h1>");
        res.send();
    })
}) 

});
app.listen(3000,() => {
    console.log("server is working")
});