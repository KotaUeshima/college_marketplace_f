import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container'


function MoreInfoPage() {
const [info, setInfo] = useState('')
  const {id} = useParams()
  const {image_url, item_name, phone_number, price} = info

 useEffect(() => {
  fetch(`http://localhost:9292/more_info/${id}`)
  .then(res => res.json())
  .then(setInfo)
 },[])

  return (
    <Container sx={{height: 1000, width: 1100}}>
          <Box>
    <Card 
    sx={{
        ':hover': {
        boxShadow: 20,
        }
    }}
    >
        <CardMedia
        component="img"
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
      </CardContent>
    </Card>
    </Box>
    </Container>
  )
}

export default MoreInfoPage