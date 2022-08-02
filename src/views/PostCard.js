import React from 'react'

import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

function PostCard({post, loggedIn, myPosts, mySetPosts}) {

    const {item_name, image_url, price, phone_number} = post

    function handleDelete() {
      fetch(`http://localhost:9292/my_posts/${post.id}`, {
        method: "DELETE",
      })
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
                {loggedIn ? <EditIcon /> : null}
                {loggedIn ? <DeleteIcon onClick={handleDelete}/> : null}
              </CardContent>
            </Card>
        </Grid>
    )
}

export default PostCard