import React, { useEffect, useState } from 'react';
import Rating from '@mui/material/Rating';

const RatingComponent = ({ value, onChange }) => {
  return (
    <Rating
      name="rating"
      value={value}
      onChange={(event, newValue) => {
        onChange(newValue);
      }}
    />
  );
};

export default RatingComponent;



