import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { CoinList } from '../config/api'
import { CoinState } from '../CoinContext'
import { Container, createTheme, ThemeProvider, Typography } from '@material-ui/core'

const Coinstable = () => {
  const [coins, setCoins] = useState([])
  const [loading, setLoading] = useState(false)
  const {currency} = CoinState()

  const fetchCoins = async() => {
    setLoading(true)
    const {data} = await axios.get(CoinList(currency)); //destructuring data 
    setCoins(data)
    setLoading(false)
  }
  useEffect(() => {
    fetchCoins()
  },[currency])

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff"
      },
      type: "dark",
    }
  })

  return (
    <ThemeProvider theme={darkTheme}>
      <Container style={{textAlign: "center"}}>
        <Typography
          variant='h4'
          style = {{margin: 18, fontFamily: "Montserrat"}}
        >
          
        </Typography>
      </Container>
    </ThemeProvider>
  )
}

export default Coinstable
