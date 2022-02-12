import axios from "axios";
import React, { useEffect, useState } from "react";
import Header from "../component/Header";
import { useParams } from "react-router-dom";
import { HistoricalChart, SingleCoin } from "../config/apilist";
import { CryptoState } from "../CryptoContext";
import { Line } from "react-chartjs-2";
import { Container, Typography } from "@mui/material";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
function Info() {
  const { currency, symbol } = CryptoState();
  const [historical, setHistorical] = useState([]);
  const [days, setDays] = useState(30);
  const [coinInfo, setCoinInfo] = useState({});
  const { id } = useParams();
  useEffect(() => {
    getHistoricalData();
    coinInformation();
  }, [currency]);

  const getHistoricalData = async () => {
    const { data } = await fetch(HistoricalChart(id, days, currency, "daily"), {
      //   headers:{
      //       'Access-Control-Allow-Credentials':true
      //   }
    })
      .then((res) => res.json())
      .then((data) => setHistorical(data.prices));

    // console.log(data);
  };

  const coinInformation = async () => {
    const { data } = await fetch(SingleCoin(id), {
      // headers:{
      //     'Access-Control-Allow-Credentials':true
      // }
    })
      .then((res) => res.json())
      .then((data) => setCoinInfo(data));
    // setCoinInfo(data);
  };

  console.log("----->>>", coinInfo?.image?.large);
  return (
    <>
      <Header info={id} />

      <Container style={{ paddingBottom: "5%" }}>
        <div style={{ height: "30%" }}>
          <Line
            data={{
              labels: historical.map((coin) => {
                let date = new Date(coin[0]);
                let time =
                  date.getHours() > 12
                    ? `${date.getHours() - 12} : ${date.getMinutes()} PM`
                    : `${date.getHours()} : ${date.getMinutes()} AM`;
                return days === 1 ? time : date.toLocaleDateString();
              }),
              datasets: [
                {
                  data: historical.map((coin) => coin[1]),
                  label: `Price past days`,
                  backgroundColor: "red",
                  borderColor: "rgb(75, 192, 192)",
                },
              ],
            }}
          />
        </div>

        <div style={{ display: "flex", marginTop: 50 }}>
          <img
            src={
              coinInfo
                ? coinInfo?.image?.large
                : "https://www.kindpng.com/picc/m/451-4517876_default-profile-hd-png-download.png"
            }
            style={{ borderRadius: 200 }}
            height="100"
            width="100"
            alt={coinInfo?.name}
          />
          <div
            style={{ display: "flex", flexDirection: "column", marginLeft: 10 }}
          >
            <Typography
              variant="h5"
              // onClick={() => navigate("/")}
              style={{ fontWeight: "bold", cursor: "pointer" }}
              component="div"
              sx={{ flexGrow: 1 }}
            >
              {coinInfo?.symbol}
            </Typography>
            <Typography
              variant="h3"
              // onClick={() => navigate("/")}
              style={{ fontWeight: "bold", cursor: "pointer" }}
              component="div"
              sx={{ flexGrow: 1 }}
            >
              {coinInfo?.name}
            </Typography>
            <Typography
              variant="subtitle2"
              // onClick={() => navigate("/")}
              style={{
                fontWeight: "100",
                cursor: "pointer",
                textAlign: "justify",
              }}
              component="div"
              sx={{ flexGrow: 1 }}
            >
              {coinInfo ? coinInfo?.description?.en : null}
            </Typography>
          </div>
        </div>

        <div style={{display:"flex",flexDirection:"column"}}>
          <Typography
            variant="h5"
            // onClick={() => navigate("/")}
            style={{
              fontWeight: "100",
              cursor: "pointer",
              textAlign: "justify",
            }}
            component="div"
            sx={{ flexGrow: 1 }}
          >
            Details
          </Typography>

          <span style={{fontSize:16}} >
           hashing_algorithm : {coinInfo.hashing_algorithm}
           
        </span>
          <span style={{fontSize:16}} >
           Market Cap Rank : {coinInfo.market_cap_rank}
           
        </span>
          <span style={{fontSize:16}} >
           Market price_change_24h : {coinInfo.market_data?.price_change_24h}
           
        </span>
          <span style={{fontSize:16}} >
          price_change_percentage_24h : {coinInfo.market_data?.price_change_percentage_24h}
           
        </span>
          <span style={{fontSize:16}} >
          market_cap_change_percentage_24h : {coinInfo.market_data?.market_cap_change_percentage_24h}
           
        </span>
        </div>
      </Container>
    </>
  );
}

export default Info;
