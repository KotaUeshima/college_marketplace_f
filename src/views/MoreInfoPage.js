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

  const boxStyle = {
    maxHeight: '80vh', 
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '30px'
  }

  const titleStyle = {
    fontSize: '2rem',
    textAlign: 'center'
  }

  const string = '^/images'
  const regexp = new RegExp(string)
  let image = image_url
  if(regexp.test(image) == true){
    image = `http://localhost:9292/${image_url}`
  }

  return (
    <Container  style={boxStyle} sx={{height: 1000, width: 1100}}>
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
              height= '450'
              image={image}
              alt={item_name}
              /> 
              <CardContent>
                <Typography style={titleStyle} variant="h5">
                  {item_name}
                </Typography>
                <Typography variant="body2">
                  {`Price: $${price}`}
                </Typography>
                <Typography variant="body2">
                  {`Contact Info: ${phone_number}`}
                </Typography>
            </CardContent>
          </Card>
      </Box>
    </Container>
  )
}

export default MoreInfoPage