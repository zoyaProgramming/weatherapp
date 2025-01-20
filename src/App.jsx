import { createContext, useContext, useState, useEffect } from 'react'
import {Header} from './components/header'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import './assets/css/phone.css'
import './assets/css/header.css'
import './assets/snow.jpg'
import Footer from './components/footer'
import Index from './pages'
import { testAPI } from './callAPI'
import { useReducer } from 'react'
import userSelectionReducer from './functions/userSelectionReducer'
import { getLocalStorage, getAllLocalStorage, updateLocalStorage, clearLocalStorage } from './functions/localStorage'
import getWeatherAsset from './functions/getWeatherAsset.jsx'
import { getCurrentTemperature } from './callAPI'
import Loading from './pages/loading.jsx'
import { useDailyWeather } from './pages'
import { useCurrentWeather } from './components/header'



export const UserSelectionContext = createContext();
function App() {
  clearLocalStorage()
  const [selectionData, dispatchSelectionData] = useReducer(userSelectionReducer, undefined,getAllLocalStorage);
  const currentWeather = useCurrentWeather(selectionData, dispatchSelectionData);
  const data = useDailyWeather(selectionData);
  if(!currentWeather || !data){
    return (<>
      
      <Loading></Loading>
      <Footer></Footer>
    </>)
  }
  
  return (<>
    <div className='div-container-outer' style={{ backgroundImage : `url(${
      (currentWeather!==null&&currentWeather!==undefined)?getWeatherAsset(currentWeather.weather_code).image:"http://localhost:5173/src/assets/snow.jpg"
      /*"http://localhost:5173/src/assets/snow.jpg"*/})`,
  }}>
        <UserSelectionContext.Provider value = {[selectionData, dispatchSelectionData]}>
          <Header currentWeather={currentWeather}></Header>
          <Index data={data}/>
          <Footer></Footer>
        </UserSelectionContext.Provider>
    </div>


    </>
  )
}

export default App
