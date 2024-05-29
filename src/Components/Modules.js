import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ModuleService from "../Service/ModuleService";
import ModuleList from "./ModuleList";
import { Paper } from "@mui/material";
import { Fragment } from "react";
import { Link, useParams } from "react-router-dom";
import { AppContext } from "./AppContext";
import TankService from "../Service/TankService";


const Modules = ({ moduleType }) => {


    const id = useParams().id;
    const tankId = parseInt(id);
    


    const {modulesData, setModulesData} = useContext(AppContext);
    const fetchModulesByTankIdAndModuleType = useContext(AppContext).fetchModulesByTankIdAndModuleType;
    const currentUser= useContext(AppContext).currentUser;
    const [tank, setTank] = useState(null);
    



    useEffect(() => {
        setModulesData(undefined);
        if(tankId)
            fetchModulesByTankIdAndModuleType(tankId, moduleType);
       
    }, [tankId]);


    useEffect(() => {
        TankService.getTankById(tankId).then((foundTank) => {   
            setTank(foundTank);
        }).catch((error) => {
            console.error('Error fetching tank:', error);
        });
        
    }, []);

    if (!modulesData) {
        return <div style={{
            color: 'white',
            background: '#1a1a1a',
            padding: 20,
            textAlign: 'center'
        }}>
            Loading...
        </div>
    }
    

    if (tank && modulesData.length === 0) {
        return (
            <Fragment>
                <div style={{
                    color: 'white',
                    background: '#1a1a1a',
                    padding: 20,
                    textAlign: 'center'
                }}>
                    Tank has no modules of this type currently
                </div>
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <Link to="addModule" style={{ textDecoration: 'none' }}>
                        {console.log(currentUser.role)}
                    {currentUser.role !== 'USER' &&
                        <button style={{
                            margin: '20px',
                            padding: '10px 20px',
                            background: 'linear-gradient(180deg, #4e4e4e, #333)',
                            border: 'none',
                            borderRadius: '4px',
                            color: '#f2f2f2',
                            fontWeight: 'bold',
                            cursor: 'pointer',
                        }}>Add New Module</button> }
                    </Link>
                    <Link to={"/tanks/" + id}>
                        <button style={{
                            margin: '20px',
                            padding: '10px 20px',
                            background: 'linear-gradient(180deg, #4e4e4e, #333)',
                            border: 'none',
                            borderRadius: '4px',
                            color: '#f2f2f2',
                            fontWeight: 'bold',
                            textTransform: 'uppercase',
                            cursor: 'pointer',
                        }}>Back to Tanks</button>
                    
                    </Link>

                </div>
            </Fragment>
        )

    }

    else if(tank) return (
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
                }}>{tank.tankName + moduleType} Modules</h2>
            </Paper>
            <div style={{ display: "flex" }}>

                <div style={{ width: '50%' }}></div>
                <ModuleList style={{ width: 50 }}/>

            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
                <Link to="addModule" style={{ textDecoration: 'none' }}>
                    <button style={{
                        margin: '20px',
                        padding: '10px 20px',
                        background: 'linear-gradient(180deg, #4e4e4e, #333)',
                        border: 'none',
                        borderRadius: '4px',
                        color: '#f2f2f2',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                    }}>Add New Module</button>

                </Link>
                <Link to={"/tanks/" + id}>
                    <button style={{
                        margin: '20px',
                        padding: '10px 20px',
                        background: 'linear-gradient(180deg, #4e4e4e, #333)',
                        border: 'none',
                        borderRadius: '4px',
                        color: '#f2f2f2',
                        fontWeight: 'bold',
                        textTransform: 'uppercase',
                        cursor: 'pointer',
                    }}>Back to Tanks</button>
                </Link>

            </div>
        </Fragment>
    );
    
}

export default Modules;
