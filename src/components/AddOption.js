import React from 'react';
import { 
  Button,
  TextField,
  Box,
  Typography,
  Stack
 } from "@mui/material";
 import { Link } from 'react-router-dom'

const AddOption = (props) => {
  return (
      <form className="form">
          <Box mb={2}>
            <Typography variant="h6">What Option Would You To Add?</Typography>
          </Box>
          
        <Stack spacing={3}>
        <TextField required="true" placeholder="Type Anything!" label="Type Anything!"/>
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

export default AddOption;