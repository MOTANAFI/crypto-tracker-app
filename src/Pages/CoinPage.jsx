
import { Box, LinearProgress, styled, Typography } from "@mui/material"
import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { SingleCoin } from "../config/api"
import {CryptoState} from "../CryptoContext"
import parse from "html-react-parser"
import CoinInfo from "../components/CoinInfo"


export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function CoinPage() {
  const { id } = useParams()
  const [coin, setCoin] = useState()
const {currency, symbol} = CryptoState()
  const fetchCoin = async () => {
  const { data } = await axios.get(SingleCoin(id))
  console.log(data)
  setCoin(data)
}
useEffect(() => {
  fetchCoin()
  //eslint-disable-next-line
},[])



const StyledContainer = styled(Box)(({theme}) => ({
  display: "flex",
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
    alignItems: "center"
  }
}))
const Sidebar = styled(Box)(({ theme }) => ({
  width: "30%",
  [theme.breakpoints.down("md")]: {
    width: "100%",
  },
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginTop: 25,
  borderRight: "2px solid grey",
}))
const Heading = styled(Typography)({
      fontWeight: "bold",
      marginBottom: 15,
      fontFamily: "Montserrat",
})

const Description = styled(Typography)({
  width: "100%",
  fontFamily: "Montserrat",
  padding: 25,
  paddingBottom: 15,
  paddingTop: 0,
  textAlign: "justify",
})
const MarketData = styled(Box)(({ theme }) => ({
  alignSelf: "start",
  padding: 25,
  paddingTop: 10,
  width: "100%",
  [theme.breakpoints.down("md")]: {
    display: "flex",
    justifyContent: "space-around",
  },
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    alignItems: "center",
  },
  [theme.breakpoints.down("xs")]: {
    alignItems: "start",
  },
}))

  if(!coin) return <LinearProgress style={{backgroundColor: "gold"}}/>
  return (
    <StyledContainer>
      <Sidebar>
     <img
     src={coin?.image.large}
     alt={coin?.name}
     height="200"
     style={{marginBottom: 20}}
     />
     <Heading variant="h3">
      {coin?.name}
     </Heading>
     <Description variant="subtitle1">
     {parse(coin?.description.en.split(". ")[0])}.
     </Description>
     <MarketData className="marketData">
      <span style={{display: "flex"}}>
        <Heading variant="h5" className="heading">Rank:</Heading>
        &nbsp; &nbsp;
        <Typography variant="h5"
        style={{
          fontFamily: "Montserrat"
        }}
        >
          {numberWithCommas(coin?.market_cap_rank)}
        </Typography>
      </span>
      <span style={{display: "flex"}}>
        <Heading variant="h5" className="heading">
          Current Price:
        </Heading>
        &nbsp; &nbsp;
        <Typography
        variant="h5"
        style={{
          fontFamily: "Montserrat"
        }}
        >
     {symbol}{" "}
              {numberWithCommas(
                coin?.market_data.current_price[currency.toLowerCase()]
                 
              )}
        </Typography>
      </span>
       <span style={{ display: "flex" }}>
            <Heading variant="h5">
              Market Cap:
            </Heading>
            &nbsp; &nbsp;
            <Typography
              variant="h5"
              style={{
                fontFamily: "Montserrat",
              }}
            >
              {symbol}{" "}
              {numberWithCommas(
                coin?.market_data.market_cap[currency.toLowerCase()]
                  .toString()
                  .slice(0, -6)
              )}
              M
            </Typography>
          </span>
     </MarketData>
      </Sidebar>
      <CoinInfo coin={coin}/>
      </StyledContainer>
   
  )
}

export default CoinPage