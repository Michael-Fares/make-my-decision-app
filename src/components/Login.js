import React, { useState } from 'react';
import { 
  Button,
  TextField,
  Box,
  Typography,
  Stack
 } from "@mui/material";
import { Link, useHistory } from 'react-router-dom'
import axios from 'axios'

const url = "https://make-my-decision.herokuapp.com"


const Login = (props) => {

  let history = useHistory();

  const [user, setUser] = useState({
    email: "",
    password: ""
  })

  const handleChange = (e) => {
    e.preventDefault()
    const loggedInUser = { ... user }
    loggedInUser[e.target.name] = e.target.value
    setUser(loggedInUser)
  }
  
  const handleSubmit = (e) => {
   

    e.preventDefault()


    // use axios to post to server from 311_wk4_day2
    // posts just a new user fname and lname to users table
    // got it to work in firefox turning off CORS
    // but not in Chrome
    axios.post(`${url}/users/login`, {
      email: user.email,
      password: user.password,
    })
    .then(function (response) {
   
      // set current user info in local storage
   
      localStorage.setItem("token", response.data.accessToken);
      localStorage.setItem("id", response.data.id);
      localStorage.setItem("email", response.data.email)
      localStorage.setItem("name", response.data.first_name)
      localStorage.setItem("online", true)
      
      // set a logged in cookie for checkAuth fuction in router to verify

      document.cookie = "loggedIn=true;"


     delete response.accessToken;
     window.location.replace('/decisions')})
    .catch(function (error) {
      console.log('THERE WAS AN ERROR', error);
      alert("Login failed, incorrect email or password")
    });

    // reset the form
    setUser( 
      {
        email: "",
        password: ""
      }
     )
  }

  return (
      <form className="form" onSubmit={handleSubmit}>
          <Box mb={2}>
            <Typography variant="h5">Welcome! Please Login</Typography>
          </Box>
          
        <Stack spacing={1}>
        <TextField name="email" value={user.email} required="true" placeholder="Email" label="Email" onChange={(e)=>{handleChange(e)}} />
        <TextField name="password" value={user.password} required="true" placeholder="Password" type="password" label="Password" onChange={(e)=>{handleChange(e)}} / >
            <Button fullWidth = {true} 
            variant="contained"
            className="form-margin"
            type="submit"
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