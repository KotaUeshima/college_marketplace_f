import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Avatar from '@mui/material/Avatar'
import TextField from '@mui/material/TextField'
import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import URL from "./URL.js";

function SignUpPage() {

    const [formObj, setFormObj] = useState({
        username: "",
        password: ""
    })
    const [errorMessage, setErrorMessage] = useState("")
    let navigate = useNavigate()
  
    function handleChange(e){
        setFormObj(obj => ({...obj, [e.target.id]: e.target.value}))
    }
  
    function handleSubmit(e){
        e.preventDefault()
        fetch(`${URL}/create_account`,{
        method: "POST",
        headers: {
            "Content-Type": 'application/json',
            "Accept": "application/json"
        },
        body: JSON.stringify(formObj)
        })
        .then(res => res.json())
        .then((data) => {
            if(data !== "Error"){
                navigate("/login")
                setErrorMessage("")
                setFormObj({
                    username: "",
                    password: ""
                })
            }
            else{
                setErrorMessage("Username Already Exists")
            }
        })
    }
  
    const paperStyle = {
      padding: 20,
      height:'55vh',
      width: 280,
      margin: "50px auto",
    }

    // position: "relative"
    // position: 'absolute',
    // top: "7.5vh",
    // left: "0",
    // right: "0",
    // bottom: "0",
    // filter: 'blur(5px)',

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
    <>
      <Box style={background}>
        <Grid>
          <Paper elevation={10} style={paperStyle}>
            <Grid align='center'>
              <Avatar style={avatarStyle}><AccountCircleIcon/></Avatar>
              <h2>Create An Account</h2>
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
              fullwidth
              required/>
              <Button
              variant="contained"
              type="submit"
              className='login__submit'
              fullWidth
              >
              Create Account
              </Button>
              {(errorMessage === "")? null : <Alert variant="outlined" severity="error">{errorMessage}</Alert>}
          </form>
          </Paper>
        </Grid>
      </Box>
  </>
  )
}

export default SignUpPage  