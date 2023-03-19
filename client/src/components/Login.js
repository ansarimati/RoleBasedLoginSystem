import React, { useState } from 'react';
import { useNavigate } from "react-router-dom"

export const Login = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    // console.log(name,password);
    let result = await fetch("http://localhost:3005/auth/login", {
      method: "post",
      body: JSON.stringify({ userName: name, password: password }),
      headers: {
        "Content-Type": "application/json",
      }

    })
    result = await result.json();
    // console.log(result);

    if (result.token) {
      localStorage.setItem("user", JSON.stringify(result.user));
      localStorage.setItem("token", JSON.stringify(result.auth));

    }
    else {
      alert("please enter valid credentials")
    }

    if (result.user.role === "admin") {
      navigate("/adminHome")
    }
    // else navigate("/userHome")
    else navigate("/")
  }

  return (
    <div>
      <h2>Login Page</h2>
      <div>
        <label htmlFor='username'>User Name </label>
        <input type="text" id="username" value={name} placeholder="Enter user name"
          onChange={(e) => setName(e.target.value)}
        ></input>
      </div>
      <br />
      <div>
        <label htmlFor='password'>Password </label>
        <input type="password" id="password" value={password} placeholder="Enter password"
          onChange={(e) => setPassword(e.target.value)}></input>
      </div>
      <br />
      <div>
        <button onClick={handleLogin}>Login</button>
      </div>
      <br />
      <div>
        <button onClick={() => navigate("/signup")}>Register</button>
      </div>
    </div>
  )
}
