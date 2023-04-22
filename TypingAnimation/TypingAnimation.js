import React from "react";
import "./TypingAnimation.css";

const TypingAnimation = () => {
  return (
    <>
      <div className="bouncing-word-container ">
        <div
          className="bouncing-letters-container"
          style={{
            fontFamily: "roboto",
            fontSize: "10px",
            marginTop: "16px",
            marginRight: "20px",
          }}
        >
          <div className="bouncing-letter red">B</div>
          <div className="bouncing-letter orange">E</div>
          <div className="bouncing-letter yellow">G</div>
          <div className="bouncing-letter green">U</div>
          <div className="bouncing-letter blue">M</div>
          <div className="bouncing-letter indigo">P</div>
          <div className="bouncing-letter purple">U</div>
          <div className="bouncing-letter pink">L</div>
          <div className="bouncing-letter brown">L</div>
        </div>
      </div>
    </>
  );
};

export default TypingAnimation;
