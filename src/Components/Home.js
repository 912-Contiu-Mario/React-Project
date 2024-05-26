import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Paper } from '@mui/material';

const Home = () => {
    return (
        <Paper style={{ maxWidth: 1200, margin: 'auto', marginTop: 20, background: '#1a1a1a', color: 'white', padding: 20 }}>
            <header>
               z <center><h2 style={{ borderBottom: '1px solid #555', paddingBottom: 10 }}>Tanks wiki</h2></center>
            </header>
            <main style={{ textAlign: 'center', paddingTop: 20 }}>
                <Link to='/tanks' style={{ textDecoration: 'none' }}>
                    <Button data-testid="continueButton" variant="contained" color="primary">
                        Click here to see Tanks
                    </Button>
                </Link>
            </main>
        </Paper>
    );
};

export default Home;
