import React, {useState} from 'react'
import './LoginPage.css'
import {useNavigate, Link} from 'react-router-dom'

import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Avatar from '@mui/material/Avatar'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import LoginIcon from '@mui/icons-material/Login';
import { userState } from './atoms'
import { loggedIn } from './atoms'
import { useSetRecoilState } from 'recoil'

function LoginPage() {

    const setLoggedIn = useSetRecoilState(loggedIn)
    const setUserState = useSetRecoilState(userState)

    const [formObj, setFormObj] = useState({
      username: "",
      password: ""
    })

    let navigate = useNavigate()

    function handleChange(e){
        setFormObj(obj => ({...obj, [e.target.id]: e.target.value}))
    }


    function handleSubmit(e){
        e.preventDefault()
        fetch(`http://localhost:9292/users`,{
          method: "POST",
          headers: {
            "Content-Type": 'application/json',
            "Accept": "application/json"
          },
          body: JSON.stringify(formObj)
        })
        .then(res => res.json())
        .then((data) => {
          setFormObj({
            username: "",
            password: ""
          })
          if (data == null){
            alert("Incorrect login")
          }
          else{
            alert(`Welcome Back ${data.username}!`)
            navigate("/colleges")
            setUserState(data)
            setLoggedIn(true)
          }      
        })
      }

      const paperStyle = {padding: 20, height:'60vh', width: 280, margin: "auto"}
      const avatarStyle = {backgroundColor: 'green'}
      const image = 'https://a-static.besthdwallpaper.com/lofi-chill-bedroom-wallpaper-2560x1600-85077_7.jpg'
      const background = {
        minHeight: '93vh',
        backgroundImage: `url(${image})`,
        backgroundSize: 'cover',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }

  return (
    <Box style={background}>
        <Grid>
          <Paper elevation={20} style={paperStyle}>
            <Grid align='center'>
              <Avatar style={avatarStyle}><LoginIcon/></Avatar>
              <h2>Login</h2>
            </Grid>
            <form className="login__form" onSubmit={handleSubmit}>
                <TextField
                label="Username"
                id='username'
                value={formObj.username}
                onChange={handleChange}
                placeholder="Enter username"
                fullwidth
                required
                />
                <TextField
                label="Password"
                id='password'
                value={formObj.password}
                onChange={handleChange}
                placeholder="Enter password"
                type='password'
                fullwidth
                required/>
                <Button
                variant="contained"
                type="submit"
                className='login__submit'
                fullwidth
                >
                Login
                </Button>
                <div className="login__text">
                  <Typography>{"Don't have an account? "}
                    <Link to="/signup">
                      Sign Up Here
                    </Link>
                  </Typography>
                </div>    
            </form>
          </Paper>
        </Grid>
    </Box>
  )
}

export default LoginPage