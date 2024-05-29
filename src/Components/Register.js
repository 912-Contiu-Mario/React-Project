import { Button, Grid, Paper, TextField } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "./AppContext";
import { Link, useNavigate } from "react-router-dom";


const Register = () => {

    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const navigate = useNavigate();

    const handleRegisterUser = useContext(AppContext).handleRegisterUser;


    const [fields, setFields] = useState({
        email: { error: false, errorMessage: '' },
        username: { error: false, errorMessage: '' },
        password: { error: false, errorMessage: '' },
    });

    const handleSubmit = async (event) => {
        event.preventDefault();
        const hasError = Object.values(fields).some(field => field.error);
        if (!hasError) {
          
                handleRegisterUser({ email: email, username: username, password: password }).then(()=>{
                    navigate('/login');
                }).catch((error)=>{
                    setError(true);
                })
        }
        else {
            console.log('Error in form');
        }
    }






    const handleChange = (field, e) => {
        let isValid = true;
        let errorMessage = '';

        if (field === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(e.target.value) && e.target.value !== '') {
                isValid = false;
                errorMessage = 'Please enter a valid email address';
            } else {
                isValid = true;
                errorMessage = '';
            }
            setEmail(e.target.value);

        } else if (field === 'username') {
            if (!/^[a-zA-Z0-9_]+$/.test(e.target.value) && e.target.value !== '') {
                isValid = false;
                errorMessage = 'Username should only contain letters, numbers, and underscores';
            } else if (e.target.value.length < 5 || e.target.value.length > 20) {
                isValid = false;
                errorMessage = 'Username should be between 5 and 20 characters';
            } else {
                isValid = true;
                errorMessage = '';
            }
            setUsername(e.target.value);

        } else if (field === 'password') {
            if (e.target.value.length < 8 || e.target.value.length > 20) {
                isValid = false;
                errorMessage = 'Password should be between 8 and 20 characters';
            } else if (!/[A-Z]/.test(e.target.value)) {
                isValid = false;
                errorMessage = 'Password should contain at least one uppercase letter';
            } else if (!/[a-z]/.test(e.target.value)) {
                isValid = false;
                errorMessage = 'Password should contain at least one lowercase letter';
            } else if (!/\d/.test(e.target.value)) {
                isValid = false;
                errorMessage = 'Password should contain at least one number';
            } else {
                isValid = true;
                errorMessage = '';
            }
            setPassword(e.target.value);
        }
        setFields({
            ...fields,
            [field]: { error: !isValid, errorMessage: errorMessage },
        });
    }


    return (
        <Paper style={{ maxWidth: 1200, margin: 'auto', marginTop: 20, background: '#1a1a1a', color: 'white', padding: 20 }}>
            {error && <div style={{ color: 'red', textAlign: 'center' }}>Registration failed</div>}

            <form onSubmit={handleSubmit}>
                <Grid container alignItems="flex-start" spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Email"
                            value={email}
                            error={fields.email.error}
                            helperText={fields.email.errorMessage}
                            onChange={(e) => handleChange('email', e)}
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
                            label="Username"
                            value={username}
                            error={fields.username.error}
                            helperText={fields.username.errorMessage}
                            onChange={(e) => handleChange('username', e)}
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
                            error={fields.password.error}
                            type="password"
                            helperText={fields.password.errorMessage}
                            onChange={(e) => handleChange('password', e)
                            }
                            variant="filled"
                            InputLabelProps={{
                                style: { color: '#ddd' },
                            }}
                            InputProps={{
                                style: { color: 'white' },
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', marginTop: 20 }}>
                       
                            <Button data-testid='submitButton' type="submit" variant="contained" color="primary" style={{ marginRight: 10 }}>
                                Register
                            </Button>
                        
                        <Link to="/login" style={{ textDecoration: 'none' }}>
                            <Button variant="contained" color="primary" style={{ marginRight: 10 }}>
                                Login
                            </Button>
                        </Link>
                    </Grid>
                </Grid>
            </form>
        </Paper>
    )
}

export default Register;