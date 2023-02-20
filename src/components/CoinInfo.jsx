import { Box, CircularProgress, styled } from '@mui/material'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {CryptoState} from "../CryptoContext"
import { HistoricalChart } from "../config/api";

import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { Line } from 'react-chartjs-2';
import SelectButton from './SelectButton';
import { chartDays } from '../config/data';

Chart.register(CategoryScale);

function CoinInfo({coin}) {
  const [historicData, setHistoricData] = useState();
  const [days, setDays] = useState(1)
  const {currency} = CryptoState()
  const [flag, setFlag] = useState(false)

  const fetchHistoricData = async () => {
    const { data } = await axios.get(HistoricalChart(coin.id, days, currency));
    setFlag(true)
    setHistoricData(data.prices);
  };

  console.log("data", historicData);

  useEffect(() => {
    fetchHistoricData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [days]);

  const Container = styled(Box)(({theme}) => ({
    width: "75%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      marginTop: 25,
      padding: 40,
      [theme.breakpoints.down("md")]: {
        width: "100%",
        marginTop: 0,
        padding: 20,
        paddingTop: 0,
      }
  }))
  return (
   <Container className="container">
    {!historicData || flag===false ? (
      <CircularProgress
      style={{color: "gold"}}
      size ={250}
      thickness={1}
      />
    ): (
      <>
      <Line
        data={{
          labels: historicData.map((coin) => {
            let date = new Date(coin[0]);
            let time =
              date.getHours() > 12
                ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                : `${date.getHours()}:${date.getMinutes()} AM`;
            return days === 1 ? time : date.toLocaleDateString();
          }),

          datasets: [
            {
              data: historicData.map((coin) => coin[1]),
              label: `Price ( Past ${days} Days ) in ${currency}`,
              borderColor: "#EEBC1D",
            },
          ],
        }}
        options={{
          elements: {
            point: {
              radius: 1,
            },
          },
        }}
      />
      <Box
      style={{
        display: "flex",
        marginTop: 20,
        justifyContent: "space-around",
        width: "100%",
      }} 
      >
      {chartDays.map((day) => (

      <SelectButton
      key={day.value}
      onClick={() => {setDays(day.value);
        setFlag(false)
      }}
      selected={day.value === days}
      >
        {day.label}
      </SelectButton>
      ))}
      </Box>
      
      </>

    )}

   </Container>
  )
}

export default CoinInfo