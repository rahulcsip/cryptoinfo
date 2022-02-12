import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Typography, TextField } from "@mui/material";
import { CryptoState } from "../CryptoContext";
import { CoinList } from "../config/apilist";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Pagination from '@mui/material/Pagination';
import {useNavigate} from 'react-router-dom'
const CoinTabel = () => {
  const [coin, setCoin] = useState([]);
  const [search, setsearch] = useState("");
  const { currency,symbol } = CryptoState();
const navigate = useNavigate()
  const columns = [
    { id: "name", label: "Coin", minWidth: 170 },
    { id: "code", label: "Price", minWidth: 100 },
    {
      id: "population",
      label: "24 Change",
      minWidth: 170,
      align: "right",
      format: (value) => value.toLocaleString("en-US"),
    },
    {
      id: "size",
      label: "Market Cap",
      minWidth: 170,
      align: "right",
      format: (value) => value.toLocaleString("en-US"),
    },
  ];

  function createData(name, code, population, size) {
    const density = population / size;
    return { name, code, population, size, density };
  }

  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [page, setPage] = React.useState(1);

  useEffect(() => {
    fetchCoinList();
  }, [currency]);

  const fetchCoinList = async () => {
    const { data } = await axios.get(CoinList(currency));
    setCoin(data);
  };

  const filterResult = () => {
    coin.filter(
      (coin) =>
        coin.name.toLowercase().includes(search) ||
        coin.symbol.toLowercase().includes(search)
    );
  };

  return (
    <>
      <Container>
        <Typography
          variant="h4"
          style={{
            fontWeight: "bold",
            textAlign: "center",
            marginBottom: "2%",
          }}
          component="div"
          sx={{ flexGrow: 1 }}
        >
          Crypto Currency Price by Coinmarketcap
        </Typography>

        <TextField
          style={{ width: "100%", backgroundColor: "" }}
          value={search}
          variant="outlined"
          label={"Seach Crypto Currency"}
          onChange={(e) => setsearch(e.target.value)}
        />

        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <TableContainer >
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {coin.slice((page-1)*10, (page -1)*10 +10 ).map((row) => {
                  const profit = row?.price_change_percentage_24h >= 0;

                  return (
                    <TableRow style={{}}>
                      <TableCell
                       onClick={() => navigate(`/info/${row?.id}`)}
                      align="center"
                        style={{ display: "flex", gap: 15 }}
                        component="th"
                        scope="row"
                        label="Market Cap"
                      >
                        <img src={row?.image} height="50" width="50" />
                        <div
                          style={{ display: "flex", flexDirection: "column" }}
                        >
                          <span>{row?.symbol}</span>
                          <span>{row?.name}</span>
                        </div>
                      </TableCell>
                      <TableCell align="center">
                        <span>₹{row?.current_price.toFixed(2)}</span>
                      </TableCell>
                      <TableCell align="center">
                        <span>{row?.current_price}</span>
                      </TableCell>
                      <TableCell align="center">
                        <span>{row?.market_cap}</span>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>

          <Pagination
          style={{marginTop:20}}
          onChange={(_,value)=>{
              setPage(value)
              window.scroll(0,450)
          }}
          count={coin.length/10} variant="outlined" shape="rounded" />
        </Paper>
      </Container>
    </>
  );
};

export default CoinTabel;
