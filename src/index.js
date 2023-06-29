import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import NavBar from "./components/NavBar";
import Login from "./components/Login";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <div>

    <NavBar/>
    {/* <LoginComponent></LoginComponent> */}
    {/* <LoginChatGpt></LoginChatGpt> */}
    <App></App>
 
  </div>
    
);

