import React, { useState } from 'react';
import axios from 'axios'
import { 
  Button,
  TextField,
  Box,
  Typography,
  Stack,
  Paper
 } from "@mui/material";
import { useHistory } from 'react-router-dom'

const token = localStorage.getItem('token')

axios.defaults.headers.common['authorization'] = `Bearer ${token}`;

const url = "https://make-my-decision.herokuapp.com" 

const AddDecision = (props) => {
  let history = useHistory();

  const [decision, setDecision] = useState("")

  const handleChange = (e) => {
    e.preventDefault(e)
    setDecision(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault(e)


    axios.post(`${url}/decisions`, 
    {
      decision_text: decision
    })
      .then(res => res).then(setDecision("")).then(history.goBack())
      .catch(err => console.log('there was an error', err))

    
  }

  return (
      <form className="form" >
        <Paper elevation={4} style={{padding: "30px"}}>
          <Box mb={2}>
            <Typography variant="h6">What Decision Would You Help Making?</Typography>
          </Box>
          
        <Stack spacing={3}>
        <TextField name="decision" value={decision} required="true" placeholder="Type Anything!" label="Type Anything!" onChange={(e)=>{handleChange(e)}}/>
            <Button fullWidth = {true} 
            variant="contained"
            className="form-margin"
            type="submit"
            onMouseDown={handleSubmit}
            >
            Add
          </Button>
          </Stack>
        </Paper>
      </form>
  )
}

export default AddDecision;