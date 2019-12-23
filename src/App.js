import React from 'react';
import Weather from './components/Weather';
import Form from './components/Form';
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

  get_WeatherIcon(icons,rangeId)
  {
    switch(true)
    {
      case rangeId>=200 && rangeId <=230:
        this.setState({weatherIcon:this.weatherIcon.Thunderstorm});
        break;
        case rangeId>=300 && rangeId <=321:
        this.setState({weatherIcon:this.weatherIcon.Drizzle});
        break;
        case rangeId>=500 && rangeId <=531:
        this.setState({weatherIcon:this.weatherIcon.Rain});
        break;
        case rangeId>=600 && rangeId <=622:
        this.setState({weatherIcon:this.weatherIcon.Snow});
        break;
        case rangeId>=701 && rangeId <=781:
        this.setState({weatherIcon:this.weatherIcon.Atmosphere});
        break;
        case rangeId===800:
        this.setState({weatherIcon:this.weatherIcon.Clear});
        break;
        case rangeId>=801 && rangeId <=804:
        this.setState({weatherIcon:this.weatherIcon.Clouds});
        break;
        default:
          this.setState({weatherIcon:this.weatherIcon.Clouds});
    }
  }

  getWeather=async(e)=>
  {
    e.preventDefault();

    const city=e.target.elements.city.value;
    const country=e.target.elements.country.value;

    if(city && country)
    {
      const api_call=await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${api_key}`);
    const response=await api_call.json();
    console.log(response);
    this.setState({

      city:`${response.name},${response.sys.country}`,
      temp_celsius:this.calcelsius(response.main.temp),
      minTem:this.calcelsius(response.main.temp_min),
      maxTem:this.calcelsius(response.main.temp_max),
      description:response.weather[0].description
      // weatherIcon:this.weatherIcon.Thunderstorm
    });

    this.get_WeatherIcon(this.weatherIcon,response.weather[0].id);
    }else{
      this.setState({error:true});
    }
  
  };
  
  render()
  {
    return(
      <div className="App">
        <Form loadweather={this.getWeather} error={this.state.error}/>
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
