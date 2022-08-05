import React, {useEffect, useState} from 'react'
import PostCard from './PostCard'
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { useRecoilValue } from 'recoil';
import { userState } from './atoms';

function UserPage() {

    const [myPosts, mySetPosts] = useState([])
    const user = useRecoilValue(userState)

    useEffect(() => {
    fetch(`http://localhost:9292/my_posts/${user.id}`)
    .then(res => res.json())
    .then(mySetPosts)
    }, [])

    function updatePost(data){
      const updatedPosts = myPosts.map((mp) => {
        if (mp.id === data.id) {
          return data
        } else {
          return mp
        }
      })
      mySetPosts((updatedPosts))
    }

    function deletePost(id) {
      const deletedPosts = myPosts.filter((mp) => {
        if (mp.id === id) {
          return false
        } else {
          return true
        }
      })
      mySetPosts((deletedPosts))
    }

    const myPostList = myPosts.map((post, indx) => {
      return <PostCard
        key={indx}
        post={post}
        updatePost={updatePost}
        deletePost={deletePost}
      />
    })
    const  rootStyle = { marginTop: '70px' }

  return (
    <Container style={rootStyle} sx={{height: 1000, width: 1100}}>
          <Box>
            <Grid container spacing={5}>
              {myPostList}
            </Grid>
          </Box>
    </Container>
  )
}

export default UserPage
