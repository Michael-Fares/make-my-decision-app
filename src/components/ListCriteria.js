import React, { useState, useEffect } from 'react'
import { Box, Typography, Button, Container, Stack, Paper, Rating, Divider } from '@mui/material'
import { Link, useLocation } from 'react-router-dom'
import axios from 'axios'

const url = "http://localhost:4001"


const ListCriteria = (props) => {

  const location = useLocation()
  const id = props.match.params.id
  const decisions = props.location.state.decisions
  const currentDecision = decisions.find(decision => decision.decision_id == id)
  console.log('current decision', currentDecision)
  console.log('props', props)
  console.log('id', id)

  const [criteria, setCriteria] = useState([])

  useEffect(() => {
    console.log("Mounted");
    axios.get(`${url}/criteria/for-decision/${id}`)
      .then((res) => {
        console.log(res)
        const rawCriteria = res.data
        const qualitativeCriteria = rawCriteria.map(criterion => {
          if(criterion.criterion_importance === 5) {
            return {...criterion, quality: "Very Important"}
          } else if (criterion.criterion_importance === 4) {
            return {...criterion, quality: "Important"}
          } else if (criterion.criterion_importance === 3) {
            return {...criterion, quality: "Somewhat Important"}
          } else if (criterion.criterion_importance === 2) {
            return {...criterion, quality: "Kindof Neutral"}
          } else {
            return {...criterion, quality: "Less Important"}
          }
        })

        setCriteria(qualitativeCriteria)
      });
    // The array is called a dependecy array
  }, []);

  const handleDelete = (id) => {
    // delete on front end
    const updatedList = criteria.filter(criterion => criterion.criterion_id !== id)
    setCriteria(updatedList)
    // delete on backend
    axios.delete(`${url}/criteria/${id}`)
    .then(res => console.log(res))
    .catch(err => console.log('There was an error', err))

  }

  return (
    <>
    <Container>
      <Typography variant="h6">{currentDecision.decision_text}</Typography>
      <Typography>Criteria important to you in this decision appear below:</Typography>
    </Container>
  
    <div className="option">
      
      <Link to={{
              pathname: `/add-criteria/for-decision/${id}`,
              state: { 
                currentDecision
              }
          }}><Button variant="contained">
        + Add A New Criteria
      </Button></Link>

      <Link to={{
              pathname: `/list-options/for-decision/${id}`,
              state: { currentDecision , criteria }
          }}><Button variant="contained">
        I'm Done Adding Criteria, Take Me To Options 
      </Button></Link>

    </div>
    <ol className="list">
      <Stack spacing={3}>
        {criteria.map(criterion => {
          return (
            <>
              <Paper elevation={4} style={{padding: "30px"}}>
              <li key={criterion.criterion_id}>
                <Stack spacing={1} direction="row" justifyContent="space-evenly">
                <Typography variant="h6">{criterion.criterion_text}</Typography>
                <Divider orientation="vertical" flexItem />
                <Typography>{`${criterion.quality} to you.`}</Typography>
                <Divider orientation="vertical" flexItem />
                <Rating name="read-only" value={criterion.criterion_importance} readOnly />
                <Divider orientation="vertical" flexItem />
                
                
                <Button variant="contained" color="error" onClick={()=>{handleDelete(criterion.criterion_id)}}>Delete</Button>
               
                </Stack>
              </li>
              </Paper>
            </>
          )
        })}
        </Stack>
      </ol>
      
    </>
  )
}

export default ListCriteria