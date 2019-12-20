import React from 'react';
import Weather from './components/Weather';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'weather-icons/css/weather-icons.css';
import './App.css';

const api_key="f5cd5cc4eeb0ceb4f477d3424bcf0a0b";
//api call api.openweathermap.org/data/2.5/weather?q=London,uk

class App extends React.Component{
  constructor(){
    super();
    this.state={
      city:undefined,
      country:undefined,
      main:undefined,
      icons:undefined,
      temp_celsius:undefined,
      minTem:undefined,
      maxTem:undefined,
      error:false,
      description:"",
    };
    this.getWetaher();
    this.weatherIcon=
    {
      Thunderstorm:"wi-thunderstorm",
      Drizzle:"wi-sleet",
      Rain:"wi-storm-showers",
      Snow:"wi-snow",
      Atmosphere:"wi-fog",
      Clear:"wi-day-sunny",
      Clouds:"wi-day-fog"
    };
  }
  calcelsius(temp)
  {
    let cell = Math.floor(temp-273.15);
    return cell;
  }

  getWetaher=async()=>
  {
    const api_call=await fetch(`http://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=${api_key}`);
    const response=await api_call.json();
    console.log(response);
    this.setState({

      city:response.name,
      country:response.sys.country,
      temp_celsius:this.calcelsius(response.main.temp),
      minTem:this.calcelsius(response.main.temp_min),
      maxTem:this.calcelsius(response.main.temp_max),
      description:response.weather[0].description,
      weatherIcon:this.weatherIcon.Thunderstorm

    });
  };
  
  render()
  {
    return(
      <div className="App">
      <Weather  
      city={this.state.city} 
      country={this.state.country}
      temp_celsius={this.state.temp_celsius}
      maxTem={this.state.maxTem}
      minTem={this.state.minTem}
      description={this.state.description}
      weatherIcon={this.state.weatherIcon}
      />
    </div>
    )
  }
}


export default App;
