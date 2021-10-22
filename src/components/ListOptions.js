import React from 'react'
import { Box, Typography, Button} from '@mui/material'


const ListOptions = () => {
  return (
    <div className="option">
      <Typography>You options in this decision appear below:</Typography>
      <Button variant="contained">
        + Add A New Option
      </Button>

      <Button variant="contained">
        I'm Done Adding Options Take Me To Rankings 
      </Button>

    </div>
  )
}

export default ListOptions