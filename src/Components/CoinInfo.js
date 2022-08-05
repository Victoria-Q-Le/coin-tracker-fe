import { CircularProgress, createTheme, makeStyles, ThemeProvider } from '@material-ui/core';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Line, Chart } from 'react-chartjs-2';
import { CoinState } from "../CoinContext";
import { HistoricalChart } from "../config/api";
import { Chart as ChartJS } from 'chart.js/auto'

const CoinInfo = ({coin}) => {
  const [historicalData, setHistoricalData] = useState()
  const [days, setDays] = useState(1)
  const {currency} = CoinState()

  const fetchHistoricalData = async() => {
    const {data} = await axios.get(HistoricalChart(coin.id, days, currency))
    setHistoricalData(data.prices)
  }
  console.log( historicalData);

  useEffect(() => {
    fetchHistoricalData()
  }, [currency, days])

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff"
      },
      type: "dark"
    }
  })

  const useStyles = makeStyles((theme) => ({
    container: {
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
        paddingTop: 0
      }
    }
  }))

  const classes = useStyles()

  return (
    <ThemeProvider theme={darkTheme}>
      <div className={classes.container}>
        {!historicalData
          ? (<CircularProgress style={{color:"gold"}} size={25} thickness={1} />)
          : (<>
              <Line 
                data={{
                  labels: historicalData.map((coin) => {
                    let date = new Date(coin[0])
                    let time = 
                    date.getHours() > 12 
                      ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                      : `${date.getHours()}:${date.getMinutes()} AM`
                  return days === 1 ? time : date.toLocaleDateString()
                  }),
                  datasets: [{ data: historicalData.map((coin) => coin[1]),
                  label: `Price ( Past ${days} Days) in ${currency}`}]
                }}
              />
            </>)
        }
      </div>
    </ThemeProvider>
  )
}

export default CoinInfo
