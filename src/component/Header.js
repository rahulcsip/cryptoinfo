import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

import {
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { CryptoState } from "../CryptoContext";
export default function Header(props) {
  const { currency, setCurrency } = CryptoState();

  const navigate = useNavigate();
  const handleChange = (event) => {
    setCurrency(event.target.value);
  };

  return (
    <>
      <Container>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
              <Typography
                variant="h6"
                onClick={() => navigate("/")}
                style={{ fontWeight: "bold", cursor: "pointer" }}
                component="div"
                sx={{ flexGrow: 1 }}
              >
                CryptoInfo
              </Typography>

              {props.info && (
                <Typography
                  variant="h6"
                  onClick={() => navigate("/")}
                  style={{ fontWeight: "bold", cursor: "pointer" }}
                  component="div"
                  sx={{ flexGrow: 1 }}
                >
                  {props.info}
                </Typography>
              )}

              <Box style={{ padding: 10 , color:"white"}} border="white" color="white" sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Currency
                  </InputLabel>
                  <Select
                  style={{borderColor:"white"}}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={currency}
                    label="Currency"
                    onChange={handleChange}
                  >
                    <MenuItem value={"INR"}>INR</MenuItem>
                    <MenuItem value={"USD"}>USD</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Toolbar>
          </AppBar>
        </Box>
      </Container>
    </>
  );
}
