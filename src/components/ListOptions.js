import React, { useState, useEffect } from 'react'
import { Divider, Typography, Button, Paper, Stack, Container} from '@mui/material'
import { Link, useLocation, useHistory } from 'react-router-dom'
import axios from 'axios'

import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DoubleArrowSharpIcon from '@mui/icons-material/DoubleArrowSharp';

const url = "http://localhost:4001"

const ListOptions = (props) => {
  const location = useLocation()
  const history = useHistory()
  const currentDecision = props.location.state.currentDecision

  const id = currentDecision.decision_id

  const criteria = props.location.state.criteria 

  


  const [options, setOptions] = useState([])

  

  useEffect(() => {
    console.log("Mounted");
    axios.get(`${url}/options/for-decision/${id}`)
      .then((res) => {
        console.log(res)
        setOptions(res.data)
      })
    }, [])

    const handleDelete = (id) => {
      // delete on front end
      const updatedList = options.filter(option => option.option_id !== id)
      setOptions(updatedList)
      // delete on backend
      axios.delete(`${url}/options/${id}`)
      .then(res => console.log(res))
      .catch(err => console.log('There was an error', err))
  
    }

  return (
    <>
     <Container>
      <Typography mt={2} variant="h6">{currentDecision.decision_text}</Typography>
      <Typography>Your options for this decision appear below:</Typography>
    </Container>
    <div className="option">
      <Link to={{
              pathname: `/add-option/for-decision/${id}`,
              state: { currentDecision }
          }}><Button variant="contained" startIcon={<AddCircleIcon />}>
        Add A New Option
      </Button></Link>

      {options.length > 0 && <Link to={{
              pathname: `/rankings/for-decision/${id}`,
              state: { currentDecision, criteria }
          }}><Button variant="contained" endIcon={<DoubleArrowSharpIcon/>}>
        I'm Done Adding Options. Take Me To Rankings 
      </Button></Link>}

    </div>
    <ol className="list">
      <Stack spacing={3}>
        {options.map(option => {
          return (
            <>
              <Paper elevation={4} style={{padding: "30px"}}>
              <li key={option.option_id}>
                <Stack spacing={1} direction="row" justifyContent="space-evenly">
                <Typography variant="h6">{option.option_text}</Typography>
                <Divider orientation="vertical" flexItem />
                
                <Button variant="contained" startIcon={<DeleteIcon />} color="error" onClick={()=>{handleDelete(option.option_id)}}  alignSelf="flex-end">Delete</Button>
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