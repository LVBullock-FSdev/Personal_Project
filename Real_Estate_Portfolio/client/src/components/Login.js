import React, { useState } from "react";
import axios from "axios";
import { navigate } from '@reach/router';


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [invalidLogin, setInvalidLogin] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const login = event => {
    event.preventDefault();
    axios.post("http://localhost:8000/api/users/login", { 
        email: email, 
        password: password,
      },
      {
        // this will force the sending of the credentials / cookies so they can be updated
        //    XMLHttpRequest from a different domain cannot set cookie values for their own domain 
        //    unless withCredentials is set to true before making the request
        withCredentials: true,
      }
      )
      .then((res) => {
        console.log(res.cookie, "cookie");
        console.log(res, "res");
        console.log(res.data, 'is res data!');
        navigate("/properties");
      })
      .catch(err => {
        console.log(err.response);
        setInvalidLogin("INVALID LOGIN ATTEMPT!");
        setErrorMessage(err.response.data.errors);
      });
  };

  return (
    <div>
      <h2>Login</h2>
      {
                invalidLogin ?
                    <h4 style={{backgroundColor: "yellow", color: "red", textAlign: "center"}}>{invalidLogin}</h4>
                    : null
            }
      <p className="error-text">{errorMessage ? errorMessage : ""}</p>
      <form className="regLogForm" onSubmit={login}>
        <div>
          <label >Email</label>
          <input
            type="text"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Password</label>
          <input 
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="center">
          <button 
            className="signIn"
            type="submit"
          >Manage Portfolio</button>
        </div>
      </form>
    </div>
  );
};

export default Login;