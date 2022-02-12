import { Link } from "react-router-dom";
import axios, { Axios } from "axios";
import React, { useEffect, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import { TrendingCoins } from "../config/apilist";
import { CryptoState } from "../CryptoContext";
import '../App.css'
const Carousel = () => {
  const [trending, setTrending] = useState([]);

  const { currency,symbol } = CryptoState();
  useEffect(() => {
    fetchTrendingCoin();
    console.log(trending);
  }, [currency]);

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

  const items = trending.map((item, index) => {
    return (
        <Link style={{ margin:20,display:"flex",justifyContent:"center",flexDirection:"column",alignItems:"center" }} to={`/cryptoinfo/info/${item.id}`}>
        <img
          src={item?.image}
          alt={item?.name}
          height="80"
          style={{ margin: 10 }}
        />
        
        <span style={{color: item.price_change_percentage_24h >=0 ?  "green" :"red"}}>
            
        {item?.name} { item.price_change_percentage_24h ?.toFixed(2)}%
        </span>
        <span style={{color: item.price_change_percentage_24h >=0 ?  "green" :"red"}}>
            {symbol}
        {item?.current_price.toFixed(2)}
        </span>
      </Link>
    );
  });

  const fetchTrendingCoin = async () => {
    const { data } = await axios.get(TrendingCoins(currency));

    setTrending(data);
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
        responsive={responsive}
        items={items}
      />

     </div>
    
    </>
  );
};

export default Carousel;
