import React from 'react';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import { useHistory, useNavigate } from 'react-router-dom';

const AddModuleButton = ({ label, to }) => {
  const history = useNavigate();

  const handleClick = () => {
    history(to);  
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Button
        variant="outlined"
        color="primary"
        onClick={handleClick}
        style={{
          width: '50px',
          height: '50px',
          borderRadius: '10px',
          marginBottom: '10px',
          border: '1px solid #43423c', // Border color
          background: 'transparent', // Transparent background
        }}
      >
        <AddIcon style={{ fontSize: '50px', color: '#43423c' }} />
      </Button>
      <div>{label}</div>
    </div>
  );
};

export default AddModuleButton;