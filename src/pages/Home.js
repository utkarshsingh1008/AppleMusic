import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import homeImage from '../assets/homeImage.webp' // Import your CSS file for styling
import three from '../assets/three.svg'
import FloatingAD from "./FloatingAD";
import Footer from "./Footer";
import AboveFooter from "./AboveFooter";
const StartPage = () => {
  const navigate = useNavigate();
  return (
    <div className="home-container" >
      <div className="content-container">
        <img src={three} alt="" />
       
        <div className="text-container">
          <h1 className="main-title">Discover new music every day.</h1>
        </div>
        <div className="description-container">
          <p className="description">
            Get playlists and albums inspired by the artists and genres you’re<br/>
            listening to. 1 month free, then $10.99/month.
          </p>
        </div>
        <button
          className="btn-try-free"
          onClick={() => navigate("/subscription")}
        >
          Try it for free
        </button>
        <br/>
        <div>
      <Link to="/radio" className="learn-more-link">
        Learn More &gt;
      </Link>
    </div>
      </div>
      <div className="image-container">
        <img
          src={homeImage}
          alt=""
          className="home-image"
        />
      </div>
      <FloatingAD />
      <div>
    
      <Footer/></div>
    </div>
  );
};

export default StartPage;
