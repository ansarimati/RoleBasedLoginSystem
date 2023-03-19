import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';


export const UserHome = () => {
  const navigate = useNavigate();
  const [localStorageData, setLocalStortageData] = useState({});

  const logoutHandler = () => {
    localStorage.clear();
    navigate("/signup")
  }

  useEffect(() => {
    let data = localStorage.getItem("user");
    data = JSON.parse(data);
    setLocalStortageData(data);
  }, [])

  return (
    <div>
      <h4>Weclome to User Home Page</h4>
      <p>Welcome {localStorageData.userName}</p>
      <button onClick={logoutHandler}>Logout</button>
    </div>
  )
}
