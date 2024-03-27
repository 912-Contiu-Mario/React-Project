import React from 'react';
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';

const MyPieChart = ({pieChartData, sizing}) => {

    return(
    <PieChart
                series={[
                    {
                        outerRadius: 80,
                        data: pieChartData,
                        },
                    ]}
                sx={{
                    [`& .${pieArcLabelClasses.root}`]: {
                    fill: 'white',
                    fontSize: 14,
                    },
                }}
                {...sizing}
                />

    )



}

export default MyPieChart;