import React from 'react';
import { 
  Button,
  TextField,
  Box,
  Typography,
  Stack
 } from "@mui/material";
 import { Link } from 'react-router-dom'

const Login = (props) => {
  return (
      <form className="form">
          <Box mb={2}>
            <Typography variant="h4">Welcome back!</Typography>
          </Box>
          
        <Stack spacing={1}>
        <TextField required="true" placeholder="Email" label="Email"/>
        <TextField required="true" placeholder="Password" type="password" label="Password"/ >
            <Button fullWidth = {true} 
            variant="contained"
            className="form-margin"
            >
            Login
          </Button>
          </Stack>
          <Box mt={4}>
          <Typography>Don't have an account yet? <Link to='/signup'><span className="link-span">Sign up!</span></Link>
            </Typography>
          </Box>
      </form>
  )
}

export default Login;