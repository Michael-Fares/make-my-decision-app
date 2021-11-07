import React, { useState, useEffect } from 'react'
import { Box, Typography, Button, Container, Stack, Paper, Divider } from '@mui/material'
import { Link, useLocation, useHistory } from 'react-router-dom'
import axios from 'axios'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWeightHanging } from "@fortawesome/free-solid-svg-icons";

import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';

const url = "https://make-my-decision.herokuapp.com"


const ListCriteria = (props) => {
  const history = useHistory()
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
            return {...criterion, quality: "Very Important", class: "very-important"}
          } else if (criterion.criterion_importance === 4) {
            return {...criterion, quality: "Important", class: "important"}
          } else if (criterion.criterion_importance === 3) {
            return {...criterion, quality: "Somewhat Important", class: "somewhat-important"}
          } else if (criterion.criterion_importance === 2) {
            return {...criterion, quality: "Kindof Neutral", class: "kinda-neutral"}
          } else {
            return {...criterion, quality: "Less Important", class: "less-important"}
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
  const isEnabled = criteria.length;

  return (
    <>
    <Container>
      <Typography mt={2} variant="h6">{currentDecision.decision_text}</Typography>
      {criteria.length ?
        <Typography mb={2}>Criteria important to you in this decision appear below:</Typography> :
        <Typography mb={2}>Criteria important to you in this decision will appear below. Click "ADD A NEW CRITERIA" to add your first!</Typography>
        }
    </Container>
    
    <Container>
    <Stack spacing={1} direction="row" justifyContent="space-evenly" alignItems="center">
      <Button startIcon={<ArrowLeftIcon/>} variant="contained" onClick={()=>{history.goBack()}}>Go Back</Button>
      <Link to={{
              pathname: `/add-criteria/for-decision/${id}`,
              state: { 
                currentDecision
              }
          }}><Button variant="contained" startIcon={<AddCircleIcon />}>
        Add A New Criteria
      </Button></Link>

      {criteria.length > 0 && <Link to={{
              pathname: `/list-options/for-decision/${id}`,
              state: { currentDecision , criteria }
          }}><Button variant="contained" endIcon={<ArrowRightIcon/>}>
        I'm Done Adding Criteria, Take Me To Options 
      </Button></Link>}

    </Stack>
    </Container>
    <ol>
      <Stack spacing={2} direction="row" flexWrap="wrap">
        {criteria.map(criterion => {
          return (
            <>
              <Paper elevation={4} style={{padding: "30px", margin: "10px"}}>
              <li key={criterion.criterion_id}>
                <Stack spacing={3}>
                  <Stack spacing={5} direction="row" justifyContent="space-between">
                    <Typography variant="h6">{criterion.criterion_text}</Typography>
                    <FontAwesomeIcon
                        className={`${criterion.class} card-weight`}
                        icon={faWeightHanging}
                      />
                  </Stack>
                    <Divider />
                    <Typography color="primary">{`${criterion.quality} to you.`}</Typography>
                    <Divider />
                 
                  
                  
                  <Button startIcon={<DeleteIcon />} color="error" onClick={()=>{handleDelete(criterion.criterion_id)}}>Delete</Button>
               
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