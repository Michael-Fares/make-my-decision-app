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

import DoubleArrowSharpIcon from '@mui/icons-material/DoubleArrowSharp';

const url = "http://localhost:4001"

const Rankings = (props) => {
  const location = useLocation()
  const history = useHistory()
  const currentDecision = props.location.state.currentDecision

  const id = currentDecision.decision_id

  const criteria = props.location.state.criteria




  const [rankings, setRankings] = useState([])
  const [selectedOption, setSelectedOption] = useState("")
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    axios.get(`${url}/rankings/for-decision/${id}`)
      .then((res) => {
        console.log(res)
        setRankings(res.data)
      })
    }, [])
  
    const handleOptionChange = (e) => {
      setSelectedOption(e.target.value)
    }

    const handleDelete = (index) => {
      let rankingsCopy = [...rankings]
      rankingsCopy.splice(index, 1)
      setRankings(rankingsCopy)
    }
  
    return (
    <>
     <Container>
      <Typography mt={2} variant="h6">{currentDecision.decision_text}</Typography>
      <Typography>
        Rank each option in this decision on each criteria. Once you have ranked everything, you will see your results!
      </Typography>
    </Container>
      {!rankings.length && submitted &&
      <Stack alignItems="center" justifyContent="center" direction="row" mt={5}>
        <Link to={{
              pathname: `/results/for-decision/${id}`,
              state: { currentDecision, criteria }
          }}><Button variant="contained" endIcon={<DoubleArrowSharpIcon/>}>All Done! Click to see your results!</Button></Link>
      </Stack>
      }
      <div className="rankings-container">
      {rankings.map((ranking, index) => {
        const isEnabled = selectedOption !== ""
        return (
          <form className="form" key={index} onSubmit={
            (e) => {
              e.preventDefault()
              if (ranking.option_rank_on_criterion === null) {
                axios.post(`${url}/rankings/for-option/${ranking.option_id}/on-criterion/${ranking.criterion_id}`, {
                  option_rank_on_criterion: Number(selectedOption)
                })
                  .then(res => console.log(res)).then(setSelectedOption("")).then(() => handleDelete(index))
                  .catch(err => console.log(err))
                } else {
                  axios.put(`${url}/rankings/for-option/${ranking.option_id}/on-criterion/${ranking.criterion_id}`, {
                  option_rank_on_criterion: Number(selectedOption)
                })
                  .then(res => console.log(res)).then(setSelectedOption("")).then(() => handleDelete(index))
                  .catch(err => console.log(err))
                }
                setSubmitted(true)
            }
          }>
              <Paper elevation={4} style={{padding: "30px"}}>
              <Box mb={2}>
              <Stack justifyContent="center" alignItems="center">
              <Typography variant="h6">{`How do you feel about "${ranking.option}" on "${ranking.criterion}"?`}</Typography>
              </Stack>
              </Box>  
              <Stack spacing={4} direction="row" justifyContent="center" alignItems="center">
      
              <Stack spacing={5} justifyContent="center" alignItems="center">
              <label className="container" htmlFor="terrible">
                <input name="rank" type="radio" id="terrible" value="1" onChange={(e)=>handleOptionChange(e)} checked={selectedOption === "1"} required/>
                <FontAwesomeIcon className="checkmark terrible" icon={faAngry} size="2x"/>
              </label>
              <Typography>Terrible</Typography>
              </Stack>
      
              <Stack spacing={5} justifyContent="center" alignItems="center">
              <label className="container" htmlFor="bad">
                <input name="rank" type="radio" id="bad" value="2" onChange={(e)=>handleOptionChange(e)} checked={selectedOption === "2"} required/>
                <FontAwesomeIcon className="checkmark bad" icon={faFrownOpen} size="2x"/>
              </label>
              <Typography>Bad</Typography>
              </Stack>
      
              <Stack spacing={5} justifyContent="center" alignItems="center">
              <label className="container" htmlFor="average">
                <input name="rank" type="radio" id="average" value="3" onChange={(e)=>handleOptionChange(e)} checked={selectedOption === "3"} required/>
                <FontAwesomeIcon className="checkmark average" icon={faMeh} size="2x"/>
              </label>
              <Typography>Average</Typography>
              </Stack>
      
              <Stack spacing={5} justifyContent="center" alignItems="center">
              <label className="container" htmlFor="good">
                <input name="rank" type="radio" id="good" value="4" onChange={(e)=>handleOptionChange(e)} checked={selectedOption === "4"} required/>
                <FontAwesomeIcon className="checkmark good" icon={faGrin} size="2x"/>
              </label>
              <Typography>Good</Typography>
              </Stack>
      
              <Stack spacing={5} justifyContent="center" alignItems="center">
              <label className="container" htmlFor="excellent">
                <input name="rank" type="radio" id="excellent" value="5" onChange={(e)=>handleOptionChange(e)} checked={selectedOption === "5"} required/>
                <FontAwesomeIcon className="checkmark excellent" icon={faSmileBeam} size="2x"/>
              </label>
              <Typography>Excellent</Typography>
              </Stack>
            </Stack>
              <Box mt={2}>
              <Button disabled={!isEnabled} variant="contained" fullWidth={true} type="submit">Submit</Button>
              </Box>
            </Paper>
        </form>
        )
      })}
      </div>
    </>
  
  )
}

export default Rankings
