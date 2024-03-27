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
    console.log("tanks mounted");

    


      


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
            <TankList displayChartDataHandler={displayChartDataHandler} tankList={tankList} deleteTankHandler={deleteTankHandler} />
            <Link to="/tanks/add" style={{ textDecoration: 'none' }}>
                <button data-testid="addTankButton" style={{
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
                }}>Add New Tank</button>
            </Link>
            <MyPieChart pieChartData={pieChartData} sizing={pieSizing} />
                <Box component="section" sx={{ p: 2, border: '1px dashed grey' }}>
                    <h2>Slowest Tank</h2>
                    {/* <p>{findSlowestTank().name} is the slowest tank with a speed of {findSlowestTank().speed}</p> */}
                </Box>
        </div>
    );
}


export default Tanks;