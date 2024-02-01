import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Spinner = ({path="login"}) => {
    const[count, setCount] = useState(3);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(()=>{
        const interval = setInterval(()=>{
            setCount((prevValue)=>--prevValue);
        }, 1000);
        count ===0 && 
        navigate(`/${path}`, {
            state:location.pathname,
        });
        return() =>clearInterval(interval);
    },[count, navigate, location, path]);
  return (
    <>
      <div
        className="flex flex-column justify-center content-center align-item-center m-3"
        style={{ height: "100vh" }}
      >
        <h1 >redirecting to you in {count} second </h1>
        <div >
          <span >Loading...</span>
        </div>
      </div>
    </>
  );
};

export default Spinner;
