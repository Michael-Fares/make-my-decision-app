import React from 'react'
import { Box, Typography, Button} from '@mui/material'
import { Link } from 'react-router-dom'


const ListDecisions = () => {
  return (
    <div className="option">
      <Typography>Your saved decisions appear below:</Typography>

      <Link to="/add-decision">
      <Button variant="contained">
        + Add New Decision
      </Button>
      </Link>
  
    </div>
  )
}

export default ListDecisions;