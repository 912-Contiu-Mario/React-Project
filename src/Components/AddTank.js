import React, { useState } from 'react';
import { Button, TextField, Paper, Grid, FormControl, Select, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { v4 as uuid } from 'uuid'
import { on } from 'events';


const AddTank = ({ tankList, handleAddTank }) => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [country, setCountry] = useState('');
    const [type, setType] = useState('');
    const [year, setYear] = useState('');
    const [firepower, setFirepower] = useState('');
    const [speed, setSpeed] = useState('');



    const [fields, setFields] = useState({
        name: {  error: false, errorMessage: '' },
        country: { error: false, errorMessage: '' },
        type: {  error: false, errorMessage: '' },
        year: {  error: false, errorMessage: '' },
        firepower: {  error: false, errorMessage: '' },
        speed: {error: false, errorMessage: '' },

        // Add more fields as needed
      });
    const [error, setError] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        const id = uuid();
        const hasError = Object.values(fields).some(field => field.error);

        if(!hasError){
            const toSendFirepower = firepower + ' HP/min';
            const toSendSpeed = speed + ' km/h';
            handleAddTank({ id, name, country, type, year, toSendFirepower, toSendFirepower });
            navigate(`/tanks`);
        }
        else{
            console.log('Error in form');
        }
    };


    const handleChange = (field, e) =>{
        let isValid = true;
        let errorMessage = '';

        if(field == 'year'){
            
            if(!/^\d+$/.test(e.target.value) && e.target.value != ''){
                isValid = false;
                errorMessage = 'Year should be a number';

            }
            else if(e.target.value < 1930 || e.target.value > 1999){
                setYear(e.target.value);
                isValid = false;
                errorMessage = 'Only tanks between 1930-1999';
            }
            else{
                setYear(e.target.value);
                isValid = true;
                errorMessage = '';
            }
        }
        else if(field == 'firepower'){
            if(!/^\d+$/.test(e.target.value)&& e.target.value != ''){
                isValid = false;
                errorMessage = 'Firepower should be a number';

            }
            else if(e.target.value > 5000 || e.target.value < 0){
                setFirepower(e.target.value);
                isValid = false;
                errorMessage = 'Maximum firepower is 5000 HP/min';
            }
            else{
                setFirepower(e.target.value);
                isValid = true;
                errorMessage = '';
            }
        }
        else if(field == 'speed'){
            console.log(e.target.value)
            if(!/^\d+$/.test(e.target.value) && e.target.value != ''){
                console.log(e.target.value)
                isValid = false;
                errorMessage = 'Speed should be a number';

            }
            else if(e.target.value > 100 || e.target.value < 0){
                isValid = false;
                errorMessage = 'Speed should be in the range 0-100 km/h';
                setSpeed(e.target.value);
            }
            
            else{
                isValid = true;
                errorMessage = '';
                setSpeed(e.target.value);
            }
        }
        else if(field == 'name'){
            setName(e.target.value);
            if(e.target.value.length < 3){
                isValid = false;
                errorMessage = 'Tank name should be at least 3 characters long';
            }
            else{
                isValid = true;
                errorMessage = '';
            }
        }


        setFields({
            ...fields,
            [field]: {error: !isValid, errorMessage: errorMessage },
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
                                pattern: '[A-Za-z]{3,}',
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
                                    <MenuItem value="Tank Destroyer">Tank Destroyer</MenuItem>

                                    <MenuItem value="Self-propelled guns">Self propelled guns</MenuItem>
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
                            onChange={(e) =>handleChange('year', e)}
                       
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
                        <Button data-testid='submit-button' type="submit" variant="contained" color="primary" style={{ marginRight: 10 }}>
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
