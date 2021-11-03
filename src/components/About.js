import React from 'react'
import { Stack,
  Button,
  Box, Typography 
} from '@mui/material'

import { Link } from 'react-router-dom'

const About = () => {
  return (
    <div className="form">
    <Typography variant="h4">Welcome to <i>Make My Decision</i></Typography>
    <Typography variant="h6">A decision making aid and visiualiztion tool</Typography>
    <Typography>How it works in 5 simple steps:</Typography>
    <ol>
      <Stack spacing={2}>
      <li>Enter the decision you need help making.</li>
      <li>Tell us about the criteria important to you in this decision. You can enter as many as you need to!</li>
      <li>Tell us about the options you have to choose from for this decision. You can enter as many as you want!</li>
      <li>Tell us how you feel about each option based on each criteria.</li>
      <li>Click "See my results" and the app will create a visualization of the best option in this decision based on the criteria most important to you.</li>
      </Stack>
    </ol>
    <Box mt={2}><Link to="/signup"><Button fullWidth={true} variant="contained">Get Started</Button></Link></Box>
    </div>
  )
}

export default About;