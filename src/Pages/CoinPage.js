import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { SingleCoin } from '../config/api'
import {CoinState} from '../CoinContext'


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
  
  return (
    <div>
      Coin Page 
    </div>
  )
}

export default CoinPage
