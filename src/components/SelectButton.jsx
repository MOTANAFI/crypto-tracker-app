import { styled } from '@mui/material'
import React from 'react'

function SelectButton({children, onClick, selected}) {
    const StyledSpan = styled("span")({
        border: "1px solid gold",
        borderRadius: 5,
        padding: 10,
        paddingLeft: 20,
        paddingRight: 20,
        fontFamily: "Montserrat",
        cursor: "pointer",
        backgroundColor: selected ? "gold" : "",
        color: selected ? "black" : "",
        fontWeight: selected ? 700 : 500,
        "&:hover": {
          backgroundColor: "gold",
          color: "black",
        },
        width: "22%",
    })
  return (
    <StyledSpan onClick={onClick}>
        {children}
    </StyledSpan>
  )
}

export default SelectButton