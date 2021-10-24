import React, { useState } from 'react';
import axios from 'axios'
import { 
  Button,
  TextField,
  Box,
  Typography,
  Stack
 } from "@mui/material";
 import { Link, useHistory } from 'react-router-dom'

 import cookie from 'cookie'

const token = localStorage.getItem('token')

axios.defaults.headers.common['authorization'] = `Bearer ${token}`;

 

const AddDecision = (props) => {

  const [decision, setDecision] = useState("")

  const handleChange = (e) => {
    e.preventDefault(e)
    setDecision(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault(e)


    axios.post('http://localhost:4001/decisions', 
    {
      decision_text: decision
    })
      .then(res => console.log(res))
      .catch(err => console.log('there was an error', err))

    console.log('the cookie token from front end', token)
    setDecision("")
  }

  return (
      <form className="form" onSubmit={handleSubmit}>
          <Box mb={2}>
            <Typography variant="h6">What Decision Would You Help Making?</Typography>
          </Box>
          
        <Stack spacing={3}>
        <TextField name="decision" value={decision} required="true" placeholder="Type Anything!" label="Type Anything!" onChange={(e)=>{handleChange(e)}}/>
            <Button fullWidth = {true} 
            variant="contained"
            className="form-margin"
            type="submit"
            >
            Add
          </Button>
          </Stack>
      </form>
  )
}

export default AddDecision;