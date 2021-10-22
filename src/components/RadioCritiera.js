import * as React from 'react';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';

const labels = {
  1: 'Less Important',
  2: 'Kindof Neutral',
  3: 'Somewhat Important',
  4: 'Important',
  5: 'Very Important',
};

export default function HoverRating() {
  const [value, setValue] = React.useState(0);
  const [hover, setHover] = React.useState(-1);

  return (
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
        value={value}
        precision={1}
        size="large"
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        onChangeActive={(event, newHover) => {
          setHover(newHover);
        }}
        emptyIcon={<StarIcon fontSize="50px" style={{ opacity: 0.55 }} fontSize="inherit" />}
      />
      {value !== null && (
        <Box sx={{ mt: 5 }}>{labels[hover !== -1 ? hover : value]}</Box>
      )}
    </Box>
  );
}