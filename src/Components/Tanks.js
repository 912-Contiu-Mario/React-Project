import React, { useEffect, useState, useContext} from "react";
import TankList from "./TankList";
import { Link } from "react-router-dom";
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';
import { Box } from "@mui/material";
import { TankDataContext } from "./TankDataContext";


import MyPieChart from "./MyPieChart";

const pieSizing = {
    margin: { right: 5 },
    width: 200,
    height: 200,
    legend: { hidden: true },
  };
const Tanks = ({ deleteTankHandler }) => {
    const tankList = useContext(TankDataContext);


    const [pieChartData, setPiechartData] = useState([]);

    const [analyticsView, setAnalyticsView] = useState(false);
    
    const displayChartDataHandler =(data)=>{
        setPiechartData(data);
    };

    const findSlowestTank = () => {
        let slowestTank = tankList[0];
        tankList.forEach((tank) => {
            if (tank.tankSpeed < slowestTank.tankSpeed) {
                slowestTank = tank;
            }
        });
        return slowestTank;
    };

    return (
        <div style={{ textAlign:    'center', margin: '20px' }}>
            <div>
            <h1 style={{
                fontFamily: '"Roboto Condensed", sans-serif',
                color: '#f2f2f2',
                textTransform: 'uppercase',
                fontWeight: 'bold',
                textAlign: 'center',
                padding: '20px',
                borderRadius: '5px'
            
            }}>Tanks Wiki</h1>
            <TankList displayChartDataHandler={displayChartDataHandler} tankList={tankList} deleteTankHandler={deleteTankHandler} />
            <div style={{display:"flex", justifyContent: "center"}}>
                <Link to="/tanks/add" style={{ textDecoration: 'none' }}>
                    <button data-testid="addTankButton" style={{
                        margin: '20px',
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
                    }}>Add New Tank</button>
                </Link>
                <button data-testid="analyticsButton" onClick={() => setAnalyticsView(!analyticsView)} style={{
                    margin: '20px',
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
                }}>Analytics</button>
            </div>
            </div>
            {analyticsView &&  <div style={{display: "flex", width: "100%" }}>
                <Box component="section" sx={{ p: 2, border: '1px solid #43423c', width: '50%' }}>
                    <h2>Country distribution</h2>
                    <div style={{display:"flex"}}>
                        <MyPieChart pieChartData={pieChartData} sizing={pieSizing} />
                        <div style={{
                        width :'50%', 
                        borderLeft: '1px solid #43423c',
                    }}>
                            {pieChartData.map((data) => {
                                return <p>{data.label} : {data.value}</p>
                            }) 
                        }   
                        </div>
                    </div>   
                </Box>
                <Box component="section" sx={{ p: 2, border: '1px solid #43423c', width: '50%' }}>
                    <h2>Slowest Tank</h2>
                    { <p><b>{findSlowestTank().tankName}</b> is the slowest tank with a speed of <b>{findSlowestTank().tankSpeed} km/h </b></p> }
                </Box>
            </div>}      
            </div>
    );
}


export default Tanks;