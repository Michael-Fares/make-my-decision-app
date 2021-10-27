import React, { useState, useEffect } from 'react'
import { Box, 
  Typography, 
  Button, 
  Paper, 
  Stack, 
  Container,
  Step,
  StepLabel,
  Pagination,
  PaginationItem, 
  dividerClasses,
  Divider} from '@mui/material'


  import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
  import {
    faAngry,
    faFrownOpen,
    faMeh,
    faGrin,
    faSmileBeam,
    faGrinBeam
  } from "@fortawesome/free-solid-svg-icons";

import axios from 'axios'
import { Link, useLocation, useHistory } from 'react-router-dom'

const Rankings = (props) => {
  const location = useLocation()
  const history = useHistory()
  const currentDecision = props.location.state.currentDecision

  const id = currentDecision.decision_id
  console.log('current decision', props.location.state.currentDecision)

  const [rankings, setRankings] = useState([])

  const [rank, setRank] = useState(0)

  useEffect(() => {
    axios.get(`http://localhost:4001/rankings/for-decision/${id}`)
      .then((res) => {
        console.log(res)
        setRankings(res.data)
      })
    }, [])
  
  return (
    <>
     <Container>
      <Typography variant="h6">{currentDecision.decision_text}</Typography>
      <Typography>
        Rank each option in this decision on each criteria. Once you have ranked everything, you will see you results!
      </Typography>
    </Container>
    


    
    
      {rankings.map((ranking, index) => {
        return (
          <>
          <form className="form">
          <Paper elevation={4} style={{padding: "30px"}}>
          <Box mb={2}>
          <Stack justifyContent="center" alignItems="center">
          <Typography variant="h6">{`How do you feel about "${ranking.option}" on "${ranking.criterion}"?`}</Typography>
          </Stack>
          </Box>  
          <Stack spacing={4} direction="row" justifyContent="center" alignItems="center">
      
              <Stack spacing={5} justifyContent="center" alignItems="center">
              <label className="container" for="terrible">
                <input name="rank" type="radio" id="terrible" value="1" />
                <FontAwesomeIcon className="checkmark terrible" icon={faAngry} size="2x"/>
              </label>
              <Typography>Terrible</Typography>
              </Stack>
      
              <Stack spacing={5} justifyContent="center" alignItems="center">
              <label className="container" for="bad">
                <input name="rank" type="radio" id="bad" value="2" />
                <FontAwesomeIcon className="checkmark bad" icon={faFrownOpen} size="2x"/>
              </label>
              <Typography>Bad</Typography>
              </Stack>
      
              <Stack spacing={5} justifyContent="center" alignItems="center">
              <label className="container" for="average">
                <input name="rank" type="radio" id="average" value="3" />
                <FontAwesomeIcon className="checkmark average" icon={faMeh} size="2x"/>
              </label>
              <Typography>Average</Typography>
              </Stack>
      
              <Stack spacing={5} justifyContent="center" alignItems="center">
              <label className="container" for="good">
                <input name="rank" type="radio" id="good" value="4" />
                <FontAwesomeIcon className="checkmark good" icon={faGrin} size="2x"/>
              </label>
              <Typography>Good</Typography>
              </Stack>
      
              <Stack spacing={5} justifyContent="center" alignItems="center">
              <label className="container" for="excellent">
                <input name="rank" type="radio" id="excellent" value="5" />
                <FontAwesomeIcon className="checkmark excellent" icon={faSmileBeam} size="2x"/>
              </label>
              <Typography>Excellent</Typography>
              </Stack>
            </Stack>
              <Box mt={2}>
              <Button variant="contained" fullWidth={true}>Submit</Button>
              </Box>
            </Paper>
            </form>
        </>
        )
      })}
    </>
  
  )
}

export default Rankings
