import React from 'react'

import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreIcon from '@mui/icons-material/More';
import { Link } from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';


function PostCard({post, loggedIn}) {

    const {item_name, image_url, price, phone_number} = post

    function handleDelete() {
      fetch(`http://localhost:9292/my_posts/${post.id}`, {
        method: "DELETE",
      })
    }


      const [open, setOpen] = React.useState(false);
    
      const handleClickOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
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
                <Typography variant="h5">
                  {item_name}
                </Typography>
                <Typography variant="h5">
                  $ {price}
                </Typography>
                <Typography variant="h5">
                  {phone_number}
                </Typography>
                {loggedIn ? <EditIcon variant="outlined" onClick={handleClickOpen}>
                  Open form dialog
                </EditIcon> : null}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Update</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Update item Name.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Item Name"
            type="Name"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogContent>
          <DialogContentText>
            Update item Price.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="item price"
            type="price"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogContent>
          <DialogContentText>
            Update phone number.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="phone number"
            type="phone number"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Submit</Button>
        </DialogActions>
      </Dialog>
                {loggedIn ? <DeleteIcon onClick={handleDelete}/> : null}
                <Link to={`/more_info/${post.id}`}>
                <MoreIcon/>
                </Link>
              </CardContent>
            </Card>
        </Grid>
    )
}

export default PostCard