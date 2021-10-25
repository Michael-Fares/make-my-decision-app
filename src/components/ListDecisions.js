import React, {useState, useEffect} from 'react'
import { Box, Typography, Button, Paper, Stack, Container} from '@mui/material'
import { Link, useLocation } from 'react-router-dom'

import axios from 'axios'
import AddDecision from './AddDecision'


const ListDecisions = () => {
  const user = localStorage.getItem('name')
  const [decisions, setDecisions] = useState([])

  // fetch the users decisions from backend when component mounts:

  useEffect(() => {
    const id = localStorage.getItem('id')
    console.log("Mounted");
    axios.get(`http://localhost:4001/decisions/for-user/${id}`)
      .then((res) => setDecisions(res.data));
    // The array is called a dependecy array
  }, []);

  const handleDelete = (id) => {
    // delete on front end
    const updatedList = decisions.filter(decision => decision.decision_id !== id)
    setDecisions(updatedList)
    // delete on backend
    axios.delete(`http://localhost:4001/decisions/${id}`)
    .then(res => console.log(res))
    .catch(err => console.log('There was an error', err))

  }

  return (
    <>
   
      {decisions.length ?
      <Container>
      <Typography variant="h6">{`Welcome ${user}! Your saved decisions are here:`}</Typography>
      <Typography>Click "Manage" to start adding criteria and options!</Typography>
      </Container>
      :
      <Container>
      <Typography variant="h6">{`Welcome ${user}!`}</Typography>
      <Typography>You don't have any saved decisions yet, click "Add New Decision" to make your first!</Typography>
      </Container>
      }
       <div className="option">
      <Link to="/add-decision">
      <Button variant="contained">
        + Add New Decision
      </Button>
      </Link>
  
    </div>
    <ol className="list">
      <Stack spacing={3}>
      {decisions.map(decision => {
        return (
          <Paper elevation={4} style={{padding: '30px'}}>
          <li id={decision.decision_id} key={decision.decision_id}>
            <Box mb={2}><Typography variant="h6">{decision.decision_text}</Typography></Box>
            
            <Stack spacing={2} direction="row">
            {decision.criteria_count === 0 ? <Typography><span>Criteria: </span>No critiera for this decision yet</Typography> : 
            <Typography><span>Criteria:</span> {decision.criteria_count}</Typography>}
            {decision.option_count === 0 ? <Typography><span>Options: </span>No options for this decision yet</Typography> : 
            <Typography><span>Options:</span> {decision.option_count}</Typography>}
            </Stack>
            <Box mt={2}>
            <Stack direction="row" spacing={4}>
            <Link to={{
              pathname: `/list-criteria/for-decision/${decision.decision_id}`,
              state: { decisions }
          }}
          ><Button variant="contained">Manage</Button></Link>
            <Button variant="contained" color="error" onClick={()=>{handleDelete(decision.decision_id)}}>Delete</Button>
            </Stack>
            </Box>
          </li>
          </Paper>
        )
      })}
      </Stack>
    </ol>
    </>
  )
}

export default ListDecisions;