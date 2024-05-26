import { createContext, useState } from "react";
import TankService from "../Service/TankService";
import ModuleService from "../Service/ModuleService";
import AuthService from "../Service/AuthService";
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import { useEffect } from "react";

import axios from 'axios';
import { jwtDecode } from "jwt-decode";

export const AppContext = createContext(null);


export const AppProvider = ({ children }) => {

    const [serverStatus, setServerStatus] = useState(false);
    const [isOnline, setIsOnline] = useState(true);
    const [tanksData, setTanksData] = useState([]);
    const [modulesData, setModulesData] = useState([]);
    const [accessToken, setAccessToken] = useState(
        localStorage.getItem("accessToken") || null
    );
    const [isAuthenticated, setIsAuthenticated] = useState(
        localStorage.getItem("isAuthenticated") === "true" || false
    );
    const [currentUserId, setCurrentUserId] = useState(
        localStorage.getItem("currentUserId") || null
    );


    useEffect(() => {
        window.addEventListener('online', () => setIsOnline(true))
        window.addEventListener('offline', () => setIsOnline(false))

        return () => {
            window.removeEventListener('online', () => setIsOnline(true))
            window.removeEventListener('offline', () => setIsOnline(false))
        }
    }, []);

    useEffect(() => {

        const checkServerHealth = () => {
            TankService.checkServerHealth()
                .then(() => setServerStatus(true))
                .catch(() => setServerStatus(false));
                
        };
        checkServerHealth();
        setInterval(checkServerHealth, 10000); // 10 seconds interval
    }, []);


    useEffect(() => {
        localStorage.setItem('actions', JSON.stringify([]));
    }, []);








    async function updateWithServer() {
        const actions = JSON.parse(localStorage.getItem('actions'));
        if (actions) {
            for (let i = 0; i < actions.length; i++) {
                const action = actions[i];
                if (action.dataType === 'tank') {
                    if (action.action === 'add') {
                        try {
                            const data = await TankService.addTank(action.element);
                            const prevId = action.element.id;
                            for (let j = i + 1; j < actions.length; j++) {
                                if (actions[j].dataType === 'tank' && actions[j].element.id === prevId) {
                                    actions[j].element.id = data;
                                }
                                else if (actions[j].dataType === 'module' && actions[j].element.tankId === prevId) {
                                    actions[j].element.tankId = data;
                                }
                            }
                        } catch (error) {
                            console.log('Error adding tank:', error);
                        }
                    } else if (action.action === 'delete') {
                        try {
                            await TankService.deleteTank(action.element.id);
                        } catch (error) {
                            console.log('Error deleting tank:', error);
                        }
                    } else if (action.action === 'update') {
                        try {
                            await TankService.updateTank(action.element);
                        } catch (error) {
                            console.log('Error updating tank:', error);
                        }
                    }
                }

                else if (action.dataType === 'module') {
                    if (action.action === 'add') {
                        try {
                            const data = await ModuleService.addModule(action.element);
                            const prevId = action.element.id;
                            for (let j = i + 1; j < actions.length; j++) {
                                if (actions[j].dataType === 'module' && actions[j].element.id === prevId) {
                                    actions[j].element.id = data;
                                }
                            }

                        } catch (error) {
                            console.log('Error adding module:', error);
                        }
                    } else if (action.action === 'delete') {
                        try {
                            await ModuleService.deleteModule(action.element.id);
                        } catch (error) {
                            console.log('Error deleting module:', error);
                        }
                    } else if (action.action === 'update') {
                        try {
                            await ModuleService.updateModule(action.element);
                        } catch (error) {
                            console.log('Error updating module:', error);
                        }
                    }
                }

            }
            localStorage.setItem('actions', JSON.stringify([]));
            await TankService.getTanks().then((data) => {
                setTanksData(data);
            }).catch((error) => {
                console.log(error);
            })
        }
    }



    useEffect(() => {
        if (isOnline && serverStatus) {
            updateWithServer();
        }
    }, [isOnline, serverStatus]);




    useEffect(() => {
        const socket = new SockJS('http://localhost:8080/tanks'); // Adjust the URL as needed

        const stompClient = Stomp.over(socket);
        stompClient.connect({}, () => {
            stompClient.subscribe('/topic/tanks', (message) => {

                const tankData = JSON.parse(message.body);
                setTanksData(tankData);
            });
        });
    }, []);


    const handleAddTank = (tankToAdd) => {
        tankToAdd.userId = currentUserId;
        if (!isOnline || !serverStatus) {
            console.log("Adding tank locally")
            tankToAdd.id = tanksData.length + 1;
            const action = {
                action: 'add',
                dataType: 'tank',
                element: tankToAdd
            }

            const actions = JSON.parse(localStorage.getItem('actions'));
            localStorage.setItem('actions', JSON.stringify([...actions, action]));
            setTanksData([tankToAdd, ...tanksData]);
        }

        else {
            TankService.addTank(tankToAdd).then(() => {
                TankService.getTanks().then((data) => {
                    setTanksData(data);
                }).catch((error) => { console.log(error); })
            }).catch((error) => { console.log(error); })
        }
    };

    const handleDeleteTank = (tankId) => {
        if (!isOnline || !serverStatus) {
            const action = {
                action: 'delete',
                dataType: 'tank',
                element: tankId
            }
            const actions = JSON.parse(localStorage.getItem('actions'));
            localStorage.setItem('actions', JSON.stringify([...actions, action]));
            setTanksData(tanksData.filter((tank) => tank.id !== tankId));
        }
        else {
            TankService.deleteTank(tankId).then(() => {
                TankService.getTanks().then((data) => {
                    setTanksData([...data]);
                }).catch((error) => { console.log(error); })
            }).catch((error) => {
                console.log(error);
            });
        }
    };

    const handleUpdateTank = (updatedTank) => {
        updatedTank.userId = currentUserId;
        if (!isOnline || !serverStatus) {
            const action = {
                action: 'update',
                dataType: 'tank',
                element: updatedTank
            }

            const actions = JSON.parse(localStorage.getItem('actions'));
            localStorage.setItem('actions', JSON.stringify([...actions, action]));
            setTanksData(tanksData.map((tank) => tank.id === updatedTank.id ? updatedTank : tank));
        }
        else {
            TankService.updateTank(updatedTank).then(() => {
                TankService.getTanks().then((data) => {
                    setTanksData(data);
                }).catch((error) => { console.log(error); })
            }).catch((error) => { console.log(error); })
        }
    };

    const handleAddModule = (module) => {
        if (!isOnline || !serverStatus) {

            //generate here a random long value 
            module.id = Math.floor(Math.random() * 1000000000000);

            const action = {
                action: 'add',
                dataType: 'module',
                element: module
            }
            const actions = JSON.parse(localStorage.getItem('actions'));
            localStorage.setItem('actions', JSON.stringify([...actions, action]));
            setModulesData([...modulesData, module]);
           
        }
        else {

            ModuleService.addModule(module)
                .then(() => {
                    return ModuleService.getTankModulesByModuleType(module.tankId, module.moduleType)
                        .then((modules) => {
                            setModulesData(modules);
                        })
                        .catch((error) => {
                            console.error('Error fetching tank modules:', error);
                        });
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        }
    }


    const handleUpdateModule = (module) => {
        if (!isOnline || !serverStatus) {

            const action = {
                action: 'update',
                dataType: 'module',
                element: module
            }

            const actions = JSON.parse(localStorage.getItem('actions'));
            localStorage.setItem('actions', JSON.stringify([...actions, action]));
            setModulesData(modulesData.map((mod) => mod.id === module.id ? module : mod));
        }
        else {
            ModuleService.updateModule(module)
                .then(() => {
                    return ModuleService.getTankModulesByModuleType(module.tankId, module.moduleType)
                        .then((modules) => {
                            setModulesData(modules);
                        })
                        .catch((error) => {
                            console.error('Error fetching tank modules:', error);
                        });
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }


    const handleDeleteModule = (module) => {
        if (!isOnline || !serverStatus) {
            const action = {
                action: 'delete',
                dataType: 'module',
                element: module
            }
            const actions = JSON.parse(localStorage.getItem('actions'));
            localStorage.setItem('actions', JSON.stringify([...actions, action]));
            setModulesData(modulesData.filter((mod) => mod.id !== module.id));
        }
        else {
            ModuleService.deleteModule(module.id)
                .then(() => {
                    return ModuleService.getTankModulesByModuleType(module.tankId, module.moduleType)
                        .then((modules) => {
                            setModulesData(modules);
                        })
                        .catch((error) => {
                            console.error('Error fetching tank modules:', error);
                        });
                })
                .catch((error) => {
                    console.error(error);
                });

        }
    }

    const fetchModulesByTankIdAndModuleType = (tankId, moduleType) => {


        if(!serverStatus || !isOnline){
            return;
        }
        ModuleService.getTankModulesByModuleType(tankId, moduleType).then((modules) => {
            setModulesData(modules);
        }).catch((error) => {
            console.error('Error fetching tank modules:', error);
        });
    }


    const getTankById = (tankId) => {
        if(!serverStatus || !isOnline){
            return tanksData.find((tank) => tank.id === tankId);
        }
        return TankService.getTankById(tankId);
    }



    useEffect(() => {
        const handleAuthentication = () => {
            if (accessToken) {
                const { exp } = jwtDecode(accessToken);
                const { role } = jwtDecode(accessToken);
                console.log(role);
                console.log(exp);
                const expirationTime = exp * 1000;
                const currentTime = Date.now();

                if (expirationTime > currentTime) {
                    setIsAuthenticated(true);
                    localStorage.setItem("isAuthenticated", true);
                    const timeUntilExpiration = expirationTime - currentTime;
                    console.log(timeUntilExpiration);
                    const refreshTimeout = setTimeout(() => {
                        console.log("Aceess token has expired, refreshing...");
                        setIsAuthenticated(false);
                        setAccessToken(null);
                        localStorage.removeItem("accessToken");
                        localStorage.removeItem("isAuthenticated");
                    }, timeUntilExpiration - 60000);

                    return () => clearTimeout(refreshTimeout);
                } else {
                    console.log("Access token has expired");
                    setIsAuthenticated(false);
                    setAccessToken(null);
                    localStorage.removeItem("accessToken");
                    localStorage.removeItem("isAuthenticated");
                }
            } else {
                setIsAuthenticated(false);
                localStorage.removeItem("isAuthenticated");
            }
        };

        handleAuthentication();
    }, [accessToken]);

    useEffect(() => {
        const handleAuthHeader = () => {
            if (isAuthenticated) {
                axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
            } else {
                delete axios.defaults.headers.common.Authorization;
            }
        };

        handleAuthHeader();
    }, [isAuthenticated, accessToken]);

    const handleRegisterUser = (user) => {
        AuthService.register(user)
            .then(() => {
                // setAccessToken(response.token);
                // localStorage.setItem("accessToken", response.token);
                // setIsAuthenticated(true);
                // localStorage.setItem("isAuthenticated", true);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleLoginUser = (user) => {
        AuthService.login(user)
            .then((response) => {
                setAccessToken(response.token);
                localStorage.setItem("accessToken", response.token);
                // setIsAuthenticated(true);
                // localStorage.setItem("isAuthenticated", true)
                setCurrentUserId(response.id);
                localStorage.setItem("currentUserId", response.id);

            })
            .catch((error) => {
                console.log(error);
            });

    };

    const handleLogoutUser = () => {
        setAccessToken(null);
        setIsAuthenticated(false);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("isAuthenticated");
        localStorage.removeItem("currentUserId");
        delete axios.defaults.headers.common.Authorization;
    };

    return (
        <AppContext.Provider value={{ getTankById, tanksData, serverStatus, isOnline, handleAddTank, handleDeleteTank, handleUpdateTank, handleAddModule, handleUpdateModule, handleDeleteModule, fetchModulesByTankIdAndModuleType, modulesData, setModulesData, accessToken, isAuthenticated, handleLoginUser, handleRegisterUser, handleLogoutUser, currentUserId }}>
            {children}
        </AppContext.Provider>)

}