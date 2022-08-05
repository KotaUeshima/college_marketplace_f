import React from 'react'
import { Link } from 'react-router-dom'
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

function CollegeCard({college}) {

    const {college_name, image_url} = college

    return (
      <Grid item sm={2}>
          <Link style={{textDecoration: 'none'}} to={`/${college_name}`}>
            <Card 
            sx={{ ':hover': {boxShadow: 20,}}}
            >
                <CardMedia
                component="img"
                height="100"
                fit="cover"
                image={image_url}
                alt={college_name}
                />
                <CardContent>
                <Typography gutterBottom variant="subtitle1" component="div">
                  {college_name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Click to see whats for sale!
                </Typography>
                </CardContent>
            </Card>
          </Link>
      </Grid>
    )
}

export default CollegeCard