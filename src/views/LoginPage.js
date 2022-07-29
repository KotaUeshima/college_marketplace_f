import React, {useState} from 'react'
import './LoginPage.css'

import FormControl  from '@mui/material/FormControl'
import InputLabel from "@mui/material/InputLabel"
import FilledInput from '@mui/material/FilledInput'
import Button from '@mui/material/Button'

function LoginPage() {
  const [formObj, setFormObj] = useState({
    username: "",
    password: ""
  })

  function handleChange(e){
      setFormObj(obj => ({...obj, [e.target.id]: e.target.value}))
  }

  function handleSubmit(e){
      e.preventDefault()
      const obj = JSON.stringify(formObj)
      fetch(`http://localhost:9292/users/${obj}`)
      .then(res => res.json())
      .then((data) => console.log(data))
      setFormObj({
        username: "",
        password: ""
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