import React, { useState } from 'react';
import { 
  Button,
  TextField,
  Box,
  Typography,
  Stack
 } from "@mui/material";
 import { Link, useLocation, useHistory } from 'react-router-dom'
 import axios from 'axios'

const AddOption = (props) => {
  const location = useLocation()
  const history = useHistory()
  const currentDecision = props.location.state.currentDecision

  const id = currentDecision.decision_id

  const [option, setOption] = useState("")

  const handleChange = (e) => {
    e.preventDefault(e)
    setOption(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault(e)


    axios.post(`http://localhost:4001/options/for-decision/${id}`, 
    {
      option_text: option
    })
      .then(res => console.log(res)).then(history.goBack())
      .catch(err => console.log('there was an error', err))

    setOption("")
  }

  return (
      <form className="form" onSubmit={handleSubmit}>
          <Box mb={2}>
            <Typography variant="h6">What Option Would You To Add?</Typography>
          </Box>
          
        <Stack spacing={3}>
        <TextField required="true" placeholder="Type Anything!" label="Type Anything!" onChange={(e) => handleChange(e)}/>
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

export default AddOption;