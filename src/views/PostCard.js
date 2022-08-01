import React from 'react'

import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';

function PostCard({post}) {

    const {item_name, image_url, price, phone_number} = post

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
                  {price}
                </Typography>
                <Typography variant="h5">
                  {phone_number}
                </Typography>
              </CardContent>
            </Card>
        </Grid>
    )
}

export default PostCard