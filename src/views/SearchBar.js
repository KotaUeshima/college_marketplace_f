import React, {useState, useEffect} from 'react'
import TextField from '@mui/material/TextField'
import Stack from '@mui/material/Stack'
import Autocomplete from '@mui/material/Autocomplete'

function SearchBar() {
    const [nameResults, setNameResults] = useState([])
    const [search, setSearch] = useState("")

    useEffect(() => {
        fetch("http://localhost:9292/searchnames")
        .then(res => res.json())
        .then(setNameResults)
    },[])

  return (
    <Stack sx={{width: 300, margin: "auto"}}>
        <Autocomplete
            id="collegeSearch"
            options={nameResults}
            getOptionLabel={(option) => option.college_name}
            sx={{width: 300}}
            renderInput={(params) => 
                <TextField
                {...params}
                label="Search College"
                />
            }
        />
    </Stack>
  )
}

export default SearchBar