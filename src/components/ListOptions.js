import React, { useState, useEffect } from 'react'
import { Divider, Typography, Button, Paper, Stack, Container} from '@mui/material'
import { Link, useLocation, useHistory } from 'react-router-dom'
import axios from 'axios'

import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';

const url = "https://make-my-decision.herokuapp.com"

const ListOptions = (props) => {
  const location = useLocation()
  const history = useHistory()
  const currentDecision = props.location.state.currentDecision

  const id = currentDecision.decision_id

  const criteria = props.location.state.criteria 

  


  const [options, setOptions] = useState([])

  

  useEffect(() => {
    axios.get(`${url}/options/for-decision/${id}`)
      .then((res) => {
        setOptions(res.data)
      })
    }, [])

    const handleDelete = (id) => {
      // delete on front end
      const updatedList = options.filter(option => option.option_id !== id)
      setOptions(updatedList)
      // delete on backend
      axios.delete(`${url}/options/${id}`)
      .then(res => res)
      .catch(err => console.log('There was an error', err))
  
    }

  return (
    <>
     <Container>
      <Typography mt={2} variant="h6">{currentDecision.decision_text}</Typography>
      {options.length ?
        <Typography mb={2}>Your options for this decision appear below:</Typography> :
        <Typography mb={2}>Your options for this decision will appear below. Click "ADD NEW OPTION" to add your first!</Typography>}
    </Container>
    <Stack spacing={1} direction="row" justifyContent="space-evenly" alignItems="center">
    <Button startIcon={<ArrowLeftIcon/>} variant="contained" onClick={()=>{history.goBack()}}>Go Back</Button>
      <Link to={{
              pathname: `/add-option/for-decision/${id}`,
              state: { currentDecision }
          }}><Button variant="contained" startIcon={<AddCircleIcon />}>
        Add A New Option
      </Button></Link>

      {options.length > 0 && <Link to={{
              pathname: `/rankings/for-decision/${id}`,
              state: { currentDecision, criteria }
          }}><Button variant="contained" endIcon={<ArrowRightIcon/>}>
        I'm Done Adding Options. Take Me To Rankings 
      </Button></Link>}

    </Stack>
    <ol>
      <Stack spacing={2} direction="row" flexWrap="wrap">
        {options.map(option => {
          return (
            <>
              <Paper elevation={4} style={{padding: "30px", margin: "10px"}}>
              <li key={option.option_id}>
                <Stack spacing={3} justifyContent="space-evenly">
                <Typography variant="h6">{option.option_text}</Typography>
                <Divider/>
                
                <Button startIcon={<DeleteIcon />} color="error" onClick={()=>{handleDelete(option.option_id)}}  alignSelf="flex-end">Delete</Button>
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

export default ListOptions