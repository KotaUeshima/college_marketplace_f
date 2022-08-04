import React, {useState, useEffect} from 'react'
import TextField from '@mui/material/TextField'
import Stack from '@mui/material/Stack'
import Autocomplete from '@mui/material/Autocomplete'
import {useNavigate} from 'react-router-dom'

function SearchBar() {
    const [nameResults, setNameResults] = useState([])
    const [value, setValue] = React.useState(nameResults[0]);
    const [inputValue, setInputValue] = React.useState('');

    const navigate = useNavigate()

    useEffect(() => {
        fetch("http://localhost:9292/searchnames")
        .then(res => res.json())
        .then(setNameResults)
    },[])

    function handleKeyDown(e){
        if(e.key === 'Enter'){
            const result = nameResults.find(c => {
                if(c.college_name.toLowerCase().includes(inputValue.toLowerCase())){
                    return true
                }
            })
            navigate(`/${result.college_name}`)           
        }
    }


  return (
    <>
    <Stack sx={{width: 300, margin: "auto"}}>
        {(nameResults.length === 0) ? null :
            <Autocomplete
                id="collegeSearch"
                value={value}
                onChange={(event, newValue) => {
                    navigate(`/${newValue.college_name}`)
                    setValue(newValue)
                }}
                inputValue={inputValue}
                onInputChange={(event, newInputValue) => {
                    setInputValue(newInputValue);
                }}
                options={nameResults} 
                getOptionLabel={nameResults => nameResults.college_name}          
                sx={{width: 300}}
                renderInput={(params) => 
                    (<TextField
                    {...params}
                    label="Search College"
                    onKeyDown={handleKeyDown}
                    />)
                }
            />
        }
    </Stack>
    </>
  )
}

export default SearchBar