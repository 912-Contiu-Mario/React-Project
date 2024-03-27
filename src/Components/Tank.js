import React from "react";
import { Paper } from '@mui/material';

const Tank = ({ name, country, type, year, firepower, speed }) => {
    return (
        <Paper style={{ background: '#1a1a1a', color: 'white', margin: 20, padding: 20 }}>
            <div>
                <h2 style={{ borderBottom: '1px solid #555', paddingBottom: 10 }}>Tank Name: {name}</h2>
                <h3>Country: {country}</h3>
                <h3>Type: {type}</h3>
                <h3>Year: {year}</h3>
                <h3>Firepower: {firepower}</h3>
                <h3>Speed: {speed}</h3>
            </div>
        </Paper>
    );
}

export default Tank;




