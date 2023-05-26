import React, { useEffect } from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import {fetchGreeting} from '../utils/smartContract'
import AOS from "aos";
import './Landing.css'
import "aos/dist/aos.css"; // You can also use <link> for styles
// ..
AOS.init({
  duration: 2000,
});

function LandingScreen() {
  return (
    <div className="row landing">
      <div className="col-md-12 text-center">
        <h2 data-aos="zoom-in" style={{ color: "white", fontSize: "100px" }}>
          HOTEL BOOKING
        </h2>
        <h1 data-aos="zoom-out" style={{ color: "white" }}>
          There is only one boss. The Guest.
        </h1>
        <Link to="/Login">
          <button className="btn btn-primary landingBtn">Get Started</button>
        </Link>
      </div>
    </div>
  );
}

export default LandingScreen;
