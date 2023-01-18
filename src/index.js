import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
// import { Router } from "react-router-dom";
import { HashRouter as Router, Route } from "react-router-dom";
// u teto verze Routeru fungovalo vyuziti BrowserRouter pripadne asi HashRouter
// npm verze 8.19.2, node verze v18.12.1

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // {/* // zpusobuje, ze se renderuje 2x */}
  // <React.StrictMode>
  <Router>
    {/* novejsi verze Routeru vyzaduje, aby byla cela aplikace obalena tagem Router 10:52 */}
    <App />
    {/* spusteni aplikace exportovane z App.js */}
  </Router>
  // {/* </React.StrictMode> */}
);
