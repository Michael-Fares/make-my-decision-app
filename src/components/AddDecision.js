import React, { useState } from 'react';
import axios from 'axios'
import { 
  Button,
  TextField,
  Box,
  Typography,
  Stack,
  Paper,
  LinearProgress
 } from "@mui/material";
import { useHistory } from 'react-router-dom'

const token = localStorage.getItem('token')

axios.defaults.headers.common['authorization'] = `Bearer ${token}`;

const url = "https://make-my-decision-server.fly.dev" 

const AddDecision = (props) => {
  let history = useHistory();

  const [decision, setDecision] = useState("")
  const [adding, setAdding] = useState(false)

  const handleChange = (e) => {
    e.preventDefault()
    setDecision(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()


    axios.post(`${url}/decisions`, 
    {
      decision_text: decision
    })
      .then(res => res).then(setDecision("")).then(() => {
        setAdding(true)
        setTimeout(() =>
        history.goBack()
        ,1000)
      }
        )
      .catch(err => console.log('there was an error', err))

    
  }

  return (
    <>
      {!adding ? <form className="form" onSubmit={(e) => handleSubmit(e)}>
        <Paper elevation={4} style={{padding: "30px"}}>
          <Box mb={2}>
            <Typography variant="h6">What decision would you like help making?</Typography>
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
        </Paper>
      </form> : 
      <Stack  alignItems="center" justifyContent="center">
        <Box mt={25} sx={{width: "80%"}}>
          <Stack alignItems="center" justifyContent="center">
            <Typography mb={2} variant="h4" color="primary">Adding Decision!</Typography>
          </Stack>
              <LinearProgress />
          </Box>
      </Stack>
      }
    </>
  )
}

export default AddDecision;