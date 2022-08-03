import React, {useState} from 'react'
import "./PostForm.css"

import FormControl  from '@mui/material/FormControl'
import InputLabel from "@mui/material/InputLabel"
import Modal from "@mui/material/Modal"
import FilledInput from '@mui/material/FilledInput'
import Button from '@mui/material/Button'

function PostForm({login, college, addNewPost}) {
    const [open, setOpen] = useState(false)

    const [formObj, setFormObj] = useState({
        item_name: "",
        image_url: "",
        price: 0,
        phone_number: ""
    })

    function handleChange(e){
        setFormObj(obj => ({...obj, [e.target.id]: e.target.value}))
    }

    function handleSubmit(e){
        e.preventDefault()
        const updatedObj = {...formObj, user_id: login.id,
            college_id: college.id}
        fetch(`http://localhost:9292/newpost`,{
          method: "POST",
          headers: {
            "Content-Type": 'application/json',
            "Accept": "application/json"
          },
          body: JSON.stringify(updatedObj)
        })
        .then(res => res.json())
        .then(data => {
            addNewPost(data)
            setFormObj({
                item_name: "",
                image_url: "",
                price: 0,
                phone_numnber: ""
            })
        })
        handleClose()
    }

    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    const buttonPlacement = {alignSelf: "center"}

  return (
    <div className="postform">
        <Button style={buttonPlacement} variant='contained' onClick={handleOpen}>Create a New Post</Button>
        <Modal open={open} onClose={handleClose}>
        <div className="postform__content">
            <form className="postform__form" onSubmit={handleSubmit}>
                <FormControl className='postform__item_name'>
                    <InputLabel htmlFor='item_name'>Item Name</InputLabel>
                    <FilledInput
                    id='item_name'
                    type='text'
                    value={formObj.item_name}
                    onChange={handleChange}
                    />
                </FormControl>
                <FormControl className='postform__image'>
                    <InputLabel htmlFor='image_url' >Image URL</InputLabel>
                    <FilledInput
                    id='image_url'
                    type='text'
                    value={formObj.image_url}
                    onChange={handleChange}
                    />
                </FormControl>
                <FormControl className='postform__price'>
                    <InputLabel htmlFor='price' >Price</InputLabel>
                    <FilledInput
                    id='price'
                    type='text'
                    value={formObj.price}
                    onChange={handleChange}
                    />
                </FormControl>
                <FormControl className='postform__phone_number'>
                    <InputLabel htmlFor='phone_number' >Phone Number</InputLabel>
                    <FilledInput
                    id='phone_number'
                    type='text'
                    value={formObj.phone_number}
                    onChange={handleChange}
                    />
                </FormControl>
                <Button
                variant="contained"
                type="submit"
                className='postform__submit'
                >
                Submit
                </Button>
            </form>
        </div>
        </Modal>
    </div>
  )
}

export default PostForm