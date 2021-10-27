import React, { useState } from 'react';
import { 
  Button,
  TextField,
  Box,
  Typography,
  Stack
 } from "@mui/material";
import { Link, useHistory } from 'react-router-dom'
import axios from 'axios';

const url = "http://localhost:4001"

const SignUp = (props) => {

  let history = useHistory();

  const [signup, setSignup] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: ""
  }
  )

  const handleChange = (e) => {
    e.preventDefault()
    const newSignup = { ... signup }
    newSignup[e.target.name] = e.target.value
    setSignup(newSignup)
  }
  
  const handleSubmit = (e) => {
    console.log(e)

    e.preventDefault()

    axios.post(`${url}/users/signup`, {
      first_name: signup.firstName,
      last_name: signup.lastName,
      email: signup.email,
      password: signup.password,
      confirmPassword: signup.confirmPassword 
    })
    .then(function (response) {
      console.log('response', response);
    }).then(() => history.push("/login"))
    .catch(function (error) {
      console.log('THERE WAS AN ERROR', error);
    });

    // reset the form
    setSignup( 
      {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: ""
      }
     )
  }

  return (
      <form className="form" onSubmit={handleSubmit}>
          <Box mb={4}>
          <Typography>Already have an account?  <Link to='/login'><span className="link-span">Login</span></Link></Typography>
          </Box>
        <Stack spacing={1}>
        <TextField name="firstName" value={signup.firstName} required="true" placeholder="First Name" label="First Name" onChange={(e) => handleChange(e)}/>
        <TextField name="lastName" value={signup.lastName} required="true" placeholder="Last Name" label="Last Name"  onChange={(e) => handleChange(e)}/>
        <TextField name="email" value={signup.email} required="true" placeholder="Email" label="Email" onChange={(e) => handleChange(e)}/>
        <TextField name="password" value={signup.password} required="true" placeholder="Password" type="password" label="Password" onChange={(e) => handleChange(e)} / >
        <TextField name="confirmPassword" value={signup.confirmPassword} required="true" placeholder="Confirm Password" type="password" label="Confirm Password" onChange={(e) => handleChange(e)} / >
            <Button type="submit" fullWidth = {true} 
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