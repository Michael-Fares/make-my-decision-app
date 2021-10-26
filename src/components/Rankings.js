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
  PaginationItem } from '@mui/material'
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
    
    <Pagination count={rankings.length || 1}>
      {rankings.map((ranking, index) => {
        return (
          <PaginationItem key={index}>
            <form className="form" key={index}>
              <Typography variant="h6">{`How do you feel about ${ranking.option} on ${ranking.criterion}?`}</Typography>
            </form>
          </PaginationItem>
        )
      })}
    </Pagination>
  
  )
}

export default Rankings
