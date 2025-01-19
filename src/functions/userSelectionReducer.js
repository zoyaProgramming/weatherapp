export default function userSelectionReducer(state, action){
  switch(action.type){
    case "city":
      const data = action.data[0];
      localStorage.setItem("city", data.name);
      localStorage.setItem("country", data.country);
      return {...state, city: data.name};
    case "temperature_unit":
      localStorage.setItem("temperature_unit", action.data);
      return {...state, temperature_unit: action.data}
  
  }
}