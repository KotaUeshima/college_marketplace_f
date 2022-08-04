import React, {useEffect, useState} from 'react'

import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import TextField from '@mui/material/TextField';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import Modal from "@mui/material/Modal"
import { useRecoilValue } from 'recoil';
import { loggedIn } from './atoms';
import { userState } from './atoms';
import ReadMoreIcon from '@mui/icons-material/ReadMore';
import { Badge } from '@mui/material';
import MailIcon from '@mui/icons-material/Mail'
import Paper from '@mui/material/Paper';

function PostCard({post, updatePost, deletePost}) {

    const [open, setOpen] = React.useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)
    const {item_name, image_url, price, phone_number} = post
    const recoilLogin = useRecoilValue(loggedIn)
    const user = useRecoilValue(userState)

    let showIcons = false

    if (recoilLogin){
      if (user.id === post.user_id){
        showIcons = true
      }
    }
    
    const [formObj, setFormObj] = useState({
      item_name: item_name,
      image_url: image_url,
      price: price,
      phone_number: phone_number
    })

    const [interestNames, setInterestNames] = useState([])
    useEffect(() => {
      fetch(`http://localhost:9292/my_posts/${post.id}/interests`)
      .then(res => res.json())
      .then(setInterestNames)
    },[])

    

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
                item_name: data.item_name,
                image_url: data.image_url,
                price: data.price,
                phone_number: data.phone_number
            })
        })
        handleClose()
    }

    const titleStyle = {
      textAlign: 'center'
    }

    const string = '^/images'
    const regexp = new RegExp(string)
    let image = image_url
    if(regexp.test(image) === true){
      image = `http://localhost:9292/${image_url}`
    }

    const buttonStyle = {color: '#3d110e'}
    const [openBadge, setOpenBadge] = useState(false)
    const handleOpenBadge = () => setOpenBadge(true)
    const handleCloseBadge = () => setOpenBadge(false)
  
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
                image={image}
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
                </CardContent>
                <CardActions>
                  <Modal open={openBadge} onClose={handleCloseBadge}>
                    <Paper>
                    {interestNames.map((n) => {
                      return <Typography>{n}</Typography>
                    })}
                    </Paper>
                  </Modal>
                  {showIcons ?
                    <IconButton style={buttonStyle}>
                      <EditIcon variant='contained' onClick={handleOpen}>Open form</EditIcon>
                    </IconButton>
                    : null}
                    {showIcons ?
                    <IconButton style={buttonStyle}>
                    <Badge badgeContent={interestNames.length} color="primary">
                      <MailIcon onClick={handleOpenBadge} />
                    </Badge>
                    </IconButton>
                    : null}
                  {showIcons ? 
                    <IconButton style={buttonStyle}>
                      <DeleteIcon onClick={handleDelete}/> 
                    </IconButton>
                  : null}
                  <IconButton style={{marginLeft: 'auto', color: '#3d110e'}}>
                    <Link to={`/more_info/${post.id}`}>
                      <ReadMoreIcon/>
                    </Link>
                  </IconButton>
                </CardActions>
        

        <div className="postform">
        <Modal open={open} onClose={handleClose}>
          <div className="postform__content">
              <form className="postform__form" onSubmit={handleSubmit}>
                  <TextField
                  className='postform__item_name'
                  label="Item Name"
                  id='item_name'
                  value={formObj.item_name}
                  onChange={handleChange}
                  placeholder="Enter item name"
                  fullwidth
                  required
                  />
                  <TextField
                  className='postform__image'
                  label="Image Url"
                  id='image_url'
                  value={formObj.image_url}
                  onChange={handleChange}
                  placeholder="Enter image url"
                  fullwidth
                  required
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
                  />
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
             
            </Card>
        </Grid>
    )
}

export default PostCard