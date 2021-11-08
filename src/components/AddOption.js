import React, { useState } from 'react';
import { 
  Button,
  TextField,
  Box,
  Typography,
  Stack, 
  Container,
  Paper
 } from "@mui/material";
 import { useHistory } from 'react-router-dom'
 import axios from 'axios'

const url = "https://make-my-decision.herokuapp.com"

const AddOption = (props) => {
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


    axios.post(`${url}/options/for-decision/${id}`, 
    {
      option_text: option
    })
      .then(res => res).then(setOption("")).then(history.goBack())
      .catch(err => console.log('there was an error', err))
  }

  return (
    <>
    <Container>
      <Typography mt={2}>{`Decision: ${currentDecision.decision_text}`}</Typography>
    </Container>
      <form className="form">
      <Paper elevation={4} style={{padding: "30px"}}>
          <Box mb={2}>
            <Typography variant="h6">What option would you like to add to this decision?</Typography>
          </Box>
          
        <Stack spacing={3}>
        <TextField required="true" placeholder="Type Anything!" label="Type Anything!" onChange={(e) => handleChange(e)}/>
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
      </>
  )
}

export default AddOption;