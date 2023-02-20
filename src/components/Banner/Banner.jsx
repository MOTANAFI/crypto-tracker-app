import React from 'react'
import {Box, Container, styled, Typography} from "@mui/material"
import Carousel from './Carousel'

const StyledBanner = styled(Box)({
  backgroundImage: "url(./banner.jpg)"
})
const StyledTagLine = styled(Box)({
  display: "flex",
  height: "40%",
  flexDirection: "column",
  justifyContent: "center",
  textAlign: "center",

})

export default function Banner() {
  return (
    <StyledBanner>
      <Container
      style={{
        height: 400,
        display: "flex",
        flexDirection: "column",
        paddingTop: 25,
        justifyContent: "space-around",
      }}
      >
        <StyledTagLine>
          <Typography
          variant="h2"
          style={{
            fontWeight: "bold",
            color: "gold",
            marginBottom: 15,
            fontFamily: "Montserrat"
          }}
          >
            Coin Trucker
          </Typography>
          <Typography
          variant="subtitle1"
          style={{
            color: "darkgrey",
            textTransform: "capitalize",
            fontFamily: "Montserrat"
          }}
          >
            Get all latest info about your favourite Coins

          </Typography>

        </StyledTagLine>
        <Carousel/>
      </Container>
    </StyledBanner>
  )
}
