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
    },
    carouselItem: {
      display: "flex",
      flexDirection: "column",
      alignItems:"center",
      cursor: "pointer",
      textTransform: "uppercase",
      color: "white"
    }
}))

export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",")
}
// For detail explanation, visit https://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript

const Carousel = () => {

  const classes = useStyles()

  const [trending, setTrending] = useState([])

  const {currency, symbol} = CoinState()

  const fetchTrendingCoins = async() => {
    const {data} = await axios.get(TrendingCoins(currency))
    setTrending(data)
  }

  console.log(trending);

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

    let profit = coin.price_change_percentage_24h >= 0
    // calculating the profit, if it is more than zero meaning the there is profit (true)

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

            <span>
              {coin?.symbol} &nbsp; 

              <span 
                style={{color: profit > 0 ? "rgb(14,203,129)" : "red", fontWeight: 500}}
                >
                {profit && "+"} {coin?.price_change_percentage_24h?.toFixed(2) + "%"}
              </span>
              {/* if the profit is true, display profit and the + sign along with percentage change */}
            </span>

            <span style = {{fontSize: 22, fontWeight: 500}}>
              {symbol} {numberWithCommas(coin?.current_price.toFixed(2))}
            </span>

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
        disableButtonsControls
        responsive={responsive} //how many items you want to see on the screen at one time 
        autoPlay
        items={items}
        />
    </div>
  )
}

export default Carousel
