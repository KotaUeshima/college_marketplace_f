import React, {useEffect, useState} from 'react'
import PostCard from './PostCard'

import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

function UserPage({login, loggedIn}) {
  const [myPosts, mySetPosts] = useState([])

    useEffect(() => {
    fetch(`http://localhost:9292/my_posts/${login.id}`)
    .then(res => res.json())
    .then(mySetPosts)
    }, [])

    const myPostList = myPosts.map((post, indx) => {
      return <PostCard
        key={indx}
        post={post}
        loggedIn={loggedIn}
      />
    })

  return (
    <Container sx={{height: 1000, width: 1100}}>
          <Box>
            <Grid container spacing={5}>
              {myPostList}
            </Grid>
          </Box>
        </Container>
  )
}

export default UserPage
