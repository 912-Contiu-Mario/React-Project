import React, { useContext, useState } from 'react';
import { Button, TextField, Paper, Grid, FormControl, Select, MenuItem } from '@mui/material';
import { useNavigate, Link, useParams } from 'react-router-dom';
import { AppContext } from './AppContext';

const UpdateUser = () => {

    const users = useContext(AppContext).users;
    
    const params = useParams();
    const navigate = useNavigate();
    const clickedUserId = params.id;
    const user = users.find(user => user.id == clickedUserId);
    const updateUserHandler = useContext(AppContext).handleUpdateUser;


    const [username, setUsername] = useState(user.username);
    const [email, setEmail] = useState(user.email);
    const [password, setPassword] = useState(user.password);
    const [role, setRole] = useState(user.role);


    const handleSubmit = (event) => {
        event.preventDefault();
        const updatedUser = { id: user.id, username: username, email: email, role: role, password: password};
        updateUserHandler(updatedUser);
        navigate('/users');
    };

    return (
        <Paper style={{ maxWidth: 1200, margin: 'auto', marginTop: 20, background: '#1a1a1a', color: 'white', padding: 20 }}>
            <form onSubmit={handleSubmit}>
                <Grid container alignItems="flex-start" spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            variant="filled"
                            InputLabelProps={{
                                style: { color: '#ddd' },
                            }}
                            InputProps={{
                                style: { color: 'white' },
                            }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            variant="filled"
                            InputLabelProps={{
                                style: { color: '#ddd' },
                            }}
                            InputProps={{
                                style: { color: 'white' },
                            }}
                        />
                    </Grid>
                    
                    <Grid item xs={12}>
                        <FormControl fullWidth variant="filled">ROLE
                            <Select
                                value={role}
                                label="Role"
                                onChange={(e) => setRole(e.target.value)}>
                                <MenuItem label="USER" value="USER">USER</MenuItem>
                                <MenuItem label="MANAGER" value="MANAGER">MANAGER</MenuItem>
                                <MenuItem label="ADMIN" value="ADMIN">ADMIN</MenuItem>
                            </Select>
                        </FormControl>

                    </Grid>
                    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', marginTop: 20 }}>
                        <Button data-testid='submitButton' type="submit" variant="contained" color="primary" style={{ marginRight: 10 }}>
                            Update User
                        </Button>
                        <Link to="/users" style={{ textDecoration: 'none' }}>
                            <Button variant="contained" color="secondary">
                                Cancel
                            </Button>
                        </Link>
                    </Grid>
                </Grid>
            </form>
        </Paper>
    );

}

export default UpdateUser;

