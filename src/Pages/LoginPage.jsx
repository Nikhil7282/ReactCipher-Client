import React, { useState } from "react";

const LoginPage = () => {
    const [userDetails,setUserDetails]=useState({
        username:"",
        password:""
    })

    const handleChange=(e)=>{
        const {name,value}=e.target
        setUserDetails({...userDetails,[name]:value})
}
const handleSubmit=(e)=>{
    e.preventDefault()
    console.log(userDetails);
}
  return (
    <div className="section is-fullheight">
      <div className="container">
        <div className="column is-6 is-offset-3">
          <div className="box">
            <h1>Login</h1>
            <form onSubmit={handleSubmit} noValidate>
              <div className="field">
                <label className="label">Username</label>
                <div className="control">
                  <input
                    autoComplete="off"
                    type="email"
                    name="username"
                    value={userDetails.username}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Password</label>
                <div className="control">
                  <input
                    type="password"
                    name="password"
                    value={userDetails.password}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <button
                type="submit"
                className="button is-block is-info is-fullwidth"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
