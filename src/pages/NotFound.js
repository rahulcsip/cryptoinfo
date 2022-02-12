import React from "react";
import { Link, useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <h1> NotFound</h1>

      <button onClick={() => navigate("/cryptoinfo")}>Go BAck To Home</button>
    </div>
  );
};

export default NotFound;
