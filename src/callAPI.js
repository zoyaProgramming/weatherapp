export async function testAPI(cityName){
  
  try{
    const [lat, long] =  await getCityInformation(cityName);
    const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m`);
    console.log( await res.json());

  } catch{
    console.log("error!")
  }
  
  
}
export async function getCityInformation( cityName){
  const res = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${cityName}&count=10&language=en&format=json`)
  if(res.ok){
    const json = await res.json();
    const [lat, long] = [json.results[0].latitude, json.results[0].longitude];
    console.log(json)
    return json.results;
  } else {
    console.log("error here")
    throw new Error("error : country data not fetched successfully")
  }
}


export async function getCurrentTemperature(userSelectionData){
  try{
    const cityName = userSelectionData.city
    const unit =  userSelectionData.temperature_unit
    const cityInformation = (await getCityInformation(cityName))[0];
    const [lat, long] = [cityInformation.latitude, cityInformation.longitude]
    const result = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&current=weather_code,temperature_2m&${unit=="fahrenheit"?("temperature_unit=" +  unit+"&"):("")}`);
  
    if(!result.ok){
      console.log("error fetching current temperature from weather Api")
      throw new Error("error fetching current temperature from api");
    }
    const resJSON = await result.json();
    return resJSON.current;
  } catch(error){
    return(null);
  }
}

export async function getDailyTemperatureData( userSelectionData){
  try{
    
    const cityName = userSelectionData.city;
    const unit =  userSelectionData.temperature_unit
    console.log(userSelectionData)
    
    const cityInformation = (await getCityInformation(cityName))[0];
    const [lat, long] = [cityInformation.latitude, cityInformation.longitude]
    console.log('asdfjiodsafjoi;fd;s')
    console.log(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&hourly=weather_code,temperature_2m,cloud_cover&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_sum,precipitation_probability_max,wind_speed_10m_max&${unit=="unit=fahrenheit"?("temperature_unit=fahrenheit&"):("")}timezone=${cityInformation.timezone}`)
    console.log(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&hourly=weather_code,temperature_2m,cloud_cover&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_sum,precipitation_probability_max,wind_speed_10m_max&${unit=="fahrenheit"?("temperature_unit=fahrenheit&"):("")}timezone=${cityInformation.timezone}`)
    const result = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&hourly=weather_code,temperature_2m,cloud_cover&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_sum,precipitation_probability_max,wind_speed_10m_max&${unit=="fahrenheit"?("temperature_unit=fahrenheit&"):("")}timezone=${cityInformation.timezone}`);
    
    
    if(!result.ok){
      console.log("err")
      throw new Error("error fetching daily, and hourly temperature from api");
    }
    const resJSON = await result.json();
    console.log(resJSON)
    return resJSON;
  } catch(error){
    console.log("Error fetching json version of temperature data" +  error)
    return(null);
  }
}

