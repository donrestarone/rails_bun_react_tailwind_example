import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../components/home";

// use rails authenticity token to verify requests came from the frontend and not a 3rd party
const csrf = document.querySelector("meta[name='csrf-token']").getAttribute("content");

export default (
  <Router>
    <Routes>
      <Route path="/" element={<Home csrf={csrf}/>} />
    </Routes>
  </Router>
);