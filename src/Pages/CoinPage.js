import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { SingleCoin } from '../config/api'
import {CoinState} from '../CoinContext'
import { makeStyles, Typography } from '@material-ui/core'
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
      [theme.breakpoints.down("md")]: { //if the size of the screen falls below the predefined medium size then the flex direction will be column
        flexDirection: "column",
        alignItems: "center",
      }
    },
    sidebar: {
      width: "30%",
      [theme.breakpoints.down("md")]: {
        width: "100%"
      },
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      marginTop: 25,
      borderRight: "2px solid grey"
    },
    heading: {
      fontWeight: "bold",
      marginBottom: 20,
      fontFamily: "Montserrat"
    }
  }))

  const classes = useStyles()

  return (
    
    <div className= {classes.container}>

      {/* Side Bar */}
      <div className= {classes.sidebar}></div>
        <img
          src={coin?.image.large}
          alt={coin?.name}
          height="200"
          style={{ marginBottom: 20 }}
        />

        <Typography variant='h3' className={classes.heading}> {coin?.name} </Typography>

        <Typography variant='subtitle1'> 
          <div dangerouslySetInnerHTML={{__html: coin?.description.en}}></div>
          {/* {coin?.description.en} */}
        </Typography>

      {/* Chart */}
      <CoinInfo coin = {coin}/>
    </div>
  )
}

export default CoinPage
