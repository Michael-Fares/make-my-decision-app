import React, { useState } from 'react';
import { 
  Button,
  TextField,
  Box,
  Typography,
  Stack,
  Container,
  Paper,
  LinearProgress
 } from "@mui/material";

 import { useHistory } from 'react-router-dom'
 import axios from 'axios'
 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWeightHanging } from "@fortawesome/free-solid-svg-icons";

const url = "https://make-my-decision-server.fly.dev"

const AddCriteria = (props) => {
    const history = useHistory()
    const currentDecision = props.location.state.currentDecision
    const id = currentDecision.decision_id
    const [criterion, setCriterion] = useState("")
    const [selectedOption, setSelectedOption] = useState("")
    const [adding, setAdding] = useState(false)

    const isEnabled = selectedOption !== "";
   
    const handleChange = (e) => {
      e.preventDefault()
      setCriterion(e.target.value)
    }

    const handleOptionChange = (e) => {
      setSelectedOption(e.target.value);
    }

    const handleSubmit = (e) => {
      e.preventDefault()
      axios.post(`${url}/criteria/for-decision/${id}`, {
        criterion_text: criterion,
        criterion_importance: selectedOption
      }).then(res => res).then(setCriterion(""), setSelectedOption("")).then(() => {
        setAdding(true)
        setTimeout(() =>
        history.goBack()
        ,1000)
      }
        )
      .catch(err => console.log('there was an error', err))
    }
  
  return (
    <>
    {!adding ? 
    <>
      <Container>
        <Typography variant="h6" mt={2}>{`${currentDecision.decision_text}`}</Typography>
      </Container>
        <form className="form" onSubmit={(e) => handleSubmit(e)}>
        <Paper elevation={4} style={{padding: "40px"}}>
            <Box mb={2}>
              <Typography variant="h6">What criteria would you like to add to this decision?</Typography>
            </Box>
            
          <Stack spacing={3}>
          <TextField name="criterion" value={criterion} required="true" placeholder="Type Anything!" label="Type Anything!" onChange={(e)=>{handleChange(e)}}/>
          <Box mb={2}>
              <Typography variant="h6">How important is this criteria to you?</Typography>
            </Box>
            
            <Stack
              spacing={8}
              direction="row"
              justifyContent="center"
              alignItems="center"
            >
              <Stack spacing={1} justifyContent="center" alignItems="center">
                <label className="container2" htmlFor="less-important">
                  <input
                    name="weight"
                    type="radio"
                    id="less-important"
                    value="1"
                    onChange={(e) => handleOptionChange(e)}
                    checked={selectedOption === "1"}
                    required
                  />
                  <FontAwesomeIcon
                    className="checkmark2 less-important"
                    icon={faWeightHanging}
                  />
                  <Typography className="weight-label">Less Important</Typography>
                </label>
              </Stack>

              <Stack spacing={1} justifyContent="center" alignItems="center">
                <label className="container2" htmlFor="kindof-neutral">
                  <input
                    name="weight"
                    type="radio"
                    id="kindof-neutral"
                    value="2"
                    onChange={(e) => handleOptionChange(e)}
                    checked={selectedOption === "2"}
                    required
                  />
                  <FontAwesomeIcon
                    className="checkmark2 kinda-neutral"
                    icon={faWeightHanging}
                  />
                  <Typography className="weight-label">Kindof Neutral</Typography>
                </label>
              </Stack>

              <Stack spacing={1} justifyContent="center" alignItems="center">
                <label className="container2" htmlFor="somewhat-important">
                  <input
                    name="weight"
                    type="radio"
                    id="somewhat-important"
                    value="3"
                    onChange={(e) => handleOptionChange(e)}
                    checked={selectedOption === "3"}
                    required
                  />
                  <FontAwesomeIcon
                    className="checkmark2 somewhat-important"
                    icon={faWeightHanging}
                  />
                  <Typography className="weight-label">
                    Somewhat Important
                  </Typography>
                </label>
              </Stack>

              <Stack spacing={1} justifyContent="center" alignItems="center">
                <label className="container2" htmlFor="important">
                  <input
                    name="weight"
                    type="radio"
                    id="important"
                    value="4"
                    onChange={(e) => handleOptionChange(e)}
                    checked={selectedOption === "4"}
                    required
                  />
                  <FontAwesomeIcon
                    className="checkmark2 important"
                    icon={faWeightHanging}
                  />
                  <Typography className="weight-label">Important</Typography>
                </label>
              </Stack>

              <Stack spacing={1} justifyContent="center" alignItems="center">
                <label className="container2" htmlFor="very-important">
                  <input
                    name="weight"
                    type="radio"
                    id="very-important"
                    value="5"
                    onChange={(e) => handleOptionChange(e)}
                    checked={selectedOption === "5"}
                    required
                  />
                  <FontAwesomeIcon
                    className="checkmark2 very-important"
                    icon={faWeightHanging}
                  />
                  <Typography className="weight-label">Very Important</Typography>
                </label>
              </Stack>
            </Stack>
          </Stack>
              <Box mt={15}>
              <Button fullWidth = {true} 
              variant="contained"
              className="form-margin"
              type="submit"
              disabled={!isEnabled}
              >
              Add
            </Button>
            </Box>
          </Paper> 
        </form> 
      </> : 
      <Stack  alignItems="center" justifyContent="center">
          <Box mt={25} sx={{width: "80%"}}>
              <Stack alignItems="center" justifyContent="center">
                <Typography mb={2} variant="h4" color="primary">Adding Criteria!</Typography>
              </Stack>
            <LinearProgress />
          </Box>
      </Stack> 
      }
    </>
  )
}

export default AddCriteria;