import React, {useState, useEffect} from 'react'

import Box from '@mui/material/Box'
import Grow from '@mui/material/Grow';
import Button from '@mui/material/Button';

const image = 'https://www.designyourway.net/blog/wp-content/uploads/2019/02/aesthetic-wallpaper-1.jpg'

const rootStyle = {
    minHeight: '100vh',
    backgroundImage: `url(${image})`,
    backgroundSize: 'cover',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
}
        
const textStyle = {
    color: "white",
    fontFamily: 'Nunito',
    fontSize: '3rem'
}

const collegeColor = {
    color: '#E27D60'
}

const buttonStyle = {
    backgroundcolor: "red",
    fontFamily: 'Nunito',
    color: 'white'
}

function LandingPage() {
    const [checked, setChecked] = useState(false);

    useEffect(() => {
        setChecked(true)
    }, [])

  return (
    <Box style={rootStyle}>
      <Grow
      in={checked}
      style={{ transformOrigin: '0 0 0' }}
      {...(checked ? { timeout: 2000 } : {})}
      > 
        <div>
            <h1 style={textStyle}>Welcome to <br /><span style={collegeColor}>College</span> Marketplace</h1>
            <Button style={buttonStyle} variant="text">Continue As Guest</Button>
            <Button style={buttonStyle}>Login</Button>
        </div>
      </Grow>
    </Box>
  )
}

export default LandingPage