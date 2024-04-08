import React from "react";
import { Paper } from '@mui/material';





const Tank = ({ id, tankName, tankCountry, tankType, tankYear, tankFirepower, tankSpeed }) => {
    return (
        <Paper style={{ background: '#1a1a1a', color: 'white', margin: 20, padding: 20 }}>

       <div style={{display:"flex"}}>
            <div style={{width:"50%"}}>
                <div style={{display:"flex", justifyContent:"space-between", borderBottom: '1px solid #43423c'}}>
                    <div style={{color:'#8c8c7c',}}>
                        Country 
                    </div>
                    <div style={{color:'#8c8c7c',}}>
                        {tankCountry}
                    </div>
                    
                </div>
                <h2 style={{ borderBottom: '1px solid #555', paddingBottom: 10 }}>Tank Name: {tankName}</h2>
                
                <h3>Type: {tankType}</h3>
                <h3>Year: {tankYear}</h3>
                <h3>Firepower: {tankSpeed}</h3>
                <h3>Speed: {tankSpeed}</h3>
            </div>
            <div>

            </div>
        </div>
        </Paper>    
       
    );
}

export default Tank;




