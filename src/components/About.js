import React from 'react'
import { Stack,
  Button,
  Box, Typography, Container 
} from '@mui/material'

import { Link } from 'react-router-dom'

import { checkAuth } from '../Router'
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

const About = () => {
  return (
    <>
    <Stack direction="row" spacing={5} alignItems="space-evenly" justifyContent="center">
        <div className="home-container">
        <Typography color="secondary" variant="h4" mt={2}>Welcome to <i>Make My Decision</i> !</Typography>
       
        <Typography color="primary" variant="h5">A decision making aid and visiualization tool</Typography>
        <Typography color="primary" variant="h6">How it works:</Typography>
        <ol>
          <Stack spacing={1}>
          <Typography color="secondary"><li>Enter the decision you need help making.</li>
          <li>Tell us about the criteria important to you in this decision. You can enter as many as you need to!</li>
          <li>Tell us about the options you have to choose from for this decision. You can enter as many as you want!</li>
          <li>Tell us how you feel about each option based on each criteria.</li>
          <li>Click "See my results" and the app will create a visualization of the best option in this decision based on the criteria most important to you.</li></Typography>
          </Stack>
        </ol>
        {checkAuth() ? <Box mt={2}><Link to="/decisions"><Button endIcon={<ArrowRightIcon/>} fullWidth={true} variant="contained">Go to my Saved Decisions</Button></Link></Box>  
        : <Box mt={2}><Link to="/signup"><Button fullWidth={true} variant="contained">Get Started!</Button></Link></Box>}
        </div>
        <div className="img-container">
        </div>
    </Stack>
    <Container>
      <Stack spacing={1} direction="row" justifyContent="flex-end" alignItems="center">
       <Typography color="primary" mt={4}><i>- Emotions wane. Reasons remain.</i></Typography>
      </Stack>
    </Container>
  </>
  )
}

export default About;