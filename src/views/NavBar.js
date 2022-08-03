import React from 'react'
import {Link, useLocation} from 'react-router-dom'

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';

import HomeIcon from '@mui/icons-material/Home';
import SchoolIcon from '@mui/icons-material/School';

function NavBar({loggedIn, handleLoginState, login}) {

    function handleLogOut(){
        if(loggedIn){
            handleLoginState()
        }
    }

    const appStyle = {background: 'transparent', boxShadow: 'none'}
    const linkStyle = {textDecoration: 'none', color: '#E27D60'}

    const location = useLocation()

  return (
    <>
        {(location.pathname == "/")? null :
        <Box sx={{flexGrow: 1}}>
            <AppBar style={appStyle} elevation={0} position="static">
                <Toolbar>
                    <Link to="/colleges" style={{ textDecoration: 'none' }}>
                        <Chip
                        color='primary'
                        style={{backgroundColor:'#6ce1f2', color:'#E27D60'}}
                        icon ={<SchoolIcon/>} 
                        label="College Marketplace"
                        />
                    </Link>
                    <Typography
                    sx={{ flexGrow: 1, ml: 4}}
                    style={{color:'#E27D60'}}
                    >
                    {loggedIn? `Welcome Back ${login.username}!` : null}
                    </Typography>
                    <Link to="/colleges" style={linkStyle}>
                        <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                        >
                            <HomeIcon/>   
                        </IconButton>
                    </Link> 
                    {loggedIn ? 
                    <Link to="/my_posts" style={linkStyle}>
                        <Button color="inherit">My posts</Button>
                    </Link> : null}
                    <Link to={loggedIn? "/colleges" : "/login"} style={linkStyle}>
                        <Button onClick={handleLogOut} color="inherit">
                        {loggedIn? "Logout" : "Login"}
                        </Button>
                    </Link>
                </Toolbar>
            </AppBar>
            <Divider />
        </Box>}
    </>
  )
}

export default NavBar