
import { useContext, useEffect, useState } from 'react'
import snow from '../assets/snow.jpg'
import { SearchBar } from './searchbar'
import { UserSelectionContext } from '../App'
import { getCityInformation, getCurrentTemperature } from '../callAPI';
import getWeatherAsset from '../functions/getWeatherAsset';



function TemperatureUnitButton({dispatch}){
 
  return(<>
    <span style={{
        background: "none", padding: "0", border: "none", color: "rgb(63, 63, 171)", fontFamily: 'Varela Round',
        display: "flex", placeItems: "center center", width: "max-content", height: "100%"}}>
    
      <button style={{
        background: "none", padding: "0", border: "none", }}
        onClick={() => {dispatch({type: "temperature_unit", data:"fahrenheit"})}}>
            °F
        </button>
        <p>/</p>
      <button style={{
        background: "none", padding: "0", border: "none",}}
        onClick={() => {dispatch({type: "temperature_unit", data:"celsius"})}}>
            °C
      </button>
    </span>
      </>
    
    
    
  )

}

export function useCurrentWeather(ctxt, dispatch){
  const [state, setState] = useState(null);
  useEffect(()=>{
    try{
      async function a() {
        const weatherInfo =  await getCurrentTemperature(ctxt);
        setState(weatherInfo);
      }
      a()
      
    } catch (err){
      console.log("error: " + err)
      setState(undefined);
    }
  
  }, [ctxt.city, ctxt.temperature_unit])
  return state;

}
export function TempFetch({currentWeather}){
 // const currentWeather = useCurrentWeather();


  if(currentWeather  == null){
    return (<h2 className="material-symbols-outlined" 
      style={{color: "white"}}>sync</h2>)
  } else {
    
    return (
    <>
    <h2 className="h2-city" style={{color: "white"}}>
      {JSON.stringify(currentWeather.temperature_2m)}°</h2>
    </>)
  }
}

export function Header({currentWeather}){
  const [userSelectionData, dispatch] = useContext(UserSelectionContext);
  const icon = getWeatherAsset(currentWeather.weather_code).icon
  return (
  <>
    <header>
      <div className='div-top-bar'>
        <TemperatureUnitButton dispatch={dispatch}></TemperatureUnitButton>
      </div>

      <div className='wrap-horizontal div-container-header' >
        <div className="wrap-vertical" style={{}}>
          <h1 className="title">
            {userSelectionData.city }
          </h1>
          <h2 className="h2-city">
            {userSelectionData.country}
          </h2>
        </div>
        <div className='wrap-horizontal'>
          <SearchBar></SearchBar>
        {icon}
        <TempFetch currentWeather={currentWeather}></TempFetch>
        </div>
        
      </div>
        
      
    </header>
  </>)
}