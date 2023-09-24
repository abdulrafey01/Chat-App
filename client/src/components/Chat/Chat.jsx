import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./chat.css";
import io from "socket.io-client";
import InfoBar from "../InfoBar/InfoBar";
import Input from "../Input/Input";
import Messages from "../Messages/Messages";

let socket;
export default function Chat() {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const location = useLocation();
  const ENDPOINT = "localhost:4000";

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const name = queryParams.get("name");
    const room = queryParams.get("room");

    socket = io(ENDPOINT);

    socket.emit("join", { name, room },(error) => {
      if(error){
        alert(error);
      }
    });

    setName(name);
    setRoom(room);
  }, [ENDPOINT, location.search]);

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages([...messages, message]);
    });
  }, [messages]);

  const sendMessage = (event) => {
    event.preventDefault();
    if (message) {
      socket.emit("sendMessage", message, () => setMessage(""));
    }
  };
  
  console.log(messages);

  return (
    <div className="outerContainer">
      <div className="container">
        <InfoBar room={room} />
        <Messages messages={messages} name={name} />
       <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
       
      </div>
    </div>
  );
}
