import { useNavigate } from 'react-router-dom';
import { Table, TableHead, TableCell, TableRow, TableContainer, Paper, TableBody, TablePagination, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from '@mui/material';
import React, { useEffect, useState, useContext } from 'react';
import { TankDataContext } from './TankDataContext';
import Button from '@mui/material/Button';








const countryFlag = {
    Germany: '/germany.png',
    USA: '/united-states.png',
    UK: '/united-kingdom.png',
    Russia: '/russia.png',
    Japan: '/japan.png',
    France: '/france.png',
};
const randColor = () =>  {
    return "#" + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0').toUpperCase();
}

let clickedTank = 0;
const TankList = ({deleteTankHandler, displayChartDataHandler }) => {

    const tankList = useContext(TankDataContext);
    
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
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
            acc[item.tankCountry] = (acc[item.tankCountry] || 0) + 1;
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
                    <TableHead sx={{
                        height:"50px",
                        

                }}>
                       
                        <TableRow>
                            <TableCell align="center" sx={
                                {
                                    
                                    borderRight: '1px solid #43423c',
                                    align: 'center',
                                    fontWeight: 'bold', 
                                    background: '#302f2d',
                                    color:'#8c8c7c',
                                    fontSize: '12px',

                                    
                                }
                            }>VEHICLE NAME</TableCell>
                            <TableCell align="center" sx={
                                {
                                    borderRight: '1px solid #43423c',
                                    align: 'center',
                                    fontWeight: 'bold', 
                                    background: '#302f2d',
                                    color:'#8c8c7c',
                                    fontSize: '12px',
                                    
                                }
                            }>COUNTRY</TableCell>
                            <TableCell align="center" sx={
                                {
                                    borderRight: '1px solid #43423c',
                                    align: 'center',
                                    fontWeight: 'bold', 
                                    background: '#302f2d',
                                    color:'#8c8c7c',
                                    fontSize: '12px',
                                    
                                }
                            }>TYPE</TableCell>
                            <TableCell align="center" sx={
                                {
                                    borderRight: '1px solid #43423c',
                                        
                                    fontWeight: 'bold', 
                                    background: '#302f2d',
                                    color:'#8c8c7c',
                                    fontSize: '12px',
                                    
                                }
                            }>ACTIONS</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {getCurrentPageElems(page).map((row) => (
                            <TableRow
                                key={row.id}
                                onClick={() => handleRowClick(row.id)}
                                sx={{
                                    height: "59px",
                                    cursor: 'pointer',
                                    '&:hover': {
                                        '.MuiTableCell-root': {
                                        backgroundColor: 'rgba(100, 100, 100, 0.2) !important', // Example hover color
                                        },
                                    },}}>
                                <TableCell  
                                sx={{
                                    padding: '0px',
                                     backgroundColor: '#1c1c1e',
                                    borderBottom: '1px solid #43423c',
                                    color: '#b8b8a2'
                                }}
                                align="center" >{row.tankName}</TableCell>
                                <TableCell 
                                    sx={{
                                        padding: '0px',
                                        backgroundColor: '#1c1c1e',
                                        borderBottom: '1px solid #43423c',
                                        color: '#b8b8a2'
                                    }}
                                    align="center">
                                        <img style={{height:27, width:27}}src={require('./Resources'+countryFlag[row.tankCountry])} /></TableCell>
                                <TableCell 
                                sx={{
                                    padding: '0px',
                                     backgroundColor: '#1c1c1e',
                                    borderBottom: '1px solid #43423c',
                                    color: '#b8b8a2' 
                                }}
                                align="center">{row.tankType}</TableCell>
                                <TableCell
                                 sx={{
                                    padding: '0px',
                                    backgroundColor: '#1c1c1e',
                                    color: '#b8b8a2',
                                    borderBottom: '1px solid #43423c',
                                }}
                                align="center">
                                    <Button data-testid = "updateButton" onClick={(event) => handleUpdateClick(row.id, event)}>Update</Button>
                                    <Button data-testid = "deleteButton"onClick={(event) => handleClickOpen(row, event)}>Delete</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                style={{ 
                    fontWeight: 'bold', 
                    background: '#302f2d',
                    color:'#8c8c7c',
                    fontSize: '12px', }}
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
            <Button id="comfirmDelete" onClick={handleDelete} color="secondary" autoFocus>
                Confirm
            </Button>
            </DialogActions>
            </Dialog>
        </Paper>
    );
}

export default TankList;
