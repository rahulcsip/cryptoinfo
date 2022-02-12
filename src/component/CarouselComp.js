import { Link } from "react-router-dom";
import axios, { Axios } from "axios";
import React, { useEffect, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import { TrendingCoins } from "../config/apilist";
import { CryptoState } from "../CryptoContext";
import '../App.css'
const CarouselComp = (props) => {


  const responsive = {
    0: {
      items: 2,
    },
    512: {
      items: 3,
    },
    900:{
        items:5
    }
  };



  return (
    <>
     <div style={{marginTop:30}}>
     <AliceCarousel
        mouseTracking
        infinite
        autoPlayInterval={1000}
        animationDuration={1500}
        disableDotsControls
        disableButtonsControls
        autoPlay
        responsive={props.responsive}
        items={props.items}
      />

     </div>
    
    </>
  );
};

export default CarouselComp;
