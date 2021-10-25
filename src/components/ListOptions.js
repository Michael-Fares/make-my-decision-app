import React, { useState, useEffect } from 'react'
import { Box, Typography, Button, Paper, Stack, Container} from '@mui/material'
import axios from 'axios'
import { Link, useLocation, useHistory } from 'react-router-dom'

const ListOptions = (props) => {
  const location = useLocation()
  const history = useHistory()
  const currentDecision = props.location.state.currentDecision

  const id = currentDecision.decision_id
  console.log('current decision', props.location.state.currentDecision)


  const [options, setOptions] = useState([])

  useEffect(() => {
    console.log("Mounted");
    axios.get(`http://localhost:4001/options/for-decision/${id}`)
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
      axios.delete(`http://localhost:4001/options/${id}`)
      .then(res => console.log(res))
      .catch(err => console.log('There was an error', err))
  
    }

  return (
    <>
     <Container>
      <Typography variant="h6">{currentDecision.decision_text}</Typography>
      <Typography>Your options for this decision appear below:</Typography>
    </Container>
    <div className="option">
      <Link to={{
              pathname: `/add-option/for-decision/${id}`,
              state: { currentDecision }
          }}><Button variant="contained">
        + Add A New Option
      </Button></Link>

      <Button variant="contained">
        I'm Done Adding Options Take Me To Rankings 
      </Button>

    </div>
    <ol className="list">
      <Stack spacing={3}>
        {options.map(option => {
          return (
            <>
              <Paper elevation={4} style={{padding: "30px"}}>
              <li key={option.option_id}>
                <Stack spacing={1}>
                <Typography variant="h6">{option.option_text}</Typography>
                </Stack>
                <Box mt={2}>
                <Button variant="contained" color="error" onClick={()=>{handleDelete(option.option_id)}}>Delete</Button>
                </Box>
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