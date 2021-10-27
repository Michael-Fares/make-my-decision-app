import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useLocation, useHistory } from 'react-router-dom'
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
  Divider } from '@mui/material'

  import {
    calculateCriteriaWeightings,
    chunkRankings,
    finalResults
  } from '../math.js'


const EndScreen = (props) => {
  const location = useLocation()
  const history = useHistory()
  const currentDecision = props.location.state.currentDecision

  // current decision id
  const id = currentDecision.decision_id

  // criteria passed down from list criteria component as state
  const criteria = props.location.state.criteria

  // calculate the criteria weightings for the bar chart and save it to a variable called weightings
  const weightings = calculateCriteriaWeightings(criteria)
  const [rankings, setRankings] = useState([])
  const [results, setResults] = useState([])
          // function to add percents to rankings
          const addPercents = (arr) => {

            let results = []
          
            for(let i=0; i<arr.length; i++) {
              for(let j=0; j < weightings.length; j++) {
                let item = 
                {
                  ...chunkRankings(rankings, criteria.length)[i][j],
                  weight: calculateCriteriaWeightings(criteria)[j].weightingPercent
                } 
                
                results.push(item)
              }
            }
            return chunkRankings(results, criteria.length)
          }

  useEffect(() => {
    axios.get(`http://localhost:4001/rankings/for-decision/${id}`)
      .then((res) => {
        setRankings(res.data)
      })
      .then(()=>{
        const chunksWithPercents = addPercents(chunkRankings(rankings, criteria.length))
        console.log('chunks with percents', chunksWithPercents)
        const final = finalResults(chunksWithPercents)
        setResults(final)
      })
    }, [])


  return (
    <Container>
    <Typography variant="h6">{currentDecision.decision_text}</Typography>
    <Typography>
      Your results:
    </Typography>
  </Container>
  )

}

export default EndScreen