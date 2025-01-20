import { useEffect } from "react";

export  function getLocalStorage(key, dispatch){
  const value = localStorage.getItem(key);
  dispatch({type: key, data: value})
}

export  function updateLocalStorage(key, value, dispatch){
  localStorage.setItem(key, value);
  dispatch({type: key, data: value});
  
}

export function getIsMobile(){
  const minAspectRatio = "1/2.5"
  const mediaQuery = window.matchMedia(`(min-aspect-ratio: ${minAspectRatio})`)
  
    if(mediaQuery.matches){
      return true;
      console.log("This is not a phone!")
    } else {
      return false;
  
  }
}


export const getAllLocalStorage = () => {
  let obj = {}
  const isPhone = getIsMobile()
  if(localStorage.length == 0){
    localStorage.setItem("city", "Seattle");
    localStorage.setItem("unit", "celsius");
  }
  for(let i = 0; i< localStorage.length; i++){
    let key = localStorage.key(i)
    obj[key] = localStorage.getItem(key);
  }
  return obj;
}

export function clearLocalStorage(){
  localStorage.clear();
  for(let i = 0; i < localStorage.length; i++){
   
  }
}
