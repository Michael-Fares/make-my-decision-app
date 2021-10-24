import React, { useState, useEffect } from 'react'
import { Box, Typography, Button, Container} from '@mui/material'
import { Link, useLocation } from 'react-router-dom'
import axios from 'axios'


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
    axios.get(`http://localhost:4001/criteria/for-decision/${id}`)
      .then((res) => setCriteria(res.data));
    // The array is called a dependecy array
  }, []);

  return (
    <>
   
    <Container>
      <Typography variant="h6">{currentDecision.decision_text}</Typography>
      <Typography>Criteria important to you in this decision appear below:</Typography>
    </Container>
  
    <div className="option">
      
      <Link to={{
              pathname: `/add-criteria/for-decision/${id}`,
              state: { currentDecision }
          }}><Button variant="contained">
        + Add A New Criteria
      </Button></Link>

      <Button variant="contained">
        I'm Done Adding Criteria, Take Me To Options 
      </Button>

    </div>
    </>
  )
}

export default ListCriteria