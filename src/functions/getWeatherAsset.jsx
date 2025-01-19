
/*

Code	Description
0	Clear sky
1, 2, 3	Mainly clear, partly cloudy, and overcast

45, 48	Fog and depositing rime fog


51, 53, 55	Drizzle: Light, moderate, and dense intensity
56, 57	Freezing Drizzle: Light and dense intensity
61, 63, 65	Rain: Slight, moderate and heavy intensity
66, 67	Freezing Rain: Light and heavy intensity


71, 73, 75	Snow fall: Slight, moderate, and heavy intensity
77	Snow grains


80, 81, 82	Rain showers: Slight, moderate, and violent
85, 86	Snow showers slight and heavy

95 *	Thunderstorm: Slight or moderate
96, 99 *	Thunderstorm with slight and heavy hail
*/

export default function getWeatherAsset(weather_code, size=90){
  // gets information and images that correspond to the weather code
  let weatherURL = "";
  const weather = {};
  let url  = "http://localhost:5173/src/assets/";

  const sunny_icon = <svg xmlns="http://www.w3.org/2000/svg" style={{padding: "auto"}} viewBox="40 -920 880 880"  fill="#5f6368"><path d="M440-760v-160h80v160h-80Zm266 110-56-56 113-114 56 57-113 113Zm54 210v-80h160v80H760Zm3 299L650-254l56-56 114 112-57 57ZM254-650 141-763l57-57 112 114-56 56Zm-14 450h180q25 0 42.5-17.5T480-260q0-25-17-42.5T421-320h-51l-20-48q-14-33-44-52.5T240-440q-50 0-85 35t-35 85q0 50 35 85t85 35Zm0 80q-83 0-141.5-58.5T40-320q0-83 58.5-141.5T240-520q60 0 109.5 32.5T423-400q58 0 97.5 43T560-254q-2 57-42.5 95.5T420-120H240Zm320-134q-5-20-10-39t-10-39q45-19 72.5-59t27.5-89q0-66-47-113t-113-47q-60 0-105 39t-53 99q-20-5-41-9t-41-9q14-88 82.5-144T480-720q100 0 170 70t70 170q0 77-44 138.5T560-254Zm-79-226Z"/></svg>
  const partly_cloudy_icon = <svg xmlns="http://www.w3.org/2000/svg" style={{padding: "auto"}} viewBox="40 -920 880 800"  fill="#5f6368"><path d="M440-760v-160h80v160h-80Zm266 110-56-56 113-114 56 57-113 113Zm54 210v-80h160v80H760Zm3 299L650-254l56-56 114 112-57 57ZM254-650 141-763l57-57 112 114-56 56Zm-14 450h180q25 0 42.5-17.5T480-260q0-25-17-42.5T421-320h-51l-20-48q-14-33-44-52.5T240-440q-50 0-85 35t-35 85q0 50 35 85t85 35Zm0 80q-83 0-141.5-58.5T40-320q0-83 58.5-141.5T240-520q60 0 109.5 32.5T423-400q58 0 97.5 43T560-254q-2 57-42.5 95.5T420-120H240Zm320-134q-5-20-10-39t-10-39q45-19 72.5-59t27.5-89q0-66-47-113t-113-47q-60 0-105 39t-53 99q-20-5-41-9t-41-9q14-88 82.5-144T480-720q100 0 170 70t70 170q0 77-44 138.5T560-254Zm-79-226Z"/></svg>
  const overcast_icon = <svg xmlns="http://www.w3.org/2000/svg" style={{padding: "auto"}} viewBox="40 -800 880 650"  fill="#5f6368"><path d="M260-160q-91 0-155.5-63T40-377q0-78 47-139t123-78q25-92 100-149t170-57q117 0 198.5 81.5T760-520q69 8 114.5 59.5T920-340q0 75-52.5 127.5T740-160H260Zm0-80h480q42 0 71-29t29-71q0-42-29-71t-71-29h-60v-80q0-83-58.5-141.5T480-720q-83 0-141.5 58.5T280-520h-20q-58 0-99 41t-41 99q0 58 41 99t99 41Zm220-240Z"/></svg>
  const fog_icon = <svg xmlns="http://www.w3.org/2000/svg" style={{padding: "auto"}} viewBox="80 -880 800 800"  fill="#5f6368"><path d="M720-200q-17 0-28.5-11.5T680-240q0-17 11.5-28.5T720-280q17 0 28.5 11.5T760-240q0 17-11.5 28.5T720-200ZM280-80q-17 0-28.5-11.5T240-120q0-17 11.5-28.5T280-160q17 0 28.5 11.5T320-120q0 17-11.5 28.5T280-80Zm-40-120q-17 0-28.5-11.5T200-240q0-17 11.5-28.5T240-280h360q17 0 28.5 11.5T640-240q0 17-11.5 28.5T600-200H240ZM400-80q-17 0-28.5-11.5T360-120q0-17 11.5-28.5T400-160h280q17 0 28.5 11.5T720-120q0 17-11.5 28.5T680-80H400ZM300-320q-91 0-155.5-64.5T80-540q0-83 55-145t136-73q32-57 87.5-89.5T480-880q90 0 156.5 57.5T717-679q69 6 116 57t47 122q0 75-52.5 127.5T700-320H300Zm0-80h400q42 0 71-29t29-71q0-42-29-71t-71-29h-60v-40q0-66-47-113t-113-47q-48 0-87.5 26T333-704l-10 24h-25q-57 2-97.5 42.5T160-540q0 58 41 99t99 41Zm180-200Z"/></svg>
  const thunderstorm_icon = <svg xmlns="http://www.w3.org/2000/svg" style={{padding: "auto"}} viewBox="70 -880 810 880"  fill="#5f6368"><path d="m462 0 94-107-80-40 116-133h106l-94 107 80 40L568 0H462ZM222 0l94-107-80-40 116-133h106l-94 107 80 40L328 0H222Zm78-320q-91 0-155.5-64.5T80-540q0-83 55-145t136-73q32-57 87.5-89.5T480-880q90 0 156.5 57.5T717-679q69 6 116 57t47 122q0 75-52.5 127.5T700-320H300Zm0-80h400q42 0 71-29t29-71q0-42-29-71t-71-29h-60v-40q0-66-47-113t-113-47q-48 0-87.5 26T333-704l-10 24h-25q-57 2-97.5 42.5T160-540q0 58 41 99t99 41Zm180-200Z"/></svg>
  const snow_icon = <svg xmlns="http://www.w3.org/2000/svg" style={{padding: "auto"}} viewBox="80 -880 800 840"  fill="#5f6368"><path d="M240-200q-17 0-28.5-11.5T200-240q0-17 11.5-28.5T240-280q17 0 28.5 11.5T280-240q0 17-11.5 28.5T240-200Zm480 0q-17 0-28.5-11.5T680-240q0-17 11.5-28.5T720-280q17 0 28.5 11.5T760-240q0 17-11.5 28.5T720-200ZM360-40q-17 0-28.5-11.5T320-80q0-17 11.5-28.5T360-120q17 0 28.5 11.5T400-80q0 17-11.5 28.5T360-40Zm120-160q-17 0-28.5-11.5T440-240q0-17 11.5-28.5T480-280q17 0 28.5 11.5T520-240q0 17-11.5 28.5T480-200ZM600-40q-17 0-28.5-11.5T560-80q0-17 11.5-28.5T600-120q17 0 28.5 11.5T640-80q0 17-11.5 28.5T600-40ZM300-320q-91 0-155.5-64.5T80-540q0-83 55-145t136-73q32-57 87.5-89.5T480-880q90 0 156.5 57.5T717-679q69 6 116 57t47 122q0 75-52.5 127.5T700-320H300Zm0-80h400q42 0 71-29t29-71q0-42-29-71t-71-29h-60v-40q0-66-47-113t-113-47q-48 0-87.5 26T333-704l-10 24h-25q-57 2-97.5 42.5T160-540q0 58 41 99t99 41Zm180-200Z"/></svg>
  const weather_mix_icon = <svg xmlns="http://www.w3.org/2000/svg" style={{padding: "auto"}} viewBox="80 -880 800 840"  fill="#5f6368"><path d="M500-40q-25 0-42.5-17T440-99q0-12 4.5-23t13.5-19l42-39 42 39q9 8 13.5 19t4.5 23q0 25-17.5 42T500-40Zm-138-60-42-42 118-118 42 42-118 118Zm258-60-60-60 60-60 60 60-60 60Zm-360 0-60-60 60-60 60 60-60 60Zm40-160q-91 0-155.5-64.5T80-540q0-83 55-145t136-73q32-57 87.5-89.5T480-880q90 0 156.5 57.5T717-679q69 6 116 57t47 122q0 75-52.5 127.5T700-320H300Zm0-80h400q42 0 71-29t29-71q0-42-29-71t-71-29h-60v-40q0-66-47-113t-113-47q-48 0-87.5 26T333-704l-10 24h-25q-57 2-97.5 42.5T160-540q0 58 41 99t99 41Zm180-200Z"/></svg>
  const rain_icon = (<svg xmlns="http://www.w3.org/2000/svg" style={{padding: "auto"}} viewBox="80 -880 800 807"  fill="#5f6368"><path d="M558-84q-15 8-30.5 2.5T504-102l-60-120q-8-15-2.5-30.5T462-276q15-8 30.5-2.5T516-258l60 120q8 15 2.5 30.5T558-84Zm240 0q-15 8-30.5 2.5T744-102l-60-120q-8-15-2.5-30.5T702-276q15-8 30.5-2.5T756-258l60 120q8 15 2.5 30.5T798-84Zm-480 0q-15 8-30.5 2.5T264-102l-60-120q-8-15-2.5-30.5T222-276q15-8 30.5-2.5T276-258l60 120q8 15 2.5 30.5T318-84Zm-18-236q-91 0-155.5-64.5T80-540q0-83 55-145t136-73q32-57 87.5-89.5T480-880q90 0 156.5 57.5T717-679q69 6 116 57t47 122q0 75-52.5 127.5T700-320H300Zm0-80h400q42 0 71-29t29-71q0-42-29-71t-71-29h-60v-40q0-66-47-113t-113-47q-48 0-87.5 26T333-704l-10 24h-25q-57 2-97.5 42.5T160-540q0 58 41 99t99 41Zm180-200Z"/></svg>)
  function helper(){
    switch(weather_code){
      default: 
        return {
          description: "sunny",
          icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="40 -920 880 880" fill="#5f6368"><path d="M440-760v-160h80v160h-80Zm266 110-55-55 112-115 56 57-113 113Zm54 210v-80h160v80H760ZM440-40v-160h80v160h-80ZM254-652 140-763l57-56 113 113-56 54Zm508 512L651-255l54-54 114 110-57 59ZM40-440v-80h160v80H40Zm157 300-56-57 112-112 29 27 29 28-114 114Zm283-100q-100 0-170-70t-70-170q0-100 70-170t170-70q100 0 170 70t70 170q0 100-70 170t-170 70Zm0-80q66 0 113-47t47-113q0-66-47-113t-113-47q-66 0-113 47t-47 113q0 66 47 113t113 47Zm0-160Z"/></svg>,
          image:   "clear_sky.jpeg"
          }
        break;
      case 0:
        return {
          description: "sunny",
          icon: sunny_icon,
          image:   "clear_sky.jpeg"
          }
        break;
      case 1: 
        weather.description ="mainly clear"
        return{
          ...weather,
          icon: (partly_cloudy_icon),
          image: "partly_cloudy.jpg"
        }
      case 2:
        weather.description ="partly cloudy"
        return{
          description: "partly cloudy",
          icon:  (partly_cloudy_icon),
          image:  "partly_cloudy.jpg"
        }
      case 3:
        weather.description ="overcast"
        // partly cloudy
        return{
          description: "overcast",
          icon:  ( ( (overcast_icon))),
          image: "partly_cloudy.jpg"
        }
      case 45:
        return{
          description: " fog",
          image: "fog.jpeg",
          icon:  (fog_icon)
        }
      case 48:
        weather.description ="depositing rime fog"
        return{...weather,
          image: "fog.jpeg",
          icon:  (fog_icon)
        }
        //fog
        break;
      case 51:
        weather.description ="light drizzle"
        return{
          description: "light drizzle",
          image: "rainy.jpg",
          icon:  rain_icon
        }
      case 53:
        weather.description ="medium drizzle"
        return{
          description: "medium drizzle",
          image: "rainy.jpg",
          icon:  rain_icon
        }

      case 55:
        weather.description ="heavy drizzle"
        return{
          description: "heavy drizzle",
          image: "rainy.jpg",
          icon:  rain_icon
        }
        // heavy or moderate rain
        break;
      case 56:
        return{
          description: "freezing drizzle light intensity",
          image: "snow.jpg",
          icon:  ( ( (weather_mix_icon)))
        }

      case 57:
        return{
          description: "freezing drizzle heavy intensity",
          image: "snow.jpg",
          icon:  ( ( (weather_mix_icon)))
        }
        // mixed rain + snow, drizzle
        break;
      case 63:
        weather.description ="moderate rain"
        return {
          description: "moderate rain",
          image: "rainy.jpg",
          icon:  rain_icon
        }
      case 65:
        weather.description ="heavy rain"
        return {
          description: "heavy rain",
          image: "rainy.jpg",
          icon:  ( (rain_icon))
        }
      case 61:
        //rain
        weather.description ="light rain"
        return {
          description: "light rain",
          image: "rainy.jpg",
          icon:  ( (rain_icon))
        }
          break;
      case 66:
        weather.description ="freezing rain light intensity"
        return{
          description: "freezing rain light intensity",
          icon:  ( (weather_mix_icon)),
          image: "snow_2.jpg"
        }
      case 67:

        weather.description ="freezing rain heavy intensity"
        return{
          description: "freezing rain heavy intensity",
          icon:  ( (weather_mix_icon)),
          image: "snow_2.jpg"
        }
        // mixed rain + snow, drizzle
        break;
      case 71:
        return{
          description: "snowfall light intensity",
          icon: snow_icon,
          image: "snow_2.jpg"
        }
      case 73:
        weather.description ="snowfall moderate intensity"
        return{
          description: "snowfall moderate intensity",
          icon: snow_icon,
          image: "snow_2.jpg"
        }
      case 75:
        weather.description ="snowfall heavy intensity"
        return{
          description: "snowfall heavy intensity",
          icon: snow_icon,
          image: "snow_2.jpg"
        }
      case 77:
        weather.description ="snow grains"
        return{
          description: "snow grains",
          icon: snow_icon,
          image: "snow_2.jpg"
        }
        // snow fall
        break;
      case 80:
        return({
          description :"rain showers light",
          image:   "rainy.jpg",
          icon: rain_light_icon
        })
      case 81:
        return({
          description :"rain showers moderate",
          image:   "rainy.jpg",
          icon:  ( (rain_icon))
        })
      case 82:
        weather.description ="rain showers heavy"
        //rain showers
        return{
          ...weather,
          image:   "rainy.jpg",
          icon:  ( (rain_icon))
        }
        break;

      case 85:
        weather.description ="slight snow showers "
        return{
          ...weather,
          icon: (snow_icon),
          image: "snow_2.jpg"
        }
      case 86:
        weather.description ="heavy snow showers"
        // snow showers light and heavy
        return{
          ...weather,
          icon: <svg xmlns="http://www.w3.org/2000/svg" style={{padding: "auto"}} viewBox="40 -920 880 880"  fill="#5f6368"><path d="M240-200q-17 0-28.5-11.5T200-240q0-17 11.5-28.5T240-280q17 0 28.5 11.5T280-240q0 17-11.5 28.5T240-200Zm480 0q-17 0-28.5-11.5T680-240q0-17 11.5-28.5T720-280q17 0 28.5 11.5T760-240q0 17-11.5 28.5T720-200ZM360-40q-17 0-28.5-11.5T320-80q0-17 11.5-28.5T360-120q17 0 28.5 11.5T400-80q0 17-11.5 28.5T360-40Zm120-160q-17 0-28.5-11.5T440-240q0-17 11.5-28.5T480-280q17 0 28.5 11.5T520-240q0 17-11.5 28.5T480-200ZM600-40q-17 0-28.5-11.5T560-80q0-17 11.5-28.5T600-120q17 0 28.5 11.5T640-80q0 17-11.5 28.5T600-40ZM300-320q-91 0-155.5-64.5T80-540q0-83 55-145t136-73q32-57 87.5-89.5T480-880q90 0 156.5 57.5T717-679q69 6 116 57t47 122q0 75-52.5 127.5T700-320H300Zm0-80h400q42 0 71-29t29-71q0-42-29-71t-71-29h-60v-40q0-66-47-113t-113-47q-48 0-87.5 26T333-704l-10 24h-25q-57 2-97.5 42.5T160-540q0 58 41 99t99 41Zm180-200Z"/></svg>,
          image: "snow_2.jpg"
        }
        break;
      case 95:
        weather.description ="thunderstorm"
        return{
          ...weather,
          icon: thunderstorm_icon,
          image:   "cloudy_2.jpeg"
        }
        // thunderstorm
        
        
      case 96:
        weather.description ="thunderstorm with slight hail"
        return{
          ...weather,
          icon: (thunderstorm_icon),
          image:   "cloudy_2.jpeg"
        }
      case 99:
        weather.description ="thunderstorm with heavy hail"
        return{
          ...weather,
          icon: (thunderstorm_icon),
          image:   "cloudy_2.jpeg"
        }
        //hunderstorm with slight and heavy hail
        break;
   /*   default:
        return{
          description: "weather code not identified",
          icon: <svg xmlns="http://www.w3.org/2000/svg" style={{padding: "auto"}} viewBox="40 -920 880 880"  fill="#5f6368"><path d="M440-760v-160h80v160h-80Zm266 110-55-55 112-115 56 57-113 113Zm54 210v-80h160v80H760ZM440-40v-160h80v160h-80ZM254-652 140-763l57-56 113 113-56 54Zm508 512L651-255l54-54 114 110-57 59ZM40-440v-80h160v80H40Zm157 300-56-57 112-112 29 27 29 28-114 114Zm283-100q-100 0-170-70t-70-170q0-100 70-170t170-70q100 0 170 70t70 170q0 100-70 170t-170 70Zm0-80q66 0 113-47t47-113q0-66-47-113t-113-47q-66 0-113 47t-47 113q0 66 47 113t113 47Zm0-160Z"/></svg>,
          image: "clear_sky.jpeg"
        }
*/
    }
  }
  const h = helper();
  h.image = url + h.image;
  h.icon = (<div style={{padding: "auto", height: `${size}px`, width: `${size}px`, marginLeft: "auto", marginRight: "auto", marginTop: "20px", margin: "20px auto 20px auto"}}>{
    h.icon}</div>)
  return h;
  return {...h, image: url + h.image }

}