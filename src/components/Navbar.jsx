import { AppBar, Container, createTheme, CssBaseline, MenuItem, Select, ThemeProvider, Toolbar, Typography } from '@mui/material'
import React from 'react'
import { CryptoState } from '../CryptoContext'
import { useNavigate } from 'react-router-dom'

export default function Navbar() {
  const {currency, setCurrency} = CryptoState()
  const navigate = useNavigate()

  const darkTheme = createTheme({
    palette: {
      mode: 'dark'
    }
  })
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline/>
    <AppBar color="transparent" position="static">
      <Container>
        <Toolbar>
          <Typography
          onClick={() => {navigate("/")}}
           variant="h6"
          style={{  flex: 1,
            color: "gold",
            fontFamily: "Montserrat",
            fontWeight: "bold",
            cursor: "pointer",}}
          >Coin Trucker
          </Typography>
          <Select
          variant="outlined"
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={currency}
          style={{with: 100, height: 40, marginLeft: 15}}
          onChange={(e) => setCurrency(e.target.value)}
          >
            <MenuItem value={"USD"}>USD</MenuItem>
            <MenuItem value={"GBP"}>GBP</MenuItem>

          </Select>
        </Toolbar>
      </Container>
    </AppBar>
    </ThemeProvider>
  )
}
