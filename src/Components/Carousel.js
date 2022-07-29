import { makeStyles } from '@material-ui/core'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { TrendingCoins } from '../config/api'
import { CoinState } from '../CoinContext'
import AliceCarousel from 'react-alice-carousel'
import { Link } from 'react-router-dom'

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

//   console.log(trending);

  useEffect(() => {  //fetching everytime the currency changes
    fetchTrendingCoins()
  },[currency])

  const responsive = {
    0:{
        items: 2,
    },
    512: {
        items: 4
    },
  }

  const items = trending.map((coin) => {
    return (
        <Link
            className={classes.carouselItem}
            to = {`/coins/${coin.id}`}
        >
            <img
                src= {coin?.image}
                alt= {coin.name}
                height= "80"
                style= {{marginBottom: 10}}
            />
        </Link>
    )
  })

  

  return (
    <div className= {classes.carousel}>
      <AliceCarousel
        mouseTracking
        infinite
        autoPlayInterval={1000} 
        animationDuration={1500}
        disableDotsControls
        responsive={responsive} //how many items you want to see on the screen at one time 
        autoPlay
        items={items}
        />
    </div>
  )
}

export default Carousel
