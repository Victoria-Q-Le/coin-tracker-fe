import { AppBar, Container, createTheme, makeStyles, MenuItem, Select, ThemeProvider, Toolbar, Typography } from '@material-ui/core'
import React from 'react'
import { useHistory } from 'react-router-dom'
import { CoinState } from '../CoinContext'

const Header = () => {

  const useStyles = makeStyles(() => ({
    title:{
      flex: 1,
      color:"gold",
      fontFamily:"Montserrat",
      fontWeight:"bold",
      cursor:"pointer"
    }
  }))

  const classes  = useStyles()
  const history = useHistory()
  const { currency, setCurrency } = CoinState()
  // console.log(currency)
  const darkTheme = createTheme({
    palette: {
      primary: {
        main: '#fff',
      },
      type: "dark",
    }
  })

  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar color='transparent' position='static'>
        <Container>
          <Toolbar>
            <Typography 
              className={classes.title} 
              onClick={() => history.push("/")}
              variant="h6"> 
              Coin Wise 
            </Typography>

            <Select  
              variant='outlined' 
              style={{
                width: 100,
                height: 40,
                marginRight: 15,
              }}
              value = {currency}
              onChange = {(e) => setCurrency(e.target.value)}
            >
              <MenuItem value ={'USD'}>USD</MenuItem>
              <MenuItem value = {'VND'}>VND</MenuItem>
            </Select>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  )
}

export default Header
