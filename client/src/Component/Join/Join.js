import React, { useState } from 'react'
import "./Join.css"
import logo from "../../Images/logo.png";
import {Link} from "react-router-dom"; 
let user ;
const Join = () => {
  const [name, setname] = useState("");
  const sendUser =function(){
   user= document.getElementById('JoinInput').value;
   document.getElementById('JoinInput').value ="";
  }
  return (
    <div className='JoinPage'>
      <div className='JoinContainer'>
        <img src={logo} alt='logo'></img>
        <h1>CHAT APP</h1>
        <input type='text' id='JoinInput' placeholder='Enter Your Name'
        onChange={function(e){
          setname(e.target.value);
          console.log("the  name is",e.target.value);
        }}></input>
        <Link  onClick={ 
           function(event){ 
          
          if(!name){
            event.preventDefault();
          }
          }
          } to="/chat"> 
           <button className='joinbtn' onClick={sendUser}>Log In </button>
           </Link>
      </div>
    </div>
  )
}

export default Join
export {user};