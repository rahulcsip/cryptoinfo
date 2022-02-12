import React, { useEffect, useState } from "react";
import Banner from "../component/Banner";
import Header from "../component/Header";
import Carousel from "../component/Carousel";
import CoinTabel from "../component/CoinTabel";
import CarouselComp from "../component/CarouselComp";
import axios from "axios";
import { CategotiesList, CategrogiesListData } from "../config/apilist";
import { DataArrayOutlined } from "@mui/icons-material";
import { Typography } from "@mui/material";

function Home() {
  const [catData, setCatData] = useState([]);
  const [catDataMarket, setCatDataMarket] = useState([]);

  const getCateogriesList = async () => {
    const { data } = await axios.get(CategotiesList());
    setCatData(data);
  };
  const getCateogriesListWithData = async () => {
    const { data } = await axios.get(
      CategrogiesListData("market_cap_change_24h_asc")
    );
    setCatDataMarket(data);
  };

  useEffect(() => {
    getCateogriesList();
    getCateogriesListWithData();
  });

  const responsive = {
    0: {
      items: 2,
    },
    512: {
      items: 3,
    },
    900: {
      items: 5,
    },
  };

  const items = catData.map((item, index) => {
    return (
      <div
        style={{
          margin: 20,
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <span style={{}}>{item?.name}</span>
      </div>
    );
  });
  const catWithData = catDataMarket.map((item, index) => {
    return (
      <div
        style={{
          margin: 20,
          display: "flex",
          // justifyContent: "center",
          flexDirection: "column",
          // alignItems: "center",
        }}
      >
        <h5 style={{ textAlign: "center" }}>{item?.name}</h5>
        <h6 style={{}}>{item ? item.market_cap : "null"}</h6>
        <h6 style={{}}>{item ? item.market_cap_change_24h : "null"}</h6>
        <Typography
          variant="subtitle3"
          // onClick={() => navigate("/")}
          style={{
            fontWeight: "100",
            cursor: "pointer",
            textAlign: "justify",
          }}
          component="div"
          sx={{ flexGrow: 1 }}
        >
          {item ? item.content : ""}
        </Typography>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <h5>Top 3 Coins</h5>
          <div>
            {item?.top_3_coins.map((image) => {
              return (
                <img style={{ margin: 5 }} src={image} height="35" width="35" />
              );
            })}
          </div>
        </div>
      </div>
    );
  });

  return (
    <>
      <Header />
      <Banner />
      <CoinTabel />
      <h4 style={{ textAlign: "center", marginBlock: 20 }}>
        {"Categrogies".toUpperCase()}{" "}
      </h4>
      <CarouselComp items={items} responsive={responsive} />
      <CarouselComp items={catWithData} responsive={responsive} />
    </>
  );
}

export default Home;
