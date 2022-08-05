import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import PostCard from './PostCard'
import PostForm from './PostForm';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { useRecoilValue } from 'recoil';
import { loggedIn } from './atoms';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { ThemeProvider } from '@mui/material/styles';
import { Typography } from '@mui/material';

function PostPage({theme}) {

    const [college, setCollege] = useState({})
    const [posts, setPosts] = useState([])
    const recoilLogin = useRecoilValue(loggedIn)
    const navigate = useNavigate()
    const {college_name} = useParams()
    // useParams = {college_name: Notre Dame}//

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

    function addNewPost(data){
      setPosts((posts) => [...posts, data])
    }

    function updatePost(data){
      const updatedPosts = posts.map((mp) => {
        if (mp.id === data.id) {
          return data
        } else {
          return mp
        }
      })
      setPosts((updatedPosts))
    }

    function deletePost(id) {
      const deletedPosts = posts.filter((mp) => {
        if (mp.id === id) {
          return false
        } else {
          return true
        }
      })
      setPosts((deletedPosts))
    }

    const collegePosts = posts.map((post, indx) => {
      return <PostCard
        key={indx}
        post={post}
        deletePost={deletePost}
        updatePost={updatePost}
        theme={theme}
      />
    })

    const  rootStyle = { marginTop: '50px' }
    const formButtonStyle = {marginTop: '8px', display: 'flex', justifyContent: 'center'}
    const titleStyle = {marginTop: '8px', display: 'flex', justifyContent: 'center'}
    
    return (
      <>
        <ThemeProvider theme={theme}>
          <Button style={{marginTop: "20px", marginLeft: "30px"}}onClick={() => navigate(-1)} variant="contained" endIcon={<ArrowBackIcon />}>Back</Button>
        </ThemeProvider>
        <div style={titleStyle}>
          <img
            src={college.image_url}
            height='160px'
            width='160px'
            fit='cover'
          />
        </div>
        <div style={formButtonStyle}>
          {recoilLogin? <PostForm theme={theme} college={college} addNewPost={addNewPost}/> : null}
        </div>
        <Container style={rootStyle} sx={{height: 1000, width: 1100}}>
          <Box>
            <Grid container spacing={5}>
              {collegePosts}
            </Grid>
          </Box>
        </Container>
      </>
    )
}

export default PostPage