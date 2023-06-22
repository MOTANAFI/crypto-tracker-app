
import { Container,  createTheme,  InputBase,  LinearProgress,  Pagination,  Paper,  Table,  TableBody,  TableCell,  TableContainer,  TableHead,  TableRow, ThemeProvider, Typography} from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CoinList } from '../config/api'
import { CryptoState } from '../CryptoContext'
import { numberWithCommas } from '../Pages/CoinPage'


export default function CoinsTable() {
  const [coins, setCoins] = useState([])
  const [loading, setLoading] = useState(false)
  const [query, setQuery] = useState("")
  const [page, setPage] = useState(1)
  const navigate = useNavigate()
  const {currency, symbol} = CryptoState()
  

  

  const fetchCoins = async () => {
    setLoading(true);
    const {data} = await axios.get(CoinList(currency))
    setCoins(data)
    setLoading(false)
  }

  useEffect(() => {
    fetchCoins()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currency])

  const darkTheme = createTheme({
    palette: {
      mode: 'dark'
    }
  })
  const handleSearch = () => {
    return coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(query) ||
        coin.symbol.toLowerCase().includes(query)
    );
  };
  const handleChange = (e) => {
    e.stopPropagation();
    setQuery(e.target.value);
  };
  
  return (
    <ThemeProvider theme={darkTheme}>
    <Container style={{textAlign: "center"}}>
      <Typography variant="h6"
      style={{margin: 18, fontFamily: "Montserrat"}}
      >
        Coin Price by Market Cap
      </Typography>
      <InputBase
          placeholder="Search for a cryptocurrency..."
          inputProps={{ 'aria-label': 'search' }}
          style={{ marginBottom: 20, width: "100%" }}
          onChange={handleChange}
        />
      <TableContainer component={Paper}>
        {loading ? 
        (<LinearProgress style={{backgroundColor:"gold"}}/>):
         (

        <Table aria-label="simple table">
          <TableHead style={{backgroundColor: "#EEBC1D"}}>
            <TableRow>
            {["Coin", "Price", "24h Change", "Market Cap"].map((head) => (
                    <TableCell
                      style={{
                        color: "black",
                        fontWeight: "700",
                        fontFamily: "Montserrat",
                      }}
                      key={head}
                      align={head === "Coin" ? "" : "right"}
                    >
                      {head}
                    </TableCell>
                  ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {handleSearch()
            .slice((page -1) * 10, (page -1) * 10 + 10)
            .map(coin => {
              const profit = coin.price_change_percentage_24h > 0;
              return (
                <TableRow onClick={() => {navigate(`/coin/${coin.id}`)}}
                sx={{
                  backgroundColor: "#16171a",
                  cursor: "pointer",
                  "&:hover": {
                    backgroundColor: "#131111",
                  },
                  fontFamily: "Montserrat",
                }}
             
                >
                  <TableCell
                  component="th"
                  scope="row"
                  style={{
                    display: "flex",
                    gap: 15
                  }}
                  >
                    <img src={coin?.image}
                    alt={coin?.name}
                    height ="50"
                    style={{marginBottom: 10}}
                    />
                    <div 
                    style={{
                      display: "flex",
                      flexDirection: "column"
                    }}
                    >
                      <span
                      style={{
                        textTransform: "uppercase",
                        fontSize: 22
                      }} 
                      >
                        {coin.symbol}
                        </span>
                        <span style={{color: "darkgrey"}}>
                          {coin.name}
                          </span>
                    </div>
                  </TableCell>
                  <TableCell align="right">
                    {symbol}{" "}
                    {coin.current_price.toFixed(2)}
                  </TableCell>
                  <TableCell
                          align="right"
                          style={{
                            color: profit > 0 ? "rgb(14, 203, 129)" : "red",
                            fontWeight: 500,
                          }}
                        >
                          {profit && "+"}
                          {coin.price_change_percentage_24h.toFixed(2)}%
                        </TableCell>
                        <TableCell align="right">
                          {symbol}{" "}
                          {numberWithCommas(coin.market_cap.toString().slice(0, -6))}M
                        </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
        
         )}
      </TableContainer>
      <Pagination
      count={(handleSearch()?.length /10).toFixed(0)}
      style={{
        padding: 20,
        width: "100%",
        display: "flex",
        justifyContent:"center"
      }}
      onChange={(_, value) => {
        setPage(value);
        window.scroll(0, 450)
      }}
      />
      
   
    </Container>
    </ThemeProvider>
  )
}
