import React, {useState} from 'react'

import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreIcon from '@mui/icons-material/More';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import FormControl  from '@mui/material/FormControl'
import InputLabel from "@mui/material/InputLabel"
import Modal from "@mui/material/Modal"
import FilledInput from '@mui/material/FilledInput'



function PostCard({post, loggedIn, login, updatePost, deletePost}) {

    const [open, setOpen] = React.useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)
    const {item_name, image_url, price, phone_number} = post
    
    const [formObj, setFormObj] = useState({
      item_name: item_name,
      image_url: image_url,
      price: price,
      phone_number: phone_number
    })

    function handleDelete() {
      fetch(`http://localhost:9292/my_posts/${post.id}`, {
        method: "DELETE",
      })
      .then(deletePost(post.id))
    }

    function handleChange(e){
        setFormObj(obj => ({...obj, [e.target.id]: e.target.value}))
    }

    function handleSubmit(e){
        e.preventDefault()
        fetch(`http://localhost:9292/my_posts/${post.id}`,{
          method: "PATCH",
          headers: {
            "Content-Type": 'application/json',
            "Accept": "application/json"
          },
          body: JSON.stringify(formObj)
        })
        .then(res => res.json())
        .then(data => {
          updatePost(data)
            setFormObj({
                item_name: "",
                image_url: "",
                price: 0,
                phone_numnber: ""
            })
        })
        handleClose()
    }

    const titleStyle = {
      textAlign: 'center'
    }
  

    return (
        <Grid item xs={3}>
            <Card 
            sx={{
                ':hover': {
                boxShadow: 20,
                }
            }}
            >
                <CardMedia
                component="img"
                height="160"
                image={image_url}
                alt={item_name}
                /> 
                <CardContent>
                  <Typography style={titleStyle} variant="h5">
                    {item_name}
                  </Typography>
                  <Typography variant="body2">
                    $ {price}
                  </Typography>
                  <Typography variant="body2">
                    {phone_number}
                  </Typography>
                  <div className="postform">
        {loggedIn ? <EditIcon variant='contained' onClick={handleOpen}>Open form</EditIcon> : null}
        {loggedIn ? <DeleteIcon onClick={handleDelete}/> : null}
        <Link to={`/more_info/${post.id}`}>
        <MoreIcon/>
        </Link>
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
                  {/* {loggedIn ? <EditIcon variant="outlined" onClick={handleOpen}>
                    Open form dialog
                    </EditIcon>: null} */}
              </CardContent>
            </Card>
        </Grid>
    )
}

export default PostCard