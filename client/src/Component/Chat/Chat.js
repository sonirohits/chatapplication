import React, { useEffect, useState } from 'react'
import {user} from "../Join/Join";
import socketIo from 'socket.io-client';
import '../Chat/Chat.css';
import sendLogo from "../../Images/send.png";
import Message from "../Message/message";
import ReactScrollToBottom from 'react-scroll-to-bottom';
import closeIcon from "../../Images/closeIcon.png"
const ENDPOINT = "http://localhost:4500/";

let socket;
const Chat = () => {
  const [id, setid] = useState("")
  const[messages,setMessages] =useState([]);
   const send =function(){
   const message= document.getElementById('chatInput').value;
    socket.emit('message',{message,id,user});
    document.getElementById('chatInput').value ="";
   }
  useEffect(() => {

     socket = socketIo(ENDPOINT, { transports: ['websocket'] });
  
    // Event listeners and emit events should be inside useEffect
    socket.on("connect", () => {
      alert("conect bro");
      setid(socket.id);
      console.log("connected");
    });
  
    socket.emit('joined', { user: user });
  
    socket.on("welcome", (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
      console.log(data.user);
      console.log(data.message);
    });
  
    socket.on('userJoined', (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
      console.log( data.message);
    });
    socket.on("leave",function(data){
      setMessages((prevMessages) => [...prevMessages, data]);
      console.log(data.user,data.message);
    })
  
    // Clean up the socket on component unmount
    return () => {
     socket.disconnect();
      socket.off();
    };
  }, []);  // Empty dependency array ensures this runs only once on mount
  
  useEffect(() => {
   socket.on('sendMessage',function(data){
    setMessages((prevMessages) => [...prevMessages, data]);
    console.log(data);
    console.log(data.user,data.message,data.id);
   })
  
    return () => {
     socket.off();
    }
  }, [])
  
  
  return (
    <div className='chatPage'>
      <div className='chatConatainer'>
        <div className='header'>
        <h2>chatapp</h2>
        <a href='/'><img src={closeIcon} alt='close'></img></a>
          
         
        </div>
        <ReactScrollToBottom  className='chatBox'>
        { 
          messages.map((item,i)=>{
            return <Message  user= {item.id === id?'':`${item.user}`} message={item.message} classes={item.id===id?'right':'left'}></Message>
          })
        }
        </ReactScrollToBottom >
        <div className='inputBox'>
         <input type='text' id='chatInput'></input>
         <button className='sendBtn' onClick={send}><img src={sendLogo}></img></button>
        </div>
      </div>

    </div>
 
  
  )
}

export default Chat
