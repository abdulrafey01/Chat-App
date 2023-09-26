import React, { useState, useRef } from "react";

import "./input.css";

export default function Input({sendImage, setMessage, sendMessage, message }) {
  const [file, setfile] = useState(null);
  const fileInputRef = useRef(null);

  function handleIconClick(e) {
    fileInputRef.current.click();
  }

  // use filereader as given in chatgpt
  function handleImage(event) {
    const f = event.target.files[0]
    sendImage(f)
  }

  
  
  return (
    <div>
      <form className="form">
        <input
          className="input"
          type="text"
          placeholder="Type a message..."
          value={message}
          onChange={({ target: { value } }) => setMessage(value)}
          onKeyPress={(event) =>
            event.key === "Enter" ? sendMessage(event) : null
          }
        />
        <input
          type="file"
          ref={fileInputRef}
          name="image"
          style={{ display: "none" }}
          onChange={handleImage}
        />
        <i className="fa-regular fa-image" onClick={handleIconClick}></i>
        <button className="sendButton" onClick={(e) => sendMessage(e)}>
          Send
        </button>
      </form>
    </div>
  );
}
