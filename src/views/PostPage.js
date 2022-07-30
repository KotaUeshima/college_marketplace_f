import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import PostCard from './PostCard'

import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

function PostPage() {

    const [college, setCollege] = useState({})
    const [posts, setPosts] = useState([])

    const {college_name} = useParams()
    // useParams = {college_name: Notre Dame}

    useEffect(() => {
      fetch(`http://localhost:9292/colleges/${college_name}`)
      .then(res => res.json())
      .then(setCollege)}
    ,[college_name])

    useEffect(() => {
      fetch(`http://localhost:9292/colleges/${college_name}/posts`)
      .then(res => res.json())
      .then(setPosts)}
    ,[college])

    const collegePosts = posts.map((post, indx) => {
      return <PostCard
        key={indx}
        post={post}
      />
    })

    console.log(posts)
    
    return (
      <Container sx={{height: 1000, width: 1100}}>
        <Box>
          <Grid container spacing={5}>
            {collegePosts}
          </Grid>
        </Box>
      </Container>
    )
}

export default PostPage