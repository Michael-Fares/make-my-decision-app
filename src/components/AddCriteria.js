import React from 'react';
import { 
  Button,
  TextField,
  Box,
  Typography,
  Stack,
  Paper
 } from "@mui/material";
 import { Link, useLocation } from 'react-router-dom'

 import RadioCritiera from './RadioCritiera';

const AddCriteria = (props) => {
    const location = useLocation()
    const id = props.match.params.id
    const decisions = props.location.state.decisions
    const currentDecision = decisions.find(decision => decision.decision_id == id)
    console.log('current decision', currentDecision)
    console.log('props', props)
    console.log('id', id)
  
  return (
    <>
    <div className="option">
      <Typography>{`Decision: ${currentDecision.decision_text}`}</Typography>
    </div>
      <form className="form">
          <Box mb={2}>
            <Typography variant="h6">What Critiera Would You Like To Add To This Decision?</Typography>
          </Box>
          
        <Stack spacing={3}>
        <TextField required="true" placeholder="Type Anything!" label="Type Anything!"/>
        <Box mb={2}>
            <Typography variant="h6">How Important Is this Critiera To You?</Typography>
          </Box>
            <RadioCritiera/>
            <Button fullWidth = {true} 
            variant="contained"
            className="form-margin"
            onClick={()=>{
              console.log('props', props)
              console.log('id', id)
            }}
            >
            Add
          </Button>
          
          </Stack>
      </form>
    </>
  )
}

export default AddCriteria;