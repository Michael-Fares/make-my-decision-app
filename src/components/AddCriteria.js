import React from 'react';
import { 
  Button,
  TextField,
  Box,
  Typography,
  Stack,
  Paper
 } from "@mui/material";
 import { Link } from 'react-router-dom'

 import RadioCritiera from './RadioCritiera';

const AddCriteria = (props) => {
  return (
      <form className="form">
          <Box mb={2}>
            <Typography variant="h6">What Critiera Would You Like To Add?</Typography>
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
            >
            Add
          </Button>
          
          </Stack>
      </form>
  )
}

export default AddCriteria;