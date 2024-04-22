import React, { useState } from 'react'
import './Weatherapp.css'
import clear from "../Asset/clear.png"
import cloud from "../Asset/cloud.png"
import drizzle from "../Asset/drizzle.png"
import humidity from "../Asset/humidity.png"
import rain from "../Asset/rain.png"
import snow from "../Asset/snow.png"
import wind from "../Asset/wind.png"


const Weatherapp = () => {

  let api_key = "8a37ce25c06c4be31ac2e8c227545164"

  const[wicon,setWicon] = useState(cloud)

  const search = async () => {
    const element = document.getElementsByClassName("cityinput")
    if(element[0].value === ""){return 0}
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${api_key}`
    let response = await fetch(url)
    let data = await response.json()
    const humidity = document.getElementsByClassName("humidity")
    const wind = document.getElementsByClassName("wind")
    const temprature = document.getElementsByClassName("weather-temp")
    const location = document.getElementsByClassName("weather-location")

    humidity[0].innerHTML = data.main.humidity+" %"
    wind[0].innerHTML = data.wind.speed+" km/hr"
    temprature[0].innerHTML = data.main.temp+" ℃"
    location[0].innerHTML = data.name
    
    if(data.weather[0].icon==="01d" || data.weather[0].icon==="01n"){setWicon(clear)}
    else if(data.weather[0].icon==="02d" || data.weather[0].icon==="02n"){setWicon(cloud)}
    else if(data.weather[0].icon==="03d" || data.weather[0].icon==="03n"){setWicon(drizzle)}
    else if(data.weather[0].icon==="04d" || data.weather[0].icon==="04n"){setWicon(drizzle)}
    else if(data.weather[0].icon==="09d" || data.weather[0].icon==="09n"){setWicon(rain)}
    else if(data.weather[0].icon==="10d" || data.weather[0].icon==="10n"){setWicon(rain)}
    else if(data.weather[0].icon==="13d" || data.weather[0].icon==="13n"){setWicon(snow)}
    else{setWicon(clear)}
  }

  return (
    <div className='container'>
        <div className='top-bar'>
            <input type="text" className="cityinput" placeholder='Search'/>
            <div onClick={()=>{search()}}>
                <button className="search-icon">🔍</button>
            </div>
        </div>
        <div className="weather-image">
          <img src={wicon} alt=""/>
        </div>
        <div className="weather-temp">24 ℃</div>
        <div className="weather-location">London</div>
        <div className="data-containers">
          <div className="element">
            <img src={humidity} alt="" className="icon" />
            <div className="data">
              <div className="humidity">64 %</div>
              <div className="text">Humidity</div>
            </div>
          </div>
          <div className="element">
            <img src={wind} alt="" className="icon" />
            <div className="data">
              <div className="wind">18 km/hr</div>
              <div className="text">Wind Speed</div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Weatherapp
