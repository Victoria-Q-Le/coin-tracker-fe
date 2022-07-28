import { AppBar, Container, makeStyles, MenuItem, Select, Toolbar, Typography } from '@material-ui/core'
import React from 'react'
import { useHistory } from 'react-router-dom'

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

  return (
    <AppBar color='transparent' position='static'>
      <Container>
        <Toolbar>
          <Typography 
            className={classes.title} 
            onClick={() => history.push("/")}> 
            Coin Wise 
          </Typography>

          <Select variant='outlined' style={{
            width: 100,
            height: 40,
            marginLeft: 15,
          }}>
            <MenuItem value ={'USD'}>USD</MenuItem>
            <MenuItem value ={'EUR'}>EUR</MenuItem>
            <MenuItem value = {'VND'}>VND</MenuItem>
          </Select>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default Header
