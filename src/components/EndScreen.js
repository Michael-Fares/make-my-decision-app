import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { 
  Typography, 
  Stack, 
  Container,
 } from '@mui/material'
import {
  calculateCriteriaWeightings,
  chunkRankings,
  finalResults
} from '../math.js'
import { Doughnut, Bar } from 'react-chartjs-2';

const url = "https://make-my-decision-server.fly.dev"



const EndScreen = (props) => {
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
    }, [])

    useEffect(()=> {
      const chunksWithPercents = addPercents(chunkRankings(rankings, criteria.length))
        const semiFinal = finalResults(chunksWithPercents)
        const final = semiFinal.map(item => item.final)
        const finalLabels = semiFinal.map(item => item.option)
        setResults(final)
        setLabels(finalLabels)
    }, [rankings])


    // customize these better with opacity rgba
    const colors =  [
      '#FF0000',
      '#5C7AEA',
      '#34BE82',
      '#FFA900',
      '#C6D57E',
      '#88E0EF',
      '#2F86A6',
      '#911F27',
      '#FFCC66',
      '#0E918C'
    ]
    const doughnutData = {
      labels: weightings.map(item => item.criterion),
      datasets: [{
        data: weightings.map(item => item.weightingPercent),
        backgroundColor: colors,
        hoverOffset: 4
      }]
    };

    const barData = {
      labels: labels,
      datasets: [{
        label: `Comparison of your options. 100% is the "perfect" choice.`,
        data: results,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor:["black"],
        borderWidth: 2
      }]
    };

    const plugins = [{
      beforeDraw: function(chart) {
       const width = chart.width,
           height = chart.height,
           ctx = chart.ctx;
           ctx.restore();
           const fontSize = (height / 1000).toFixed(2);
           ctx.font = fontSize + "sans-serif";
           ctx.textBaseline = "top";
           const text = `Weighted criteria out of 100%`,
           textX = Math.round((width - ctx.measureText(text).width) / 2),
           textY = height / 2;
           ctx.fillText(text, textX, textY);
           ctx.save();
      } 
    }]


  return (
    <>
    <Container>
    
      <Typography color="primary" variant="h6" mt={2}>{currentDecision.decision_text}</Typography>
      <Stack direction="row" alignItems="center" justifyContent="center">
      <Typography variant="h6" color="secondary">Your best option based on the proportional weighting of your critiera:</Typography>
      </Stack>
  </Container>
  <Stack justifyContent="space-evenly" alignItems="flex-start" direction="row" flexWrap="wrap">
    
    <div className="chart-container">

      <Bar data={barData} height={250}/>
    </div>
    <div className="chart-container">
   
      <Doughnut data={doughnutData} plugins={plugins}/>
    </div>
  </Stack>
  </>
  )

}

export default EndScreen