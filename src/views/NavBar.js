import React from 'react'
import {Link} from 'react-router-dom'

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';

import HomeIcon from '@mui/icons-material/Home';
import SchoolIcon from '@mui/icons-material/School';

function NavBar({loggedIn, handleLoginState, login}) {

    function handleLogOut(){
        if(loggedIn){
            handleLoginState()
        }
    }

  return (
    <Box sx={{flexGrow: 1}}>
        <AppBar sx={{background: "navy"}} position="static">
            <Toolbar>
                <Link to="/" style={{ textDecoration: 'none' }}>
                    <Chip
                    color='primary'
                    style={{backgroundColor:'white', color:'blue'}}
                    icon ={<SchoolIcon/>} 
                    label="College Marketplace"
                    />
                </Link>
                {/* Empty Typography Just For Spacing */}
                <Typography
                sx={{ flexGrow: 1, ml: 4}}
                >
                {loggedIn? `Welcome Back ${login.username}!` : null}
                </Typography>
                <Link to="/" style={{ textDecoration: 'none' }}>
                <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
                >
                    <HomeIcon style={{color:'white'}}/>   
                </IconButton>
                </Link> 
                {loggedIn ? 
                <Link to="/my_posts" style={{ textDecoration: 'none', color: 'white'}}>
                    <Button color="inherit">My posts</Button>
                </Link> : null}
                <Link to={loggedIn? "/" : "/login"} style={{ textDecoration: 'none' }}>
                    <Button onClick={handleLogOut} color="inherit" style={{color:'white'}}>
                    {loggedIn? "Logout" : "Login"}
                    </Button>
                </Link>
            </Toolbar>
        </AppBar>
    </Box>
  )
}

export default NavBar