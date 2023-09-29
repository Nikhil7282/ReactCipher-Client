import React from 'react';
// import Login from './Login';
// import Signup from './Signup';
// import './HomePage.css'; // Assuming you have a CSS file for styling

const HomePage = () => {
  return (
    <div className="home-page">
      <div className="background-image">
        <div className="description">
          <h1>Because Your Privacy Matters</h1>
          <p>This is the best website ever. We have lots of cool stuff here. Check it out!</p>
        </div>
        <div className="user-options">
        <button className="login-button">Login</button>
          <button className="signup-button">Signup</button>
        </div>
      </div>
    </div> 
  );
};

export default HomePage;
