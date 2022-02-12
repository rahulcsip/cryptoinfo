import { Container, Typography } from '@mui/material'
import React from 'react'
import Carousel from './Carousel'

function Banner() {
  return (
   <>
   <Container>
       <div style={{height:400 , width:"100%", backgroundColor:"#fff"}}>
       <Typography
                variant="h3"
               
                style={{ fontWeight: "bold", textAlign:"center",marginTop:"10%",marginBottom:"2%" }}
                component="div"
                sx={{ flexGrow: 1 }}
              >
                CryptoInfo
              </Typography>

              <Typography
                variant="subtitle1"
               
                style={{ fontWeight: "100", textAlign:"center",textTransform:"capitalize" }}
                component="div"
                sx={{ flexGrow: 1 }}
              >
                You can get Information related Crypto Currency
              </Typography>


<Carousel/>
       </div>
   </Container>
   </>
  )
}

export default Banner