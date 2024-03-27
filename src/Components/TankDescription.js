import React, { Fragment } from "react"
import { useParams } from "react-router-dom";
import Tank from "./Tank";
import { Paper } from '@mui/material';
import { Link } from "react-router-dom";

const TankDescription = ({ tankList }) => {
    const params = useParams();
    const tankId = params.id;


    const clickedTank = tankList.find(tank => tank.id == tankId);

    if (!clickedTank) {
        return <div style={{ color: 'white', background: '#1a1a1a', padding: 20, textAlign: 'center' }}>Tank not found!</div>
    }

    return (
        <Fragment>
            <Paper style={{
                maxWidth: 1200,
                margin: 'auto',
                marginTop: 20,
                background: 'linear-gradient(180deg, #4e4e4e, #333)',
                color: 'white',
                padding: 20,
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)'
            }}>
                <h2 style={{
                    borderBottom: '3px solid #777',
                    paddingBottom: 10,
                    fontFamily: '"Roboto Condensed", sans-serif',
                    textTransform: 'uppercase'
                }}>Tank Description</h2>
                <Tank key={clickedTank.name} {...clickedTank} />
            </Paper>
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
