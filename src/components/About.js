import React from 'react'
import { Stack,
  Button,
  Box 
} from '@mui/material'

const About = () => {
  return (
    <div className="form">
    <h1>Welcome to <i>Make My Decision</i></h1>
    <h3>A decision making aid and visiualiztion tool</h3>
    <h3>How it works in 5 simple steps:</h3>
    <ol>
      <Stack spacing={2}>
      <li>Enter the decision you need help making.</li>
      <li>Tell us about the criteria important to you in this decision. You can enter as many as you need to!</li>
      <li>Tell us about the options you have to choose from for this decision. You can enter as many as you want!</li>
      <li>Tell us how you feel about each option based on each criteria.</li>
      <li>Click "See my results" and the app will create a visualization of the best option in this decision based on the criteria most important to you.</li>
      </Stack>
    </ol>
    <Box mt={2}><Button fullWidth={true} variant="contained">Get Started</Button></Box>
    </div>
  )
}

export default About;