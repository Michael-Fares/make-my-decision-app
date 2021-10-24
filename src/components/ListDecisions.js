import React, {useState, useEffect} from 'react'
import { Box, Typography, Button, Paper, Stack, Chip} from '@mui/material'
import { Link, useLocation } from 'react-router-dom'

import axios from 'axios'


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

  return (
    <>
    <div className="option">
      {decisions.length ?
      <div>
      <Typography>{`Welcome ${user}! Your saved decisions are here:`}</Typography>
      <Typography>Click "Manage" to start adding criteria and options!</Typography>
      </div>
      :
      <div>
      <Typography>{`Welcome ${user}!`}</Typography>
      <Typography>You don't have any saved decisions yet, click "Add New Decision" to make your first!</Typography>
      </div>
      }

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
            <Link to={{
              pathname: `/list-criteria/for-decision/${decision.decision_id}`,
              state: { decisions }
          }}
          ><Button variant="contained">Manage</Button></Link>
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