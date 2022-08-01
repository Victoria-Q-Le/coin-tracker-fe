import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { SingleCoin } from '../config/api'
import {CoinState} from '../CoinContext'
import { makeStyles } from '@material-ui/core'
import CoinInfo from '../Components/CoinInfo'


const CoinPage = () => {
  const {id} = useParams()
  const [coin, setCoin] = useState()
  const {currency, symbol} = CoinState()

  const fetchCoin = async() => {
    const {data} = await axios.get(SingleCoin(id))
    setCoin(data)
  }
  useEffect(() => {
    fetchCoin()
  },[])
  console.log(coin);

  const useStyles = makeStyles((theme) => ({
    container: {
      display: "flex",
      [theme.breakpoints.down("md")]: {
        flexDirection: "column",
        alignItems: "center",
      },
      
    }
  }))

  const classes = useStyles()

  return (
    <div className= {classes.container}>
      {/* Side Bar */}
      <div className= {classes.sidebar}></div>
      {/* Chart */}
      <CoinInfo coin = {coin}/>
    </div>
  )
}

export default CoinPage
