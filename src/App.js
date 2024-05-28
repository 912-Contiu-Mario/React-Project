import './App.css';
import Home from './Components/Home.js';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Tanks from './Components/Tanks.js';
import TankDescription from './Components/TankDescription.js';
import UpdateTank from './Components/UpdateTank.js';
import { useContext, useEffect, useState } from 'react';
import AddTank from './Components/AddTank.js';
import { v4 as uuid } from 'uuid'









import Modules from './Components/Modules.js';
import AddModule from './Components/AddModule.js';
import UpdateModule from './Components/UpdateModule.js';
import { AppContext } from './Components/AppContext.js';
import AuthGuard from './Components/AuthGuard.js';
import Register from './Components/Register.js';
import Login from './Components/Login.js';
import Users from './Components/Users.js';
import AddUser from './Components/AddUser.js';
import UpdateUser from './Components/UpdateUser.js';




const tanksDataList = [
  { id: uuid(), name: "Tiger II", country: "Germany", type: "Heavy Tank", year: 1942, firepower: "2,153 HP/min", speed: "38 km/h" },
  { id: uuid(), name: "M1 Abrams", country: "USA", type: "Heavy Tank", year: 1980, firepower: "1,500 HP/min", speed: "67.7 km/h" },
  { id: uuid(), name: "Challenger 2", country: "UK", type: "Medium Tank", year: 1998, firepower: "1,500 HP/min", speed: "59 km/h" },
  { id: uuid(), name: "Leopard 2", country: "Germany", type: "Light Tank", year: 1979, firepower: "1,500 HP/min", speed: "68 km/h" },
  { id: uuid(), name: "T-90", country: "Russia", type: "Medium Tank", year: 1993, firepower: "1,640 HP/min", speed: "65 km/h" },
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

function App() {

  // const [tanksData, setTanksData] = useContext(AppContext);
  const serverStatus = useContext(AppContext).serverStatus
  const isOnline = useContext(AppContext).isOnline
  



  // useEffect(() => {
  //   window.addEventListener('online', () => setIsOnline(true))
  //   window.addEventListener('offline', () => setIsOnline(false))

  //   return () => {
  //     window.removeEventListener('online', () => setIsOnline(true))
  //     window.removeEventListener('offline', () => setIsOnline(false))
  //   }
  // }, []);

  // useEffect(() => {

  //   const checkServerHealth = () => {
  //     TankService.checkServerHealth()
  //       .then(() => setServerStatus(true))
  //       .catch(() => setServerStatus(false));
  //   };

  //   checkServerHealth();

  //   const intervalId = setInterval(checkServerHealth, 10000); // 10 seconds interval

  //   return () => clearInterval(intervalId);
  // }, []);



  // useEffect(() => {
  //   // Create a new SockJS instance
  //   const socket = new SockJS('http://localhost:8080/tanks'); // Adjust the URL as needed

  //   // Create a Stomp client over the SockJS connection
  //   const stompClient = Stomp.over(socket);
  //   // Connect to the WebSocket
  //   stompClient.connect({}, () => {
  //     stompClient.subscribe('/topic/tanks', (message) => {

  //       // Handle received data here
  //       const tankData = JSON.parse(message.body);
  //       setTanksData(tankData);
  //       // Update your state or perform any other actions
  //     });


  //   });

  //   // Clean up the connection when the component unmounts

  // }, []);





  // const handleAddTank = (tankToAdd) => {
  //   TankService.addTank(tankToAdd).then(() => {
  //     TankService.getTanks().then((data) => {
  //       setTanksData(data);
  //     }).catch((error) => { console.log(error); })
  //   }).catch((error) => { console.log(error); })
  // };

  // const handleDeleteTank = (tankId) => {
  //   TankService.deleteTank(tankId).then(() => {
  //     TankService.getTanks().then((data) => {
  //       setTanksData(data);
  //     }).catch((error) => { console.log(error); })
  //   }).catch((error) => {
  //     console.log(error);
  //   });
  // };

  // const handleUpdateTank = (updatedTank) => {
  //   TankService.updateTank(updatedTank).then(() => {
  //     TankService.getTanks().then((data) => {
  //       setTanksData(data);
  //     }).catch((error) => { console.log(error); })
  //   }).catch((error) => { console.log(error); })
  // };

  // const handleAddModule = (module) => {
  //   console.log(module);
  //   ModuleService.addModule(module).then().catch((error) => { console.log(error); })
  // }


  // const handleUpdateModule = (module) => {
  //   console.log(module)
  //   ModuleService.updateModule(module).then().catch((error) => { console.log(error); })
  // }


  // const handleDeleteModule = (moduleId) => {
  //   ModuleService.deleteModule(moduleId).then().catch((error) => { console.log(error); })
  // }






  // if (!isOnline) {
  //   return <div style={{ color: 'white', background: '#1a1a1a', padding: 20, textAlign: 'center' }}>You are offline!</div>
  // }

  // else if (!serverStatus) {
  //   return <div style={{ color: 'white', background: '#1a1a1a', padding: 20, textAlign: 'center' }}>Server is down!</div>
  // }


    return (
      <div>

        <Router>
              <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/login' element = {<Login />}/>
                    <Route path='/register' element = {<Register />}/>
                    <Route path='/tanks' element={<AuthGuard><Tanks /></AuthGuard>} />
                    <Route path='/tanks/:id' element={<AuthGuard><TankDescription /></AuthGuard>} />
                    <Route path='/tanks/update/:id' element={<AuthGuard><UpdateTank /></AuthGuard>} />
                    <Route path='/tanks/add' element={<AuthGuard><AddTank /></AuthGuard>} />

                    <Route path='/tanks/:id/engineModules' element={<AuthGuard><Modules moduleType='engine' /></AuthGuard>} />
                    <Route path='/tanks/:id/engineModules/addModule' element={<AuthGuard><AddModule moduleType='engine' /></AuthGuard>} />
                    <Route path='/tanks/:id/engineModules/updateModule/:moduleId' element={<AuthGuard><UpdateModule moduleType='engine' /></AuthGuard>} />

                    <Route path='/tanks/:id/gunModules' element={<AuthGuard><Modules moduleType='gun' /></AuthGuard>} />
                    <Route path='/tanks/:id/gunModules/addModule' element={<AuthGuard><AddModule moduleType='gun' /></AuthGuard>} />
                    <Route path='/tanks/:id/engineModules/updateModule/:moduleId' element={<AuthGuard><UpdateModule moduleType='gun' /></AuthGuard>} />

                    <Route path='/tanks/:id/radioModules' element={<AuthGuard><Modules moduleType='radio' /></AuthGuard>} />
                    <Route path='/tanks/:id/radioModules/addModule' element={<AuthGuard><AddModule moduleType='radio' /></AuthGuard>} />
                    <Route path='/tanks/:id/radioModules/updateModule/:moduleId' element={<AuthGuard><UpdateModule moduleType='radio' /></AuthGuard>} />

                    <Route path='/tanks/:id/suspensionModules' element={<AuthGuard><Modules moduleType='suspension' /></AuthGuard>} />
                    <Route path='/tanks/:id/suspensionModules/addModule' element={<AuthGuard><AddModule moduleType='suspension' /></AuthGuard>} />
                    <Route path='/tanks/:id/suspensionModules/updateModule/:moduleId' element={<AuthGuard><UpdateModule moduleType='suspension' /></AuthGuard>} />

                    <Route path='/users' element={<AuthGuard><Users/></AuthGuard>} />
                    <Route path='/users/add' element={<AuthGuard><AddUser/></AuthGuard>} />
                    <Route path='/users/update/:id' element={<AuthGuard><UpdateUser/></AuthGuard>} />
                  </Routes>
                </Router>
      </div>
    );
}

export default App;
