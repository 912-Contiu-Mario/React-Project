import logo from './logo.svg';
import './App.css';
import Home from './Components/Home.js';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Tanks from './Components/Tanks.js';
import TankDescription from './Components/TankDescription.js';
import UpdateTank from './Components/UpdateTank.js';
import { useEffect, useState } from 'react';
import AddTank from './Components/AddTank.js';
import { v4 as uuid } from 'uuid'

import TankService from './Service/TankService.js';




const tanksDataList = [
  { id: uuid(), name: "Tiger II", country: "Germany", type: "Heavy Tank", year: 1942, firepower: "2,153 HP/min", speed: "38 km/h" },
  { id: uuid(),name: "M1 Abrams", country: "USA", type: "Heavy Tank", year: 1980, firepower: "1,500 HP/min", speed: "67.7 km/h" },
  {id: uuid(),name:  "Challenger 2", country: "UK", type: "Medium Tank", year: 1998, firepower: "1,500 HP/min", speed: "59 km/h" },
  { id: uuid(),name: "Leopard 2", country: "Germany", type: "Light Tank", year: 1979, firepower: "1,500 HP/min", speed: "68 km/h" },
  {id: uuid(), name: "T-90", country: "Russia", type: "Medium Tank", year: 1993, firepower: "1,640 HP/min", speed: "65 km/h" },
  { id: uuid(), name: "M60 Patton", country: "USA", type: "Heavy Tank", year: 1960, firepower: "1,750 HP/min", speed: "48 km/h" },
  { id: uuid(), name: "Chieftain", country: "UK", type: "Light Tank", year: 1966, firepower: "1,650 HP/min", speed: "42 km/h" },
  { id: uuid(), name: "T-72", country: "Russia", type: "Tank Destroyer", year: 1973, firepower: "1,900 HP/min", speed: "60 km/h" },
  { id: uuid(), name: "Panther", country: "Germany", type: "Medium Tank", year: 1943, firepower: "1,100 HP/min", speed: "55 km/h" },
  { id: uuid(), name: "Sherman Firefly", country: "UK", type: "Medium Tank", year: 1944, firepower: "1,400 HP/min", speed: "40 km/h" },
  { id: uuid(), name: "M48 Patton", country: "USA", type: "Main Battle Tank", year: 1952, firepower: "1,750 HP/min", speed: "45 km/h" },
  { id: uuid(), name: "T-80", country: "Russia", type: "Heavy Tank", year: 1976, firepower: "2,000 HP/min", speed: "70 km/h" },
  { id: uuid(), name: "Leopard 1", country: "Germany", type: "Light Tank", year: 1965, firepower: "1,500 HP/min", speed: "65 km/h" },
  { id: uuid(), name: "Bradley Fighting Vehicle", country: "USA", type: "Medium Tank", year: 1981, firepower: "600 HP/min", speed: "61 km/h" },
  { id: uuid(), name: "T-34", country: "Russia", type: "Medium Tank", year: 1940, firepower: "1,200 HP/min", speed: "53 km/h" }
];

tanksDataList.sort((tank1, tank2)=>(tank1.name > tank2.name) ? 1 : (tank1.name < tank2.name) ? -1 : 0);
function App() {

  const [tanksData, setTanksData] = useState([]);
  

 const [isLoaded, setIsLoaded] = useState(false);

//write function to fetch data from server
  useEffect(()=>{
    TankService.getTanks().then((data)=>{
      
      setTanksData(data);
      setIsLoaded(true);
    }).catch((error)=>{ console.log(error); })
  },[]);


  //write a useEffect to sort the data by name every time its changed
  useEffect(()=>{
    tanksData.sort((tank1, tank2)=>(tank1.tankName > tank2.tankName) ? 1 : (tank1.tankName < tank2.tankName) ? -1 : 0);
  },[tanksData]);

  const handleAddTank = (tankToAdd) => {

    TankService.addTank(tankToAdd).then(()=>{

      TankService.getTanks().then((data)=>{
        setTanksData(data);
      }).catch((error)=>{ console.log(error); })  
    }).catch((error)=>{ console.log(error); })
  };

    const handleDeleteTank = (tankId) => {
      TankService.deleteTank(tankId).then(()=>{
        TankService.getTanks().then((data)=>{
          setTanksData(data);
        }).catch((error)=>{ console.log(error); })
      }).catch((error)=>{
        console.log(error);
      });
    };
  
  const handleUpdateTank = (updatedTank) => {

    TankService.updateTank(updatedTank).then(()=>{
      TankService.getTanks().then((data)=>{
        setTanksData(data);
      }).catch ((error)=>{ console.log(error); }) 
    }).catch((error)=>{ console.log(error); })
  };



  return (
    <div>
      <Router>
        <Routes>
          <Route path ='/' element={<Home />} />
          <Route path ='/tanks' element = {<Tanks tankList={tanksData} deleteTankHandler ={handleDeleteTank}/>} />
          <Route path ='/tanks/:id' element={<TankDescription tankList = {tanksData} /> } />
          <Route path='/tanks/update/:id' element={<UpdateTank tankList={tanksData} updateTankHandler={handleUpdateTank} />}  />
          <Route path='/tanks/add' element={<AddTank tankList = {tanksData} handleAddTank={handleAddTank}/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
