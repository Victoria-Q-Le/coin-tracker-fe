import { makeStyles } from '@material-ui/styles'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { CoinState } from '../CoinContext'
import CoinInfo from '../Components/CoinInfo'
import { SingleCoin } from '../config/api'

const CoinPage = () => {
  const {id} = useParams()
  const [coin, setCoin] = useState()
  const {currency, symbol} = CoinState()

  const fetchCoin = async() => {
    const {data} = await axios.get(SingleCoin(id))
    setCoin(data)
  }
  console.log(coin);

  useEffect(() => {
    fetchCoin()
  }, [currency])

  const useStyles = makeStyles({

  })

  const classes = useStyles()
  return (
    <div className={classes.container}>
      {/* Side Bar */}
      <div className= {classes.sidebar}>

      </div>

      {/* Chart */}
      <CoinInfo />
    </div>
  )
}

export default CoinPage
