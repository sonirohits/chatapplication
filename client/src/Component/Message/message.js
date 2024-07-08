import React from 'react'
import "./message.css"
const message = ({user,message,classes}) => {
    if(user)
    {
        return (
            <div className={`messageBox ${classes}`}>
               {`${user} : ${message}`}
                </div> 
          )
    }
    else{
        return (
            <div className={`messageBox ${classes}`}>
               {`You: ${message}`}
                </div> 
          )
    }
  
}

export default message