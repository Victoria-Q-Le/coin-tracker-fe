import { makeStyles } from '@material-ui/core'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { TrendingCoins } from '../config/api'
import { CoinState } from '../CoinContext'

const useStyles = makeStyles((theme) => ({
    carousel: {
        height: "50%",
        display: "flex",
        alignItems: "center",
    }
}))

const Carousel = () => {

  const classes = useStyles()

  const [trending, setTrending] = useState([])

  const {currency} = CoinState()

  const fetchTrendingCoins = async() => {
    const {data} = await axios.get(TrendingCoins(currency))
    setTrending(data)
  }

  console.log(trending);

  useEffect(() => {
    fetchTrendingCoins()
  },[currency])

  

  return (
    <div className= {classes.carousel}>
      Carousel
    </div>
  )
}

export default Carousel
