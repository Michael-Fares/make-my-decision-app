import React, { useState } from 'react';
import { 
  Button,
  TextField,
  Box,
  Typography,
  Stack, 
  Container,
  Paper,
  LinearProgress
 } from "@mui/material";
 import { useHistory } from 'react-router-dom'
 import axios from 'axios'

const url = "https://make-my-decision.herokuapp.com"

const AddOption = (props) => {
  const history = useHistory()
  const currentDecision = props.location.state.currentDecision

  const id = currentDecision.decision_id

  const [option, setOption] = useState("")
  const [adding, setAdding] = useState(false)

  const handleChange = (e) => {
    e.preventDefault()
    setOption(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()


    axios.post(`${url}/options/for-decision/${id}`, 
    {
      option_text: option
    })
      .then(res => res).then(setOption("")).then(() => {
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
    {!adding ? 
      <>
      <Container>
          <Typography mt={2}>{`Decision: ${currentDecision.decision_text}`}</Typography>
        </Container>
          <form className="form" onSubmit={(e) => handleSubmit(e)}>
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
                >
                Add
              </Button>
              </Stack>
            </Paper>
          </form> 
          </> : 
          <Stack  alignItems="center" justifyContent="center">
            <Box mt={25} sx={{width: "80%"}}>
              <Stack alignItems="center" justifyContent="center">
                <Typography mb={2} variant="h4" color="primary">Adding Option!</Typography>
              </Stack>
                  <LinearProgress />
              </Box>
          </Stack>}
    </>
  )
}

export default AddOption;