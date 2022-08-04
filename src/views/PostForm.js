import React, {useState} from 'react'
import "./PostForm.css"
import Modal from "@mui/material/Modal"
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import { useRecoilValue } from 'recoil'
import { userState } from './atoms'
import { ThemeProvider } from '@mui/material'

function PostForm({college, addNewPost, theme}) {
    const [open, setOpen] = useState(false)
    const user = useRecoilValue(userState)

    const [formObj, setFormObj] = useState({
        item_name: "",
        price: 0,
        phone_number: ""
    })

    const [imageFile, setImageFile] = useState()

    function handleChange(e){
        setFormObj(obj => ({...obj, [e.target.id]: e.target.value}))
    }

    function handleImageChange(e){
        setImageFile(e.target.files[0])
    }

    function handleSubmit(e){
        e.preventDefault()
        // const updatedObj = {...formObj, user_id: user.id,
        //     college_id: college.id}
        const formData = new FormData()
        formData.append('image', imageFile)
        formData.append('item_name', formObj.item_name)
        formData.append('price', formObj.price)
        formData.append('phone_number', formObj.phone_number)
        formData.append('user_id', user.id)
        formData.append('college_id', college.id)
        fetch(`http://localhost:9292/newpost`,{
          method: "POST",
          body: formData,
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


  return (
    <div className="postform">
        <ThemeProvider theme={theme}>
        <Button variant='contained' onClick={handleOpen}>Create a New Post</Button>
        </ThemeProvider>
        <Modal open={open} onClose={handleClose}>
        <div className="postform__content">
            <form className="postform__form" onSubmit={handleSubmit}>
                <TextField
                className='postform__item_name'
                label="Item_name"
                id='item_name'
                value={formObj.item_name}
                onChange={handleChange}
                placeholder="Enter item name"
                fullwidth
                required
                />
                <input 
                className='postform__image'
                type="file"
                onChange={handleImageChange}
                />
                <TextField
                className='postform__price'
                label="Price"
                id='price'
                value={formObj.price}
                onChange={handleChange}
                placeholder="Enter price:"
                fullwidth
                required
                />
                <TextField
                className='postform__phone_number'
                label="Phone Number"
                id='phone_number'
                value={formObj.phone_number}
                onChange={handleChange}
                placeholder="Enter phone number:"
                fullwidth
                required
                />
                <ThemeProvider theme={theme}>
                <Button
                variant="contained"
                type="submit"
                className='postform__submit'
                >
                Submit
                </Button>
                </ThemeProvider>
            </form>
        </div>
        </Modal>
    </div>
  )
}

export default PostForm