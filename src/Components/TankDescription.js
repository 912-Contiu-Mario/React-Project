import React, { Fragment, useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom";

import { Paper } from '@mui/material';
import { Link } from "react-router-dom";
import TankService from "../Service/TankService";
import AddModuleButton from "./AddModuleButton";
import { AppContext } from "./AppContext";

const tankImage = {
    "Main Battle Tank": '/main-battle-tank.png',
    "Heavy Tank": '/heavy-tank.png',
    "Medium Tank": '/medium-tank.png',
    "Light Tank": '/light-tank.png',

};

const TankDescription = () => {
    const params = useParams();
    const tankId = params.id;

    const [clickedTank, setClickedTank] = useState(null);
    const tankList = useContext(AppContext).tanksData;
    
 
    useEffect(() => {
        setClickedTank(tankList.find(tank => tank.id == tankId));
    }, [tankId]);

    if(clickedTank===null){
        return <div style={{ color: 'white', background: '#1a1a1a', padding: 20, textAlign: 'center' }}>Loading...</div>
    }

    if (clickedTank===undefined) {
        return <div style={{ color: 'white', background: '#1a1a1a', padding: 20, textAlign: 'center' }}>Tank not found!</div>
    }


    return (
        <Fragment>
            <Paper style={{
                maxWidth: 1200,
                marginTop: 25,
                background: "#242424",
                color: 'white',
                padding: 20,
            }}>
                <h2 style={{
                    borderBottom: '2px solid #43423c',
                    paddingBottom: 10,
                    textTransform: 'uppercase'
                }}>{clickedTank.tankName}</h2>
            </Paper>
            <Paper style={{ background: '#1a1a1a', color: 'white', padding: 20 }}>

                <div style={{ display: "flex", maxHeight: 150 }}>
                    <div style={{ width: "50%" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", borderBottom: '1px solid #43423c' }}>
                            <div style={{ color: '#8c8c7c', }}>
                                Country
                            </div>
                            <div style={{ color: '#8c8c7c', }}>
                                {clickedTank.tankCountry}
                            </div>

                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", borderBottom: '1px solid #43423c' }}>
                            <div style={{ color: '#8c8c7c', }}>
                                Type
                            </div>
                            <div style={{ color: '#8c8c7c', }}>
                                {clickedTank.tankType}
                            </div>

                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", borderBottom: '1px solid #43423c' }}>
                            <div style={{ color: '#8c8c7c', }}>
                                Year
                            </div>
                            <div style={{ color: '#8c8c7c', }}>
                                {clickedTank.tankYear}
                            </div>

                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", borderBottom: '1px solid #43423c' }}>
                            <div style={{ color: '#8c8c7c', }}>
                                Firepower
                            </div>
                            <div style={{ color: '#8c8c7c', }}>
                                {clickedTank.tankFirepower + " HP/MIN"}
                            </div>

                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", borderBottom: '1px solid #43423c' }}>
                            <div style={{ color: '#8c8c7c', }}>
                                Speed
                            </div>
                            <div style={{ color: '#8c8c7c', }}>
                                {clickedTank.tankSpeed + " km/h"}
                            </div>

                        </div>



                    </div>
                    <div style={{ width: "50%", display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <img style={{ width: "75%", marginLeft: 60, marginBottom: 60 }} src={require('./Resources' + tankImage[clickedTank.tankType])} />

                    </div>
                </div>
            </Paper>
            <div style={{ display: "flex", justifyContent: "space-between", marginLeft: "35%", marginRight: "35%", marginTop: 30 }}>
                <AddModuleButton label="Engine" to={`/tanks/${tankId}/engineModules`} />
                <AddModuleButton label="Radio" to={`/tanks/${tankId}/radioModules`} />
                <AddModuleButton label="Gun" to={`/tanks/${tankId}/gunModules`} />
                <AddModuleButton label="Suspension" to={`/tanks/${tankId}/suspensionModules`} />
            </div>


            <div style={{ textAlign: 'center', marginTop: 20 }}>
                <Link to="/tanks" style={{ textDecoration: 'none' }}>
                    <button style={{
                        padding: '10px 20px',
                        background: 'linear-gradient(180deg, #4e4e4e, #333)',
                        border: 'none',
                        borderRadius: '4px',
                        color: '#f2f2f2',
                        fontWeight: 'bold',
                        textTransform: 'uppercase',
                        fontFamily: '"Roboto Condensed", sans-serif',
                        cursor: 'pointer',
                        outline: 'none',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)'
                    }}>Back to Tanks</button>
                </Link>
            </div>

        </Fragment>
    );


}

export default TankDescription;
