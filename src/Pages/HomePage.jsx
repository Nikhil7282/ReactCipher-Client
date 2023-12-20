import React from "react";
import AnimatedLetters from "../components/animattedLetters/AnimatedLetters";

const HomePage = () => {
  const letterArray=["W","e","l","c","o","m","e"," ","T","o"," ","Q","a","n","t","u","m"," ","L","o","c","k"]
  return (
    <div className="home-page">
      <div
        style={{
          color: "white",
          position: "absolute",
          top: "40%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
      <AnimatedLetters letter={"text-animate"} strArray={letterArray} idx={10}/>
      </div>
      <div className="spacer layer1"></div>
    </div>
  );
};

export default HomePage;
