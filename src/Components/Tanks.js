import React, { useEffect, useState } from "react";
import TankList from "./TankList";
import DeleteTank from "./DeleteTank";
import { Link } from "react-router-dom";
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';
import { Box } from "@mui/material";

import MyPieChart from "./MyPieChart";

const pieSizing = {
    margin: { right: 5 },
    width: 200,
    height: 200,
    legend: { hidden: true },
  };
const Tanks = ({ tankList, deleteTankHandler }) => {

    const [pieChartData, setPiechartData] = useState([]);
    // console.log("tanks mounted");

    
    const displayChartDataHandler =(data)=>{
        setPiechartData(data);
    };


    const findSlowestTank = () => {
        let slowestTank = tankList[0];
        tankList.forEach((tank) => {
            if (tank.speed < slowestTank.speed) {
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
            </div>
            <div>

                <center><h2 sty>Country distribution</h2>
                <MyPieChart pieChartData={pieChartData} sizing={pieSizing} />
                </center>
            </div>
                <Box component="section" sx={{ p: 2, border: '1px dashed grey' }}>
                    <h2>Slowest Tank</h2>
                    {/* <p>{findSlowestTank().name} is the slowest tank with a speed of {findSlowestTank().speed}</p> */}
                </Box>

        </div>
    );
}


export default Tanks;