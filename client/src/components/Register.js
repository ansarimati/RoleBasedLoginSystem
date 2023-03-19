import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


export const Register = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [userExist, setUserExsist] = useState(false);

  const navigate = useNavigate();

  const handledSubmit = async () => {
    if (!name || !password) {
      alert("please enter credentials")
    }
    // console.log(name, password);
    let result = await fetch("http://localhost:3005/auth/register", {
      method: "post",
      body: JSON.stringify({ userName: name, password: password }),
      headers: {
        "Content-Type": "application/json",
      }
    })

    result = await result.json();
    // console.log(result);

    if (result.msg === "User Already Exist") {
      navigate("/signup");
      setUserExsist(true);
    }

    // if (result.token) navigate("/userHome")
    if (result.token) navigate("/")


    localStorage.setItem("user", JSON.stringify(result.user));
    localStorage.setItem("token", JSON.stringify(result.token));

  }

  const handleClick = () => {
    setUserExsist(false)
  }

  return (
    <div>
      <div>
        <h2>Registration Page</h2>
        <label htmlFor='userName'>User Name </label>
        <input type="text" id="userName" value={name}
          onClick={handleClick} placeholder="Enter user name"
          onChange={(e) => setName(e.target.value)}
        ></input>
      </div>
      <br />
      <div>
        <label htmlFor='password'>Password </label>
        <input type="password" id="password" value={password}
          onClick={handleClick} placeholder="Enter password"
          onChange={(e) => setPassword(e.target.value)}></input>
      </div>
      <br />
      <button onClick={handledSubmit}>Register</button>

      {
        userExist ? <p>User already existe</p> : null
      }
      <div>
        <br />
        <button onClick={() => navigate("/login")}>Already Registered..? Login Here</button>
      </div>
    </div>
  )
}
