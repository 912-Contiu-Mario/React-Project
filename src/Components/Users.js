import React, { useContext, useEffect, useState } from 'react';
import UserService from '../Service/UserService';

import { AppContext } from './AppContext';
import Layout from './Layout';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

let clickedUser = 0;
const Users = () => {
    const user = useContext(AppContext).currentUser;
    const deleteUserHandler = useContext(AppContext).handleDeleteUser;
    const loadUsers = useContext(AppContext).loadUsers;
    const users = useContext(AppContext).users;
    useEffect(() => {
        if (user.role === 'ADMIN')
            loadUsers();
    }, []);








    const [rowsPerPage, setRowsPerPage] = useState(100);
    const [open, setOpen] = useState(false);

    const [page, setPage] = useState(0);

    const history = useNavigate();


    const getCurrentPageElems = (newPage) => {
        return users.slice(newPage * rowsPerPage, newPage * rowsPerPage + rowsPerPage);
    }
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    }






    // useEffect(() => {
    //     window.addEventListener('scroll', handleScroll);
    //     return () => {
    //         window.removeEventListener('scroll', handleScroll);
    //     };
    // }, []);




    // const handleScroll = data => {
    //     const {scrollTop} = data;
    //     if(scrollTop > 50) {
    //         axios
    //     }
    // };


    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    }



    const handleUpdateClick = (userId, event) => {

        event.stopPropagation();
        history(`/users/update/${userId}`);
    }

    const handleClickOpen = (user, event) => {
        clickedUser = user;
        event.stopPropagation();
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleDelete = () => {

        deleteUserHandler(clickedUser.id);

        setOpen(false);
    };


    if (user.role === 'ADMIN')
        return (
            <Layout>
                <h1 style={{
                    fontFamily: '"Roboto Condensed", sans-serif',
                    color: '#f2f2f2',
                    textTransform: 'uppercase',
                    fontWeight: 'bold',
                    textAlign: 'center',
                    padding: '20px',
                    borderRadius: '5px'

                }}>Users</h1>
                <Paper sx={{ width: '100%', overflow: 'hidden', background: '#1a1a1a', color: '#f2f2f2' }}>
                    <TableContainer sx={{ maxHeight: 440 }}>

                        <Table
                            stickyHeader

                        >
                            <TableHead sx={{
                                height: "50px",
                            }}>
                                <TableRow>
                                    <TableCell align="center" sx={
                                        {
                                            borderRight: '1px solid #43423c',
                                            align: 'center',
                                            fontWeight: 'bold',
                                            background: '#302f2d',
                                            color: '#8c8c7c',
                                            fontSize: '12px',
                                        }
                                    }>USERNAME</TableCell>
                                    <TableCell align="center" sx={
                                        {
                                            borderRight: '1px solid #43423c',
                                            align: 'center',
                                            fontWeight: 'bold',
                                            background: '#302f2d',
                                            color: '#8c8c7c',
                                            fontSize: '12px',

                                        }
                                    }>EMAIL</TableCell>
                                    <TableCell align="center" sx={
                                        {
                                            borderRight: '1px solid #43423c',
                                            align: 'center',
                                            fontWeight: 'bold',
                                            background: '#302f2d',
                                            color: '#8c8c7c',
                                            fontSize: '12px',

                                        }
                                    }>ROLE</TableCell>
                                    <TableCell align="center" sx={
                                        {
                                            borderRight: '1px solid #43423c',

                                            fontWeight: 'bold',
                                            background: '#302f2d',
                                            color: '#8c8c7c',
                                            fontSize: '12px',

                                        }
                                    }>ACTIONS</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {getCurrentPageElems(page).map((row) => (
                                    <TableRow
                                        key={row.id}
                                        sx={{
                                            height: "59px",
                                            cursor: 'pointer',
                                            '&:hover': {
                                                '.MuiTableCell-root': {
                                                    backgroundColor: 'rgba(100, 100, 100, 0.2) !important', // Example hover color
                                                },
                                            },
                                        }}>
                                        <TableCell
                                            sx={{
                                                padding: '0px',
                                                backgroundColor: '#1c1c1e',
                                                borderBottom: '1px solid #43423c',
                                                color: '#b8b8a2'
                                            }}
                                            align="center" >{row.username}</TableCell>
                                        <TableCell
                                            sx={{
                                                padding: '0px',
                                                backgroundColor: '#1c1c1e',
                                                borderBottom: '1px solid #43423c',
                                                color: '#b8b8a2'
                                            }}
                                            align="center">
                                            {row.email}</TableCell>
                                        <TableCell
                                            sx={{
                                                padding: '0px',
                                                backgroundColor: '#1c1c1e',
                                                borderBottom: '1px solid #43423c',
                                                color: '#b8b8a2'
                                            }}
                                            align="center">{row.role}</TableCell>
                                        <TableCell
                                            sx={{
                                                padding: '0px',
                                                backgroundColor: '#1c1c1e',
                                                color: '#b8b8a2',
                                                borderBottom: '1px solid #43423c',
                                            }}
                                            align="center">

                                            <Button data-testid="updateButton" onClick={(event) => handleUpdateClick(row.id, event)}>Update</Button>
                                            <Button data-testid="deleteButton" onClick={(event) => handleClickOpen(row, event)}>Delete</Button>
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
                            color: '#8c8c7c',
                            fontSize: '12px',
                        }}
                        rowsPerPageOptions={[5, 10, 25, 100]}
                        component="div"
                        count={users.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />

                    <Dialog
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description">
                        <DialogTitle id="alert-dialog-title">{"Confirm Delete"}</DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                Are you sure you want to delete this user?
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
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <Link to="/users/add" style={{ textDecoration: 'none' }}>
                        <button data-testid="addUserButton" style={{
                            margin: '20px',
                            padding: '10px 20px',
                            background: 'linear-gradient(180deg, #4e4e4e, #333)',
                            border: 'none',
                            borderRadius: '4px',
                            color: '#f2f2f2',
                            fontWeight: 'bold',
                            textTransform: 'uppercase',
                            fontFamily: '"Roboto Condensed", sans-serif',
                            cursor: 'pointer',
                            outline: 'none',
                        }}>Add New User</button>
                    </Link>
                </div>
            </Layout>


        );
    else
        return (
            <Layout>
                <div>
                    <h1>Users</h1>
                    <p>Only admin can see this page</p>
                </div>
            </Layout>
        );
}


export default Users;
