import React, { createContext, useContext, useEffect, useState } from 'react'

const Coin = createContext()

const CoinContext = ({children}) => {
  
  return (
   <Coin.Provider>
        {children}
   </Coin.Provider>
  )
}
export default CoinContext

export const CoinState = () => {
    const [currency, setCurrency] = useState("USD")
    const [symbol, setSymbol] = useState("$")

    useEffect(() => {
        if (currency === "USD") setSymbol("$")
        else if (currency === "VND") setSymbol("đ")
    },[currency])
    
    return useContext(Coin)
}
