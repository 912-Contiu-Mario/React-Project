import React, { useState, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Button, TextField, Paper, Grid, FormControl, Select, MenuItem } from '@mui/material';
import { AppContext } from './AppContext';

const UpdateTank = () => {

    const tankList = useContext(AppContext).tanksData;

    const params = useParams();
    const navigate = useNavigate();
    const clickedTankId = params.id;
    const tank = tankList.find(tank => tank.id == clickedTankId);
    const updateTankHandler = useContext(AppContext).handleUpdateTank;


    const [name, setName] = useState(tank.tankName);
    const [country, setCountry] = useState(tank.tankCountry);
    const [type, setType] = useState(tank.tankType);
    const [year, setYear] = useState(tank.tankYear);
    const [firepower, setFirepower] = useState(tank.tankFirepower);
    const [speed, setSpeed] = useState(tank.tankSpeed);

    const [fields, setFields] = useState({
        name: { error: false, errorMessage: '' },
        country: { error: false, errorMessage: '' },
        type: { error: false, errorMessage: '' },
        year: { error: false, errorMessage: '' },
        firepower: { error: false, errorMessage: '' },
        speed: { error: false, errorMessage: '' },

        // Add more fields as needed
    });

    const handleChange = (field, e) => {
        let isValid = true;
        let errorMessage = '';

        if (field == 'year') {

            if (!/^\d+$/.test(e.target.value) && e.target.value != '') {
                isValid = false;
                errorMessage = 'Year should be a number';

            }
            else if (e.target.value < 1915 || e.target.value > 2025) {
                setYear(e.target.value);
                isValid = false;
                errorMessage = 'Only tanks between 1930-1999';
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
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const updatedTank = { id: tank.id, tankName: name, tankCountry: country, tankType: type, tankYear: year, tankFirepower: firepower, tankSpeed: speed };
        const hasErrors = Object.values(fields).some(field => field.error);
        if (hasErrors) {
            return;
        }
        updateTankHandler(updatedTank);
        navigate('/tanks');
    };

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
                                value={country}
                                label="Country"
                                onChange={(e) => setCountry(e.target.value)}>
                                <MenuItem value="USA">USA</MenuItem>
                                <MenuItem value="Russia">Russia</MenuItem>
                                <MenuItem value="Germany">Germany</MenuItem>
                                <MenuItem value="UK">UK</MenuItem>
                                <MenuItem value="France">France</MenuItem>
                                <MenuItem value="Japan">Japan</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth variant="filled">Type
                            <Select
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
                        <Button id='updateButton' type="submit" variant="contained" color="primary">
                            Update Tank
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

export default UpdateTank;
