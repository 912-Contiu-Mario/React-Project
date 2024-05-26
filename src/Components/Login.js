import { Button, Grid, Paper, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { AppContext } from "./AppContext";
import { Link, useNavigate } from "react-router-dom";




const Login = () => {

    const [Email, setEmail] = useState('');
    const [Password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const navigate = useNavigate();

    const handleLoginUser = useContext(AppContext).handleLoginUser;
    const isAuthenticated = useContext(AppContext).isAuthenticated;
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await handleLoginUser({ email: Email, password: Password });
        } catch (error) {
            setError(true);
            console.error('Login failed:', error);
        }
    };

    useEffect(()=>{
        if(isAuthenticated){
            navigate('/tanks');
        }
    }, [isAuthenticated]);


    return (
        <Paper style={{ maxWidth: 1200, margin: 'auto', marginTop: 20, background: '#1a1a1a', color: 'white', padding: 20 }}>
            {error && <div style={{ color: 'red', textAlign: 'center' }}>Incorrect username or password</div>}
            <form onSubmit={handleSubmit}>
                <Grid container alignItems="flex-start" spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Email"
                            value={Email}
                            onChange={(e) =>setEmail(e.target.value)}
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
                            value={Password}
                            onChange={(e) => setPassword(e.target.value)
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
                            Login
                        </Button>
                        <Link to="/register" style={{ textDecoration: 'none' }}>
                            <Button data-testid='submitButton' variant="contained" color="primary" style={{ marginRight: 10 }}>
                                Register
                            </Button>
                        </Link>
                    </Grid>
                </Grid>
            </form>
        </Paper>
    )
}

export default Login;