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
    },
    description: {
      width: "100%",
      fontFamily: "Montserrat",
      padding:25,
      paddingBottom: 15,
      paddingTop: 0,
      textAlign: "justify"
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

        <Typography variant='subtitle1' className={classes.description}> 
          <div dangerouslySetInnerHTML={{__html: coin?.description.en}}></div>
          {/* {coin?.description.en} */}
        </Typography>

        <div className={classes.marketData}>
          <span style={{display: 'flex'}}>
            <Typography variant='h5' className={classes.heading}>Rank: </Typography>
            &nbsp; &nbsp;
            <Typography
              variant='h5'
              style={{fontFamily: "Montserrat"}}
            >
              {coin?.market_cap_rank}
            </Typography>
          </span>

          <span style={{display: 'flex'}}>
            <Typography variant='h5' className={classes.heading}>Current Price: </Typography>
            &nbsp; &nbsp;
            <Typography
              variant='h5'
              style={{fontFamily: "Montserrat"}}
            >
             {symbol} {" "}
            </Typography>
          </span>

          {/* <span style={{display: 'flex'}}>
            <Typography variant='h5' className={classes.heading}>Current Price: </Typography>
            &nbsp; &nbsp;
            <Typography
              variant='h5'
              style={{fontFamily: "Montserrat"}}
            >
              {symbol} {" "} 
            </Typography>
          </span> */}
        </div>

      {/* Chart */}
      <CoinInfo coin = {coin}/>
    </div>
  )
}

export default CoinPage
