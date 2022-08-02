import React from 'react'
import { Link } from 'react-router-dom'

import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

function CollegeCard({college}) {

    const {college_name, image_url} = college

    return (
      <Grid item xs={2}>
          <Link to={`/${college_name}`}>
            <Card 
            sx={{
                ':hover': {
                  boxShadow: 20,
                }
            }}
            >
              <Typography variant='h4'>
                {college_name}
              </Typography>
                <CardMedia
                component="img"
                height="160"
                image={image_url}
                alt={college_name}
                /> 
                <Typography variant='subtitle2'>
                  Click to see whats for sale!
                </Typography>
            </Card>
          </Link>
      </Grid>
    )
}

export default CollegeCard