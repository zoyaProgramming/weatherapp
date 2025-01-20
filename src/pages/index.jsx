import { useContext, useEffect, useRef, useState } from "react"
import { getCurrentTemperature, getDailyTemperatureData } from "../callAPI"
import { UserSelectionContext } from "../App"
import getWeatherAsset from "../functions/getWeatherAsset";


export function useDailyWeather(context){
 // const [ctxt, dispatch] = useContext(UserSelectionContext);
  const [state, setState] = useState(null);
    useEffect(()=>{
      try{
        async function a() {
          const weatherInfo =  await getDailyTemperatureData( context);
          setState(weatherInfo);
        }
        a()
        
      } catch (err){
        console.log(err)
        setState(undefined);
      }
    
    }, [context.city, context.temperature_unit])
    return state;
}

function DayWeather({data, selected, setSelected, index}){
  let className = "wrap-vertical" + (selected==index?" selected":"")
  let day = ["Sunday", "Monday","Tuesday","Wednesday",
    "Thursday","Friday","Saturday","Sunday"][data.day.getDay()];
  const weatherAsset = getWeatherAsset(data.weather_code, 40)

      
  return (
    <div className ={className}style={{flexGrow: 1, height: '100%', 
    borderRight: '1px solid rgb(200, 200, 200)',
     paddingRight: '20px',
     paddingLeft: '20px', alignItems:'flex-start', justifyContent: 'flex-start'
    } }
     onClick={() =>{setSelected(index)}}>
        {weatherAsset.icon}
        <p style={{textAlign: 'left'}}><b>{weatherAsset.description}</b></p>
        <p> low: {data.min}° </p>
        <p> high: {data.max}°</p>
    </div>
  )
}

function DailyDetails({data, selected}
){
  function format(dateStr){
    const date = new Date(dateStr)
    const formatter = new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: 'numeric'
    });
    const formattedDate = formatter.format(date);
    return formattedDate;
  }


  return(
    <div className="wrap-vertical" style={{}}>
      <div className="wrap-horizontal">
        <p>sunrise: {format(data.daily.sunrise[selected])}</p>
        <p>sunset: {format(data.daily.sunset[selected])}</p>
      </div>
      <div className="wrap-horizontal">
      <p>max precipitation probability: {data.daily.precipitation_probability_max[selected]}%</p>
      <p>wind speed max: {data.daily.wind_speed_10m_max[selected]}km/h</p>
      </div>
      
    </div>
  )
}

function HourlyDetailDisplay({data, selected}){
  const weatherCodeInfo = getWeatherAsset(data.weather_code[selected], 40)
  function format(dateStr){
    const date = new Date(dateStr)
    const formatter = new Intl.DateTimeFormat('en-US', {
      hour: 'numeric'
    });
    const formattedDate = formatter.format(date);
    return formattedDate;
  }
  return(
    <div className="wrap-vertical" style={{fontSize: "2vh", width: "20vw", maxHeight: 'max-content', textAlign: 'left'}}>
      {weatherCodeInfo.icon}
      <p><b>{format(data.time[selected])}</b></p>
      
        <p>
          cloud cover: {data.cloud_cover[selected]}%
        </p>
        <p>weather: {getWeatherAsset(data.weather_code[selected]).description}</p>
    </div>
  )
}
function HourlyDetails({data, selected}){
  const [lowIndex, highIndex] = [selected*24, (selected+1)*24];
  let thing = [];
  for(let i = lowIndex; i< highIndex; i++){
    thing[i - lowIndex] = <HourlyDetailDisplay data = {data.hourly} selected={i}></HourlyDetailDisplay>

  }
  return (<div className="wrap-horizontal"
  style={{maxWidth: '100%', overflow: 'scroll',  maxHeight: '100%', alignItems: 'flex-start'}}>
      {thing}

    </div>);

}
export  function Detail({data, selected}){
  function format(dateStr){
    const date = new Date(dateStr)
    const formatter = new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    const formattedDate = formatter.format(date);
    return formattedDate;
  }
  const selectedDate = format(data.daily.time[selected])

    return(
    (<div style={{height: "max-content", width: "100%"}}>
      <div className="wrap-vertical div-container-weather-daily" 
      /*style= {{backgroundColor: "white", height: 
        "30vh", margin: "20px", borderRadius: "20px",
        alignItems: "center", padding: "20px", gap: "0", justifyContent: 'start'}}*/>
        <h2 className="h2-city">{selectedDate}</h2>
        <DailyDetails data={data} selected={selected}></DailyDetails>
        <HourlyDetails data={data} selected={selected}></HourlyDetails>
      </div>
    </div>)
  )}

export default function Index({data}){
  //const data = useDailyWeather();
  const [selected, setIsSelected] = useState(new Date(Date.now()).getDay());

  if(data == null || data == undefined){
    return (
    <div style={{height: "max-content", width: "100%"}}>
      <div className="wrap-horizontal">
        <h1 className="material-symbols-outlined">sync
        </h1>
      </div>
    </div>)
  }

  else{
    const daysMapped = mapDataToDays(data.daily, selected, setIsSelected);
    return(
      <>
      <div style={{height: "max-content", width: "100%"}}>
        <div className="wrap-horizontal div-container-weather-daily" >
          {daysMapped}

        </div>
      </div>
      <Detail data ={data} selected = {selected}></Detail>
      </>
    )
  }

}



function mapDataToDays(daily, selected, setIsSelected){
  const res = [];
  for(let i = 0; i< 7; i++ ){
    let day = new Date(daily.time[i]);
    let temperature_min = daily.temperature_2m_min[i];
    let temperature_max = daily.temperature_2m_max[i];
  
    res[i] = (<DayWeather data={{day:day, min:temperature_min, max:temperature_max, weather_code:daily.weather_code[i]} } index={i} 
      selected={selected} setSelected = {setIsSelected}></DayWeather>)
  }
  return res;
}

/*
temperature_2m_max
: 
(7) [16.1, 17.4, 16.2, 15.3, 10.7, 13.5, 14.2]
temperature_2m_min
: 
(7) [0.8, 1.2, 2.4, 7.5, 4.2, 6.4, 7.1]
time
: 
(7) ['2025-01-15', '2025-01-16
*/