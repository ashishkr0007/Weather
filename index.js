const express= require("express");
const https = require("https");//for api request
const bodyParser = require("body-parser");

const app=express();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/" ,function(req,res){
    res.sendFile(__dirname+ "/index.html");
});

app.post("/" ,function(req,res){
    const query=req.body.cityName;
    const apiKey="18ecba900ff4409fd2ab418404eb993e";//api
    const unit="metric";
    const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units="+unit;
   
  https.get(url, function(response){//using https
      console.log(response.statusCode); 
      
      response.on("data",function(data){
        const weatherdata= JSON.parse(data);
        const temp= weatherdata.main.temp;
        const weatherDesc=weatherdata.weather[0].description;
        const icon=weatherdata.weather[0].icon;
        
        const imageURL="http://openweathermap.org/img/wn/" +icon+ "@2x.png";//for iconUrl

        res.write("<p> The weather condition is currentlty"+weatherDesc+"<p>");
        res.write("<h1> The Temperatur in "+query+" is"+temp+"degree celcius.</h1>");
        res.write("<img src="+imageURL+">");
        res.send();
})
})   
})
app.listen(process.env.PORT || 3000, function(){
    console.log("Server is running on port 3000");
})