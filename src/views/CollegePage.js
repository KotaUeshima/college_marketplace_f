import React, {useState, useEffect} from 'react'
import CollegeCard from './CollegeCard'
import "./CollegePage.css"

import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

function CollegePage() {

    const [colleges, setColleges] = useState([])
    
    useEffect(() => {
      fetch("http://localhost:9292/colleges")
      .then(res => res.json())
      .then(setColleges)
    },[])

    const collegeCards = colleges.map(college => {
      return <CollegeCard
        key={college.college_name}
        college={college}
      />
    })

    return (
      <div className="college_page">
        <Container sx={{height: 1000, width: 1100}}>
          <Box>
            <Grid container spacing={5}>
              {collegeCards}
            </Grid>
          </Box>
        </Container>
      </div>
    )
}

export default CollegePage