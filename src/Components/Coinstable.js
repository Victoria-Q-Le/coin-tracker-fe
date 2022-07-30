import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { CoinList } from '../config/api'
import { CoinState } from '../CoinContext'
import { Container, createTheme, TextField, ThemeProvider, Typography } from '@material-ui/core'

const Coinstable = () => {
  const [coins, setCoins] = useState([])
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState()
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
          Cryptocurrency Prices by Market Cap
        </Typography>

        <TextField
          label =" Search For a Crypto Currency..." 
          variant='outlined'
          style={{marginBottom: 20, width: "100%"}}
          onChange={(e) => setSearch(e.target.value)}
        />
    
      </Container>
    </ThemeProvider>
  )
}

export default Coinstable
