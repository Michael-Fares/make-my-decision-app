import React from 'react'
import { Box, Typography, Button} from '@mui/material'


const ListCriteria = () => {
  return (
    <>
    <div className="option">
    <Typography>Criteria important to you in this decision appear below:</Typography>
    </div>
    <div className="option">
      
      <Button variant="contained">
        + Add A New Criteria
      </Button>

      <Button variant="contained">
        I'm Done Adding Criteria, Take Me To Options 
      </Button>

    </div>
    </>
  )
}

export default ListCriteria