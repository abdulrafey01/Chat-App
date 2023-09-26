import React from "react";
import "./Message.css";
import ReactEmoji from "react-emoji";

const Message = ({ message: { text, user, image }, name }) => {
  const trimmedName = name.trim().toLowerCase();
  const isSentByCurrentUser = user === trimmedName;

  const messageContainerClass = isSentByCurrentUser
    ? "messageContainer justifyEnd"
    : "messageContainer justifyStart";

  const messageBoxClass = isSentByCurrentUser
    ? "messageBox backgroundBlue"
    : "messageBox backgroundLight";

  return (
    <div className={messageContainerClass}>
      {!image ? (
        <>
          <p className={`sentText pr-10`}>
            {isSentByCurrentUser ? trimmedName : user}
          </p>
          <div className={messageBoxClass}>
            <p
              className={`messageText ${
                isSentByCurrentUser ? "colorWhite" : "colorDark"
              }`}
            >
              {ReactEmoji.emojify(text)}
            </p>
          </div>
        </>
      ) : (
        <img
          style={{
            width: "100px",
            height: "100px",
            borderRadius: "50%", // Rounded corners
            boxShadow: "0 0 5px rgba(0, 0, 0, 0.3)", // Box shadow
          }}
          src={image}
          alt="Image"
          className="messageImage"
        />
      )}
    </div>
  );
};

export default Message;
