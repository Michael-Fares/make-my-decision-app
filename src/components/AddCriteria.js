import React, { useState } from 'react';
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
    const currentDecision = props.location.state.currentDecision
    console.log('current decision', currentDecision)

    const [criterion, setCriterion] = useState({
      criterion_text: "",
      criterion_importance: null
    })
   
    const handleChange = (e) => {
      e.preventDefault()
      const newCriterion = { ... criterion }
      newCriterion[e.target.name] = e.target.value
      setCriterion(newCriterion)
    }
  
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
        <TextField name="criterion_text" value={criterion.criterion_text} required="true" placeholder="Type Anything!" label="Type Anything!" onChange={(e)=>{handleChange(e)}}/>
        <Box mb={2}>
            <Typography variant="h6">How Important Is this Critiera To You?</Typography>
          </Box>
            <RadioCritiera value={criterion.criterion_importance} name="criterion_importance" onChange={(e)=>{handleChange(e)}} />
            <Button fullWidth = {true} 
            variant="contained"
            className="form-margin"
            onClick={()=>{
              console.log('props', props)
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