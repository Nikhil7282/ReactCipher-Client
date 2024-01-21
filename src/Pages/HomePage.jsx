import React, { useEffect } from "react";
import AnimatedLetters from "../components/animattedLetters/AnimatedLetters";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const HomePage = () => {
  const { user, isLoggedIn } = useAuth;
  const navigate = useNavigate();
  // console.log(user);
  const letterArray = [
    "W",
    "e",
    "l",
    "c",
    "o",
    "m",
    "e",
    " ",
    "T",
    "o",
    " ",
    "R",
    "e",
    "a",
    "c",
    "t",
    " ",
    "C",
    "i",
    "p",
    "h",
    "e",
    "r",
  ];
  let title_characters = [
    "S",
    "a",
    "f",
    "e",
    "g",
    "u",
    "a",
    "r",
    "d",
    "i",
    "n",
    "g",
    " ",
    "Y",
    "o",
    "u",
    "r",
    " ",
    "D",
    "i",
    "g",
    "i",
    "t",
    "a",
    "l",
    " ",
    "I",
    "d",
    "e",
    "n",
    "t",
    "i",
    "t",
    "y",
  ];
  useEffect(() => {
    if (user && isLoggedIn) {
      navigate("/addPassword");
    }
  }, []);
  return (
    <div className="home-page">
      <div
        className="animatedLetters"
        style={{
          color: "white",
          position: "absolute",
          top: "40%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <AnimatedLetters
          letter={"text-animate"}
          strArray={letterArray}
          idx={10}
        />
        <br />
        <p>
          <AnimatedLetters
            letter={"text-animate"}
            strArray={title_characters}
            idx={15}
          />
        </p>
      </div>
      <div className="spacer layer1"></div>
    </div>
  );
};

export default HomePage;
