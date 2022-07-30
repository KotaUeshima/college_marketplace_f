import React, {useState} from 'react'
import './LoginPage.css'
import {useNavigate} from 'react-router-dom'

import FormControl  from '@mui/material/FormControl'
import InputLabel from "@mui/material/InputLabel"
import FilledInput from '@mui/material/FilledInput'
import Button from '@mui/material/Button'

function LoginPage({loggingIn}) {

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
            navigate("/")
            loggingIn(data)
          }      
        })
      }

  return (
    <div className="form__content">
      <form className="form__form" onSubmit={handleSubmit}>
          <FormControl className='modal-form__username'>
              <InputLabel htmlFor='username'>Username</InputLabel>
              <FilledInput
              id='username'
              type='text'
              value={formObj.username}
              onChange={handleChange}
              />
          </FormControl>
          <FormControl className='form__password'>
              <InputLabel htmlFor='password'>Password</InputLabel>
              <FilledInput
              id='password'
              type='text'
              value={formObj.password}
              onChange={handleChange}
              />
          </FormControl>
          <Button
          variant="contained"
          type="submit"
          className='form__submit'
          >
          Login
          </Button>
      </form>
    </div>
  )
}

export default LoginPage