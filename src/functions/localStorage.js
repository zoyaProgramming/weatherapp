import { useEffect } from "react";

export  function getLocalStorage(key, dispatch){
  const value = localStorage.getItem(key);
  dispatch({type: key, data: value})
}

export  function updateLocalStorage(key, value, dispatch){
  localStorage.setItem(key, value);
  dispatch({type: key, data: value});
  
}

export const getAllLocalStorage = () => {
  let obj = {}
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
