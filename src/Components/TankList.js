import { useNavigate } from 'react-router-dom';
import { Table, TableHead, TableCell, TableRow, TableContainer, Paper, TableBody, TablePagination } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import Button from '@mui/material/Button';


const randColor = () =>  {
    return "#" + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0').toUpperCase();
}

let clickedTank = 0;
const TankList = ({ tankList, deleteTankHandler, displayChartDataHandler }) => {
    
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(7);
    const [open, setOpen] = useState(false);

    const history = useNavigate();


    const getCurrentPageElems = (newPage)=>{
        return tankList.slice(newPage * rowsPerPage, newPage * rowsPerPage + rowsPerPage);
    }
    const handleChangePage =(event, newPage) =>{
        setPage(newPage);
    }

    

    useEffect(()=>{
        const data = tankList.reduce((acc, item) => {
            acc[item.country] = (acc[item.country] || 0) + 1;
            return acc;
          }, {});
          let pieChartDataAux = [];
          Object.keys(data).forEach((key)=>{
            pieChartDataAux.push({label: key, value: data[key], color: randColor()});
          });
        
        displayChartDataHandler(pieChartDataAux);
    },[tankList])


    

    


    const handleChangeRowsPerPage = (event) =>{
        setRowsPerPage(+event.target.value);
        setPage(0);
    }



    
    const handleRowClick = (tankId) => {
        history(`/tanks/${tankId}`);
    };



    const handleUpdateClick = (tankId, event) => {
        
        event.stopPropagation();
        history(`/tanks/update/${tankId}`);
    }


   

    const handleClickOpen = (tank, event) => {

        clickedTank = tank;
        event.stopPropagation();
        setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  
    const handleDelete = () => {
        // Delete the tank
        deleteTankHandler(clickedTank.id);
        history(`/tanks`);
        
        setOpen(false);
    };

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden', background: '#1a1a1a', color: '#f2f2f2' }}>
            <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TableCell style={{ color: '#f2f2f2', fontWeight: 'bold', background: '#373737', borderTop: '3px solid #555' }}>Tank Name</TableCell>
                            <TableCell style={{ color: '#f2f2f2', fontWeight: 'bold', background: '#373737' }}>Country</TableCell>
                            <TableCell style={{ color: '#f2f2f2', fontWeight: 'bold', background: '#373737' }}>Type</TableCell>
                            <TableCell style={{ color: '#f2f2f2', fontWeight: 'bold', background: '#373737' }}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {getCurrentPageElems(page).map((row) => (
                            <TableRow key={row.name} onClick={() => handleRowClick(row.id)} style={{ cursor: 'pointer', borderBottom: '1px solid #555', background: '#2a2a2a' }}>
                                <TableCell style={{ color: '#ddd' }}>{row.name}</TableCell>
                                <TableCell style={{ color: '#ddd' }}>{row.country}</TableCell>
                                <TableCell style={{ color: '#ddd' }}>{row.type}</TableCell>
                                <TableCell style={{ color: '#ddd' }}>
                                    <Button data-testid = "updateButton" onClick={(event) => handleUpdateClick(row.id, event)}>Update</Button>
                                    <Button data-testid = "deleteButton"onClick={(event) => handleClickOpen(row, event)}>Delete</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                style={{ background: '#333', color: 'white' }}
                rowsPerPageOptions={[5, 10, 25, 100]}
                component="div"
                count={tankList.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />

<Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{"Confirm Delete"}</DialogTitle>
            <DialogContent>
            <DialogContentText id="alert-dialog-description">
                Are you sure you want to delete this tank?
            </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button onClick={handleClose} color="primary">
                Cancel
            </Button>
            <Button data-testid="submit" onClick={handleDelete} color="secondary" autoFocus>
                Confirm
            </Button>
            </DialogActions>
            </Dialog>
        </Paper>
    );
}

export default TankList;
