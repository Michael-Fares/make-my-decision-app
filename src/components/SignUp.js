import React from 'react';
import { 
  Button,
  TextField,
  Box,
  Typography,
  Stack
 } from "@mui/material";
 import { Link } from 'react-router-dom'

const SignUp = (props) => {
  return (
      <form className="form">
          <Box mb={4}>
          <Typography>Already have an account?  <Link to='/login'><span className="link-span">Login</span></Link></Typography>
          </Box>
        <Stack spacing={1}>
        <TextField required="true" placeholder="First Name" label="First Name"/>
        <TextField required="true" placeholder="Last Name" label="Last Name"/>
        <TextField required="true" placeholder="Email" label="Email"/>
        <TextField required="true" placeholder="Password" type="password" label="Password"/ >
        <TextField required="true" placeholder="Confirm Password" type="password" label="Confirm Password"/ >
            <Button fullWidth = {true} 
            variant="contained"
            className="form-margin"
            >
            Sign Up!
          </Button>
          </Stack>
      </form>
  )
}

export default SignUp;