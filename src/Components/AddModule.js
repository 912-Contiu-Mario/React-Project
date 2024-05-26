import React, { useContext, useEffect, useState } from 'react';
import { Button, TextField, Paper, Grid, FormControl, Select, MenuItem } from '@mui/material';
import { useNavigate, Link, useParams } from 'react-router-dom';
import { AppContext } from './AppContext';



const AddModule = ({ moduleType }) => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [horsepower, setHorsepower] = useState('');
    const [weight, setWeight] = useState('');
    const [damage, setDamage] = useState('');
    const [rateOfFire, setRateOfFire] = useState('');
    const [loadLimit, setLoadLimit] = useState('');
    const [signalRange, setSignalRange] = useState('');
    const [penetration, setPenetration] = useState('');

    const tankId = useParams().id;
    const addModuleHandler = useContext(AppContext).handleAddModule;
    const modulesData = useContext(AppContext).modulesData;
    
    const [fields, setFields] = useState({
        name: { error: false, errorMessage: '' },
        horsepower: { error: false, errorMessage: '' },
        weight: { error: false, errorMessage: '' },
        damage: { error: false, errorMessage: '' },
        rateOfFire: { error: false, errorMessage: '' },
        loadLimit: { error: false, errorMessage: '' },
        signalRange: { error: false, errorMessage: '' },
        penetration: { error: false, errorMessage: '' },
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        const hasError = Object.values(fields).some(field => field.error);

        if (!hasError) {

            addModuleHandler({
                tankId: tankId,
                moduleName: name !== "" ? name : null,
                moduleType: moduleType !== "" ? moduleType : null,
                moduleHorsepower: horsepower !== "" ? horsepower : null,
                moduleWeight: weight !== "" ? weight : null,
                moduleDamage: damage !== "" ? damage : null,
                moduleRateOfFire: rateOfFire !== "" ? rateOfFire : null,
                moduleLoadLimit: loadLimit !== "" ? loadLimit : null,
                moduleSignalRange: signalRange !== "" ? signalRange : null,
                modulePenetration: penetration !== "" ? penetration : null
            });
            navigate(`/tanks/${tankId}/${moduleType}Modules`);
        }
        else {
            console.log('Error in form');
        }
    };


 
  

    const handleChange = (field, e) => {
        let isValid = true;
        let errorMessage = '';

        if (field == 'loadLimit') {

            if (!/^\d+$/.test(e.target.value) && e.target.value != '') {
                isValid = false;
                errorMessage = 'Load limit should be a number';

            }
            else if (e.target.value < 0 || e.target.value > 1000) {
                setLoadLimit(e.target.value);
                isValid = false;
                errorMessage = 'Suspension load limit should be in the range 0-1000 Tons';
            }
            else {
                setLoadLimit(e.target.value);
                isValid = true;
                errorMessage = '';
            }
        }
        else if (field == 'horsepower') {
            if (!/^\d+$/.test(e.target.value) && e.target.value != '') {
                isValid = false;
                errorMessage = 'Horsepower should be a number';

            }
            else if (e.target.value > 5000 || e.target.value < 0) {
                setHorsepower(e.target.value);
                isValid = false;
                errorMessage = 'Maximum horsepower is 5000 HP';
            }
            else {
                setHorsepower(e.target.value);
                isValid = true;
                errorMessage = '';
            }
        }
        else if (field == 'damage') {
            if (!/^\d+$/.test(e.target.value) && e.target.value != '') {
                isValid = false;
                errorMessage = 'Damage should be a number';
            }
            else if (e.target.value > 5000 || e.target.value < 0) {
                setDamage(e.target.value);
                isValid = false;
                errorMessage = 'Maximum damage is 5000 HP';
            }
            else {
                setDamage(e.target.value);
                isValid = true;
                errorMessage = '';
            }
        }
        else if (field == 'rateOfFire') {
            if (!/^\d+$/.test(e.target.value) && e.target.value != '') {
                isValid = false;
                errorMessage = 'Rate of fire should be a number';
            }
            else if (e.target.value > 100 || e.target.value < 0) {
                setRateOfFire(e.target.value);
                isValid = false;
                errorMessage = 'Rate of fire should be in the range 0-100 rounds/min';
            }
            else {
                setRateOfFire(e.target.value);
                isValid = true;
                errorMessage = '';
            }
        }
        else if (field == 'penetration') {
            if (!/^\d+$/.test(e.target.value) && e.target.value != '') {
                isValid = false;
                errorMessage = 'Penetration should be a number';
            }
            else if (e.target.value > 1000 || e.target.value < 0) {
                setPenetration(e.target.value);
                isValid = false;
                errorMessage = 'Penetration should be in the range 0-1000 mm';
            }
            else {
                setPenetration(e.target.value);
                isValid = true;
                errorMessage = '';
            }
        }
        else if (field == 'signalRange') {
            if (!/^\d+$/.test(e.target.value) && e.target.value != '') {
                isValid = false;
                errorMessage = 'Signal range should be a number';
            }
            else if (e.target.value > 5000 || e.target.value < 0) {
                setSignalRange(e.target.value);
                isValid = false;
                errorMessage = 'Signal range should be in the range 0-1000 km';
            }
            else {
                setSignalRange(e.target.value);
                isValid = true;
                errorMessage = '';
            }
        }
        else if (field == 'weight') {
            if (!/^\d+$/.test(e.target.value) && e.target.value != '') {
                isValid = false;
                errorMessage = 'Weight should be a number';
            }
            else if (e.target.value > 100000 || e.target.value < 0) {
                isValid = false;
                errorMessage = 'Weight should be in the range 0-100000 Tons';
                setWeight(e.target.value);
            }

            else {
                isValid = true;
                errorMessage = '';
                setWeight(e.target.value);
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
            <form >
                <Grid container alignItems="flex-start" spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Module name"
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

                    {moduleType === 'engine' &&
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Horsepower"
                                value={horsepower}
                                error={fields.horsepower.error}
                                helperText={fields.horsepower.errorMessage}
                                onChange={(e) => handleChange('horsepower', e)}
                                variant="filled"
                                InputLabelProps={{
                                    style: { color: '#ddd' },
                                }}
                                InputProps={{
                                    style: { color: 'white' },
                                }}
                            />
                        </Grid>}

                    {moduleType === 'suspension' &&
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="loadLimit"
                                value={loadLimit}
                                error={fields.loadLimit.error}
                                helperText={fields.loadLimit.errorMessage}
                                onChange={(e) => handleChange('loadLimit', e)}
                                variant="filled"
                                InputLabelProps={{
                                    style: { color: '#ddd' },
                                }}
                                InputProps={{
                                    style: { color: 'white' },
                                }}
                            />
                        </Grid>}

                    {moduleType === 'gun' &&
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Damage"
                                value={damage}
                                error={fields.damage.error}
                                helperText={fields.damage.errorMessage}
                                onChange={(e) => handleChange('damage', e)}
                                variant="filled"
                                InputLabelProps={{
                                    style: { color: '#ddd' },
                                }}
                                InputProps={{
                                    style: { color: 'white' },
                                }}
                            />
                        </Grid>}

                    {moduleType === 'gun' &&
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Rate of Fire"
                                value={rateOfFire}
                                error={fields.rateOfFire.error}
                                helperText={fields.rateOfFire.errorMessage}
                                onChange={(e) => handleChange('rateOfFire', e)}
                                variant="filled"
                                InputLabelProps={{
                                    style: { color: '#ddd' },
                                }}
                                InputProps={{
                                    style: { color: 'white' },
                                }}
                            />
                        </Grid>}

                    {moduleType === 'gun' &&
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Penetration"
                                value={penetration}
                                error={fields.penetration.error}
                                helperText={fields.penetration.errorMessage}
                                onChange={(e) => handleChange('penetration', e)}
                                variant="filled"
                                InputLabelProps={{
                                    style: { color: '#ddd' },
                                }}
                                InputProps={{
                                    style: { color: 'white' },
                                }}
                            />
                        </Grid>}

                    {moduleType === 'radio' &&
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Signal Range"
                                value={signalRange}
                                error={fields.signalRange.error}
                                helperText={fields.signalRange.errorMessage}
                                onChange={(e) => handleChange('signalRange', e)}
                                variant="filled"
                                InputLabelProps={{
                                    style: { color: '#ddd' },
                                }}
                                InputProps={{
                                    style: { color: 'white' },
                                }}
                            />
                        </Grid>

                    }
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Weight"
                            value={weight}
                            error={fields.weight.error}
                            helperText={fields.weight.errorMessage}
                            onChange={(e) => handleChange('weight', e)}
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
                        <Button onClick={handleSubmit} data-testid='submitButton' type="submit" variant="contained" color="primary" style={{ marginRight: 10 }}>
                            Add Module
                        </Button>
                        <Link to={`/tanks/${tankId}/${moduleType}Modules`} style={{ textDecoration: 'none' }}>
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

export default AddModule;
