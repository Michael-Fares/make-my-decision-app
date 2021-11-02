import React, { useState, useEffect } from 'react'
import { Link, useLocation, useHistory } from 'react-router-dom'
import axios from 'axios'
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
  Divider } 
  from '@mui/material'
import {
  calculateCriteriaWeightings,
  chunkRankings,
  finalResults
} from '../math.js'
import { Doughnut, Bar } from 'react-chartjs-2';

const url = "http://localhost:4001"


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
  const [labels, setLabels] = useState([])
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
    axios.get(`${url}/rankings/for-decision/${id}`)
      .then((res) => {
        setRankings(res.data)
      })
      .then(()=>{
        
      })
    }, [])

    useEffect(()=> {
      const chunksWithPercents = addPercents(chunkRankings(rankings, criteria.length))
        const semiFinal = finalResults(chunksWithPercents)
        const final = semiFinal.map(item => item.final)
        const finalLabels = semiFinal.map(item => item.option)
        console.log('final', final)
        setResults(final)
        setLabels(finalLabels)
    }, [rankings])


    // customize these better with opacity rgba
    const colors = ["red", "orange", "blue", "green", "yellow", "gray", "teal", "lightseagreen"]
    const doughnutData = {
      labels: weightings.map(item => item.criterion),
      datasets: [{
        label: 'My First Dataset',
        data: weightings.map(item => item.weightingPercent),
        backgroundColor: colors,
        hoverOffset: 4
      }]
    };

    const barData = {
      labels: labels,
      datasets: [{
        label: currentDecision.decision_text,
        data: results,
        backgroundColor: "#ab6d23",
        borderColor:["black"],
        borderWidth: 2
      }]
    };

  return (
    <>
    <Container>
    <Typography variant="h6" mt={2} mb={2}>{currentDecision.decision_text}</Typography>
  </Container>
  <Stack direction="row" justifyContent="center" alignItems="space-evenly">
    <div className="chart-container">
      <Typography>Your options and how they compare out of 100%</Typography>
      <Bar data={barData} />
    </div>
    <div className="chart-container">
    <Typography>Your criteria and their propotional weighting out of 100%</Typography>
      <Doughnut data={doughnutData} />
    </div>
  </Stack>
  </>
  )

}

export default EndScreen