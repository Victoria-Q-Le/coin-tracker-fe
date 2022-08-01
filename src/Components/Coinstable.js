import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { CoinList } from '../config/api'
import { CoinState } from '../CoinContext'
import { Container, createTheme, LinearProgress, makeStyles, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, ThemeProvider, Typography } from '@material-ui/core'
import { Classnames } from 'react-alice-carousel'
import { useHistory } from 'react-router-dom'
import { numberWithCommas } from './Carousel'

const Coinstable = () => {
  const [coins, setCoins] = useState([])
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState()
  const history = useHistory()

  const {currency, symbol} = CoinState()

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

  const handleSearch = () => {
    return coins.filter((coin) => (
      coin.name.toLowerCase().includes(search) || coin.symbol.toLowerCase().includes(search)
    ))
  }

  const useStyles = makeStyles(() => ({

  }))

  const classes = useStyles()

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

        <TableContainer>
          {loading 
            ? <LinearProgress style = {{backgroundColor: "gold"}}></LinearProgress>
            : <Table>
                <TableHead style={{backgroundColor: "gold"}}>
                  <TableRow>
                    {["Coin", "Price", "24h Change", "Market Cap"].map((head) => (
                      <TableCell
                        style={{color: "black", fontWeight: "700", fontFamily:"Montserrat"}}
                        key={head}
                        align={head === "Coin" ? "" : "right"}
                      >
                        {head}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>

                <TableBody>
                  {handleSearch().map(row => {
                    const profit = row.price_change_percentage_24h > 0;
                    return (
                      <TableRow
                        onClick = {() => history.pushState(`/coins/${row.id}`)}
                        className = {classes.row}
                        key = {row.name}
                      >
                        <TableCell 
                          component='th'
                          scope='row'
                          style={{display: "flex", gap: 15}}
                        >
                          <img 
                            src={row.image}
                            alt= {row.name}
                            height="50"
                            style={{marginBottom: 10}}
                          />

                          <div style={{display:"flex", flexDirection:"column"}}>
                            <span style={{textTransform: "uppercase", fontSize:22}}>
                              {row.symbol}
                            </span>

                            <span style={{color: "darkgray"}}> {row.name} </span>
                          </div>
                        </TableCell>

                        <TableCell
                          align='right'
                          style={{color: profit > 0 ? "rgb(14,203,129)" : "red", fontWeight: 500}}
                        >
                          {profit && "+"} {row.price_change_percentage_24h.toFixed(2)}%
                        </TableCell>

                        <TableCell align='right'>
                          {symbol} {" "} {numberWithCommas(row.current_price.toFixed(2))}
                        </TableCell>
                      </TableRow>
                    )
                  })}
                  </TableBody>
              </Table>
          }
        </TableContainer>
    
      </Container>
    </ThemeProvider>
  )
}

export default Coinstable
