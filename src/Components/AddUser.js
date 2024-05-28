import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "./AppContext";
import { Button, FormControl, Grid, MenuItem, Paper, Select, TextField } from "@mui/material";

const AddUser = () => {

    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const addUserHandler = useContext(AppContext).handleAddUser;

    const handleSubmit = (event) => {
        event.preventDefault();
      
        addUserHandler({ username: username, email: email, password: password,  role: role});
        navigate('/users');
        }
    

    return(
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
                        <TextField
                            fullWidth
                            label="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
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
                            Add User
                        </Button>
                        <Link to="/users" style={{ textDecoration: 'none' }}>
                            <Button variant="contained" color="secondary">
                                Cancel
                            </Button>
                        </Link>
                    </Grid>
                </Grid>
            </form>
        </Paper>)

};

export default AddUser;