
import React, { useEffect, useState } from 'react'
import { CryptoState } from '../../CryptoContext'
import {TrendingCoins} from "../../config/api"
import axios from "axios"
import { Link } from 'react-router-dom'
import AliceCarousel from 'react-alice-carousel'

export default function Carousel() {
  const [trending, setTrending] = useState([])
  const {currency, symbol} = CryptoState()
  const getTrendingCoins = async () => {
    const { data } =  await axios.get(TrendingCoins(currency))
    setTrending(data)

  }

  useEffect(() => {
   getTrendingCoins()
  }, [currency])
  

  const items = trending.map(coin => {
    let profit = coin?.price_change_percentage_24h >= 0
    return (
      <Link style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        cursor: "pointer",
        textTransform: "uppercase",
        color: "white",
      }}>
      <img src={coin?.image} alt={coin.name} height="80"
      style={{marginBottom:10}} />
      <span style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
        {coin?.symbol} &nbsp; 
        <span style={{color: profit > 0 ? "rgb(14, 203, 129)" : "red",
        fontWeight: 500
}}
>
  {profit && "+"} {coin?.price_change_percentage_24h?.toFixed(2)}%
</span>
<span style={{fontSize: 22, fontWeight: 500}}>
  {symbol} {coin?.current_price.toFixed(2)}

</span>
      </span>
      </Link>

    )
  })
  const responsive = {
    0: {
      items: 2,
    },
    512: {
      items: 4,
    },
  };
  return (
    <div style={{
      height: "50%",
      display: "flex",
      alignItems: "center",
    }}>
      <AliceCarousel
      mouseTracking
      infinite
      autoPlayInterval={1000}
      animationDuration={1500}
      disableDotsControls
      disableButtonsControls
      responsive={responsive}
      items={items}
      autoPlay
      /></div>
  )
}
