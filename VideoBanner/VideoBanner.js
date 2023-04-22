import React from "react";
import "./Video.css";

const VideoBanner = (props) => {
  return (
    <div className="video-banner">
      <video autoPlay loop muted>
        <source
          src={require(`../Video/${props.videoName}.mp4`)}
          type="video/mp4"
        />
      </video>
    </div>
  );
};

export default VideoBanner;
