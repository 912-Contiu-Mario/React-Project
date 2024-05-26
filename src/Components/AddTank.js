import React, { useContext, useState } from 'react';
import { Button, TextField, Paper, Grid, FormControl, Select, MenuItem } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import { AppContext } from './AppContext';



const AddTank = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [country, setCountry] = useState('');
    const [type, setType] = useState('');
    const [year, setYear] = useState('');
    const [firepower, setFirepower] = useState('');
    const [speed, setSpeed] = useState('');

    const addTankHandler = useContext(AppContext).handleAddTank

    const [fields, setFields] = useState({
        name: { error: false, errorMessage: '' },
        country: { error: false, errorMessage: '' },
        type: { error: false, errorMessage: '' },
        year: { error: false, errorMessage: '' },
        firepower: { error: false, errorMessage: '' },
        speed: { error: false, errorMessage: '' },
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        const hasError = Object.values(fields).some(field => field.error);
        if (!hasError) {
            addTankHandler({ tankName: name, tankCountry: country, tankType: type, tankYear: year, tankFirepower: firepower, tankSpeed: speed });
            navigate('/tanks');
        }
        else {
            console.log('Error in form');
        }
    };


    const handleChange = (field, e) => {
        let isValid = true;
        let errorMessage = '';

        if (field == 'year') {
            if (!/^\d+$/.test(e.target.value) && e.target.value != '') {
                isValid = false;
                errorMessage = 'Year should be a number';
            }
            else if (e.target.value < 1930 || e.target.value > 2025) {
                setYear(e.target.value);
                isValid = false;
                errorMessage = 'Only tanks between 1930-2025';
            }
            else {
                setYear(e.target.value);
                isValid = true;
                errorMessage = '';
            }
        }

        else if (field == 'firepower') {
            if (!/^\d+$/.test(e.target.value) && e.target.value != '') {
                isValid = false;
                errorMessage = 'Firepower should be a number';
            }
            else if (e.target.value > 5000 || e.target.value < 0) {
                setFirepower(e.target.value);
                isValid = false;
                errorMessage = 'Maximum firepower is 5000 HP/min';
            }
            else {
                setFirepower(e.target.value);
                isValid = true;
                errorMessage = '';
            }
        }
        else if (field == 'speed') {
            if (!/^\d+$/.test(e.target.value) && e.target.value != '') {
                isValid = false;
                errorMessage = 'Speed should be a number';

            }
            else if (e.target.value > 100 || e.target.value < 0) {
                isValid = false;
                errorMessage = 'Speed should be in the range 0-100 km/h';
                setSpeed(e.target.value);
            }
            else {
                isValid = true;
                errorMessage = '';
                setSpeed(e.target.value);
            }
        }
        else if (field == 'name') {
            setName(e.target.value);
            if (e.target.value.length < 3) {
                isValid = false;
                errorMessage = 'Tank name should be at least 3 characters long';
            }
            else {
                isValid = true;
                errorMessage = '';
            }
        }


        setFields({
            ...fields,
            [field]: { error: !isValid, errorMessage: errorMessage },
        });
    }

    return (
        <Paper style={{ maxWidth: 1200, margin: 'auto', marginTop: 20, background: '#1a1a1a', color: 'white', padding: 20 }}>
            <form onSubmit={handleSubmit}>
                <Grid container alignItems="flex-start" spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Tank Name"
                            value={name}
                            error={fields.name.error}
                            helperText={fields.name.errorMessage}
                            onChange={(e) => handleChange('name', e)}
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
                        <FormControl fullWidth variant="filled">Country
                            <Select
                                id="countrySelector"
                                value={country}
                                label="Country"
                                onChange={(e) => setCountry(e.target.value)}>
                                <MenuItem label="USA" value="USA">USA</MenuItem>
                                <MenuItem label="Russia" value="Russia">Russia</MenuItem>
                                <MenuItem label="Germany" value="Germany">Germany</MenuItem>
                                <MenuItem label="UK" value="UK">UK</MenuItem>
                                <MenuItem label="France" value="France">France</MenuItem>
                                <MenuItem label="Japan" value="Japan">Japan</MenuItem>
                            </Select>
                        </FormControl>

                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth variant="filled">Type
                            <Select
                                id="typeSelector"
                                value={type}
                                label="Type"
                                onChange={(e) => setType(e.target.value)}>
                                <MenuItem value="Light Tank">Light Tank</MenuItem>
                                <MenuItem value="Medium Tank">Medium Tank</MenuItem>
                                <MenuItem value="Heavy Tank">Heavy Tank</MenuItem>
                                <MenuItem value="Main Battle Tank">Main Battle Tank</MenuItem>

                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Year"
                            value={year}
                            error={fields.year.error}
                            helperText={fields.year.errorMessage}
                            onChange={(e) => handleChange('year', e)}

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
                            label="Firepower"
                            value={firepower}
                            error={fields.firepower.error}
                            helperText={fields.firepower.errorMessage}
                            onChange={(e) => handleChange('firepower', e)
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
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Speed"
                            value={speed}
                            error={fields.speed.error}
                            helperText={fields.speed.errorMessage}

                            onChange={(e) => handleChange('speed', e)}
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
                            Add Tank
                        </Button>
                        <Link to="/tanks" style={{ textDecoration: 'none' }}>
                            <Button variant="contained" color="secondary">
                                Cancel
                            </Button>
                        </Link>
                    </Grid>
                </Grid>
            </form>
        </Paper>
    );
};

export default AddTank;
