import { useState } from "react"

export default function Sidebar(){
  const [open, setOpen] = useState(false);
  if(!setOpen){
    return(
      <button className="material-symbols-outlined" onClick={() => {setOpen(!open)}}></button>
    )
  }
  return(
    <div className="wrap-horizontal">
      
    </div>
  )
}