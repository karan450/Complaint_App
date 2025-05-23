import React from 'react'
import { useLocation } from 'react-router-dom'


function Errorpage(props) {
   
  const n_prop = useLocation(); 
  return (
    <h1 style={{textAlign:"center",width:"100%",height:"90vh"}}>ERROR : {n_prop.state.error}</h1>
  )
}

export default Errorpage