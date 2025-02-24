import React from 'react';
import { PulseLoader } from 'react-spinners';

const LoadingSpinner = ({ size = 13, color = '#334155' }) => {
  return (
    <div className="flex flex-col items-center justify-center py-[2rem]">
      <PulseLoader color={color} size={size} />
    </div>
  );
};

export default LoadingSpinner;
