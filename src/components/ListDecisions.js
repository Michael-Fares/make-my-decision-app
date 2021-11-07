import React, {useState, useEffect} from 'react'
import { Box, Typography, Button, Paper, Stack, Container, Chip, Divider} from '@mui/material'
import { Link } from 'react-router-dom'

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';

import axios from 'axios'
const url = "https://make-my-decision.herokuapp.com"

const ListDecisions = () => {
  const user = localStorage.getItem('name')
  const [decisions, setDecisions] = useState([])
  const [quote, setQuote] = useState(null)

  // fetch the users decisions from backend when component mounts:

  useEffect(() => {
    const id = localStorage.getItem('id')
    console.log("Mounted");
    axios.get(`${url}/decisions/for-user/${id}`)
      .then((res) => setDecisions(res.data));
    // The array is called a dependecy array
  }, []);

  // fetch quote of the day

  useEffect(() =>{
    axios.get("https://type.fit/api/quotes")
      .then(res => {
        console.log(res.data)
        const quotes = res.data
        console.log('qupotes', quotes)
        const randomQuote = quotes[Math.floor(Math.random()*quotes.length)]
        console.log('rand quote', randomQuote)
        setQuote(randomQuote)
      })
  }, [])

  const handleDelete = (id) => {
    // delete on front end
    const updatedList = decisions.filter(decision => decision.decision_id !== id)
    setDecisions(updatedList)
    // delete on backend
    axios.delete(`${url}/decisions/${id}`)
    .then(res => console.log(res))
    .catch(err => console.log('There was an error', err))

  }

  return (
    <>
    <Stack spacing={1} direction="row" justifyContent="space-between" alignItems="center">
      {decisions.length ?
      <Container>
      <Typography mt={2} variant="h6">{`Welcome ${user}! Your saved decisions are here:`}</Typography>
      <Typography mb={2}>Click "MANAGE" to start adding criteria and options!</Typography>
      </Container>
      :
      <Container>
      <Typography mt={2} variant="h6">{`Welcome ${user}!`}</Typography>
      <Typography mb={2}>You don't have any saved decisions yet, click "Add New Decision" to make your first!</Typography>
      </Container>
      }
      <Container>
      {quote && 
        <Stack>
          <Typography mt={2}>Your quote of the day:</Typography>
          <Typography color="secondary" variant="subtitle2"><i>
            {quote.text}
            </i></Typography>
            <Typography color="secondary" variant="subtitle2">
            {!quote.author ? `- Anonymous` : `- ${quote.author}`}
            </Typography>
          </Stack>}
          </Container>
        </Stack>
        

     <Container>
    <Stack direction="row" spacing={1} justifyContent="space-between" alignItems="center">
        <Link to="/add-decision">
        <Button variant="contained" startIcon={<AddCircleIcon />}>
          Add New Decision
        </Button>
        </Link>
       
    </Stack>
    </Container> 
    
      
      <ol>
        <Stack spacing={2} direction="row" flexWrap="wrap">
      {decisions.map(decision => {
        return (
          <Paper elevation={4} style={{padding: '30px', margin: '10px'}}>
          <li id={decision.decision_id} key={decision.decision_id}>
            <Box mb={2}><Typography variant="h6">{decision.decision_text}</Typography></Box>
            
            <Stack spacing={2} direction="row">
            {decision.criteria_count === 0 ? <Typography><span>Criteria: </span>None yet</Typography> : 
            <Typography><span>Criteria:</span> <Chip label={decision.criteria_count} /></Typography>}
            {decision.option_count === 0 ? <Typography><span>Options: </span>None yet</Typography> : 
            <Typography><span>Options:</span> <Chip label={decision.option_count} /></Typography>}
            </Stack>
            <Box mt={2}>
            <Stack direction="row" spacing={4}>
            <Link to={{
              pathname: `/list-criteria/for-decision/${decision.decision_id}`,
              state: { decisions }
          }}
          >
            <Button  startIcon={<EditIcon />}>Manage </Button></Link>
            <Button startIcon={<DeleteIcon />} color="error" onClick={()=>{handleDelete(decision.decision_id)}}>Delete</Button>
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