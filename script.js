// 615068582099a28e642dd93384a47c36
let input_place=document.querySelector(".weather_search")

let cityName=document.querySelector(".weather_city")
let dateTime=document.querySelector(".weather_date_time")

let w_foreCast=document.querySelector(".weather_forecast")
let w_icon=document.querySelector(".weather_icon")

let w_temperature=document.querySelector(".weather_temperature")
let w_minTemp=document.querySelector(".weather_min")
let w_maxTemp=document.querySelector(".weather_max")

let w_feels=document.querySelector(".weather_feelsLike")
let w_humidity=document.querySelector(".weather_humidity")
let w_pressure=document.querySelector(".weather_pressure")
let w_wind=document.querySelector(".weather_wind")

//to get the locale country name
let toGetCountryName=(code)=>{
    return new Intl.DisplayNames([code],{type: 'region'}).of(code)
}
//tod get the actual date and time
let toGetDateTime=(dt)=>{
    // let dt=1733058430;
    const curDate=new Date(dt*1000)
    console.log(curDate);
    
    const options={
        weekend:"long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute:"numeric",
    }

    const formater=new Intl.DateTimeFormat("en-US",options).format(curDate)
    return formater
}

let city="Tamilnadu";
input_place.addEventListener("submit",(e)=>{
    e.preventDefault();

    let cityName=document.querySelector("#input_cityName")
    // console.log(cityName.value);
    city=cityName.value
    weatherLoad()
    cityName.value="";
})


const weatherLoad= async()=>{
    const weatherApi=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=615068582099a28e642dd93384a47c36`
    try{
        let response=await fetch(weatherApi);
        let data= await response.json()
        // console.log(data);

        const {main, name, sys, weather, wind, dt}=data;


        cityName.innerHTML= `${name},${toGetCountryName(sys.country)}`;
        dateTime.innerHTML= toGetDateTime(dt);
        w_temperature.innerHTML=`${main.temp}&#176`;
        w_minTemp.innerHTML=`min: ${main.temp_min.toFixed()}&#176`;
        w_maxTemp.innerHTML=`max: ${main.temp_max.toPrecision(3)}&#176`;

        w_foreCast.innerHTML=`${weather[0].main}`;
        w_icon.innerHTML=`<img src="https://openweathermap.org/img/wn/${weather[0].icon}@4x.png">`;

        w_feels.innerHTML=`${main.feels_like}&#176`
        w_humidity.innerHTML=`${main.humidity}&#176`
        w_pressure.innerHTML=`${main.pressure} Pa`
        w_wind.innerHTML=`${wind.speed}m/s`
    }
    catch(err){
        console.log("The city Name not found..."+err);
    }
}

document.body.addEventListener("load",weatherLoad());

