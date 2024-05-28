import React, { useContext, useState } from 'react';
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Button, Paper, Dialog, DialogTitle, DialogContentText, DialogContent, DialogActions } from '@mui/material';
import ModuleService from '../Service/ModuleService';
import { useNavigate, useLocation } from 'react-router-dom';
import { AppContext } from './AppContext';


let clickedModule = 0;

const ModuleList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const deleteModuleHandler = useContext(AppContext).handleDeleteModule;
  const {modulesData, setModulesData} = useContext(AppContext);
  const currentUser = useContext(AppContext).currentUser;

  

  const handleUpdateClick = (id) => {
    const currentPath = location.pathname;
    const updatedPath = `${currentPath}/updateModule/${id}`;
    
    navigate(updatedPath);
  }

  const handleClickOpen = (module, event) => {
    clickedModule = module;
    event.stopPropagation();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {

    const currentPath = location.pathname;
    // Delete the tank
    deleteModuleHandler(clickedModule);
    // navigate(currentPath);
    // window.location.reload();
    setOpen(false);
  };


  const propertyNames = modulesData.length > 0 ? Object.keys(modulesData[0]) : [];
  if (modulesData.length === 0) {
    return (
      <Paper sx={{ width: '100%', overflow: 'hidden', background: '#1a1a1a', color: '#f2f2f2' }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell
                  align="center"
                  sx={{
                    borderRight: '1px solid #43423c',
                    fontWeight: 'bold',
                    background: '#302f2d',
                    color: '#8c8c7c',
                    fontSize: '12px',
                  }}
                >
                  NO MODULES FOUND
                </TableCell>
              </TableRow>
            </TableHead>
          </Table>
        </TableContainer>
      </Paper>
    );
  }

  else {

    return (
      <Paper sx={{ width: '100%', overflow: 'hidden', background: '#1a1a1a', color: '#f2f2f2' }}>

        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                {propertyNames
                  .filter((name) => modulesData.some((component) => component[name] !== null)) // Filter out properties with null values in at least one component
                  .concat('OPTIONS') // Add OPTIONS column header
                  .map((name) => (
                    <TableCell
                      key={name}
                      align="center"
                      sx={{
                        borderRight: '1px solid #43423c',
                        fontWeight: 'bold',
                        background: '#302f2d',
                        color: '#8c8c7c',
                        fontSize: '12px',
                      }}
                    >
                      {name.toUpperCase()}
                    </TableCell>
                  ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {modulesData.map((component, index) => (
                <TableRow
                  key={index}
                  sx={{
                    height: "59px",
                    cursor: 'pointer',
                    '&:hover': {
                      '.MuiTableCell-root': {
                        backgroundColor: 'rgba(100, 100, 100, 0.2) !important',
                      },
                    },
                  }}
                >
                  {propertyNames
                    .filter((prop) => component[prop] !== null) // Filter out properties with null values in the current component
                    .map((prop) => (
                      <TableCell
                        key={prop}
                        sx={{
                          padding: '0px',
                          backgroundColor: '#1c1c1e',
                          borderBottom: '1px solid #43423c',
                          color: '#b8b8a2'
                        }}
                        align="center"
                      >
                        {component[prop]}
                      </TableCell>
                    ))}
                  <TableCell // Add OPTIONS column with delete and update buttons
                    sx={{
                      padding: '0px',
                      backgroundColor: '#1c1c1e',
                      borderBottom: '1px solid #43423c',
                      color: '#b8b8a2'
                    }}
                    align="center"
                  >
                    {currentUser.role !== 'USER' && <Button data-testid="deleteButton" onClick={(event) => handleClickOpen(component, event)}>Delete</Button>}
                    {currentUser.role !== 'USER' && <Button data-testid="updateButton" onClick={(event) => handleUpdateClick(component.id, event)}>Update</Button>}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Confirm Delete"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to delete this module?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button id="comfirmDelete" onClick={handleDelete} color="secondary" autoFocus>
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      </Paper>
    );
  }

}
export default ModuleList;
