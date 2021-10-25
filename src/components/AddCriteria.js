import React, { useState } from 'react';
import { 
  Button,
  TextField,
  Box,
  Typography,
  Stack,
  Paper,
  Rating,
  Container
 } from "@mui/material";
 import StarIcon from '@mui/icons-material/Star';
 import { Link, useLocation, useHistory } from 'react-router-dom'
 import axios from 'axios'



 const labels = {
  1: 'Less Important',
  2: 'Kindof Neutral',
  3: 'Somewhat Important',
  4: 'Important',
  5: 'Very Important',
};

const AddCriteria = (props) => {
    const location = useLocation()
    const history = useHistory()
    const currentDecision = props.location.state.currentDecision

    const id = currentDecision.decision_id

    const [criterion, setCriterion] = useState('')

    const [value, setValue] = useState(0)

    const [hover, setHover] = useState(-1);
   
    const handleChange = (e) => {
      e.preventDefault()
      setCriterion(e.target.value)
    }

    const handleSubmit = (e) => {
      e.preventDefault()
      axios.post(`http://localhost:4001/criteria/for-decision/${id}`, {
        criterion_text: criterion,
        criterion_importance: value
      }).then(res => console.log(res)).then(history.goBack())
    }
  
  return (
    <>
    <Container>
      <Typography>{`Decision: ${currentDecision.decision_text}`}</Typography>
    </Container>
      <form className="form" onSubmit={handleSubmit}>
          <Box mb={2}>
            <Typography variant="h6">What Critiera Would You Like To Add To This Decision?</Typography>
          </Box>
          
        <Stack spacing={3}>
        <TextField name="criterion_text" value={criterion.criterion_text} required="true" placeholder="Type Anything!" label="Type Anything!" onChange={(e)=>{handleChange(e)}}/>
        <Box mb={2}>
            <Typography variant="h6">How Important Is this Critiera To You?</Typography>
          </Box>
          <Box
            sx={{
              width: 400,
              height: 100,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Rating
              name="hover-feedback"
              precision={1}
              size="large"
              value={value}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
              onChangeActive={(event, newHover) => {
                setHover(newHover);
              }}
              emptyIcon={<StarIcon fontSize="50px" style={{ opacity: 0.55 }} fontSize="inherit" />}
            />
            {value !== null && (
              <Box sx={{ mt: 5}}>{labels[hover !== -1 ? hover : value]}</Box>
            )}
          </Box>
            <Button fullWidth = {true} 
            variant="contained"
            className="form-margin"
            type="submit"
            >
            Add
          </Button>
          
          </Stack>
      </form>
    </>
  )
}

export default AddCriteria;