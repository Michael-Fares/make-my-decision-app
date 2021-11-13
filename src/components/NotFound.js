import React, { useState } from 'react';
import axios from 'axios'
import { 
  Button,
  TextField,
  Box,
  Typography,
  Stack,
  Paper,
  LinearProgress
 } from "@mui/material";
import { useHistory } from 'react-router-dom'


const NotFound = (props) => {
  let history = useHistory();

  return (
    <>
    
      <Stack  alignItems="center" justifyContent="center">
        <Box mt={25} sx={{width: "80%"}}>
          <Stack alignItems="center" justifyContent="center">
            <Typography mb={2} variant="h5" color="primary">404 Not Found. Whoops! Looks like there is nothing here.</Typography>
          </Stack>
          </Box>
              <Button variant="outlined" onClick={() => {history.goBack()}}>Go Back</Button>
      </Stack>

    </>
  )
}

export default NotFound;