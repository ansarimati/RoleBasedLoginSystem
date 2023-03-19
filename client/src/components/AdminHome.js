import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

export const AdminHome = () => {
  const navigate = useNavigate();
  const [localStorageData, setLocalStortageData] = useState({});

  const logoutHandler = () => {
    localStorage.clear();
    navigate("/signup")
  }

  useEffect(() => {
    let data = localStorage.getItem("user")
    data = JSON.parse(data);
    setLocalStortageData(data);
    // console.log(localStorageData);
  }, [])

  return (
    <div>
      <h4>Welcome To Admin Home Page</h4>
      <button onClick={logoutHandler}>Logout</button>
      {
        <p>Welcome {localStorageData.userName}</p>
      }
    </div>
  )
}
