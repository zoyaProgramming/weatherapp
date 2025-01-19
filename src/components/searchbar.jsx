import { UserSelectionContext } from "../App";
import { getCityInformation, testAPI } from "../callAPI";
import { useRef, useState, useContext } from "react";
import { updateLocalStorage } from "../functions/localStorage";

function updateInfo(){
  // to update all the information about t
}

export function SearchBar(){
  const ref = useRef();
  const [userSelectionData,dispatch] = useContext(UserSelectionContext);
  const city = userSelectionData.city;
  return(
    <>
    <div style={{padding: '20px'}}>
      <div className="wrap-horizontal">
      
        <p className="material-symbols-outlined" onClick={
          async () => {
            dispatch({type: "city", data: await getCityInformation(ref.current.value)})
          }
        }>search</p>
        <input ref = {ref} style={{width: "200px", height: "20px", borderRadius: '20px',
          backgroundColor: 'white', border: '1px solid rgb(230, 230, 230)'
        }} onKeyDown={async (event) =>  {
          if(event.keyCode == 13){
            dispatch({type: "city", data: await getCityInformation(ref.current.value)})
          }
        }}>
        </input>
      </div>
    </div>
      
    </>
  )
}