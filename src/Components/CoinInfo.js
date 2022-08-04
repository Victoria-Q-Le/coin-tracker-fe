import React, { useState } from 'react'
import { CoinState } from '../CoinContext'

const CoinInfo = () => {
  const [historicalData, setHistoricalData] = useState()
  const [days, setDays] = useState(1)
  const { currency } = CoinState()
  return (
    <div>
      Coin Info
    </div>
  )
}

export default CoinInfo
