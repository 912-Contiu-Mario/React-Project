

import React, { useContext } from 'react';
import { AppContext } from './AppContext';
import { Navigate } from 'react-router-dom';



const AuthGuard = ({ children }) => {
    const isAuthenticated = useContext(AppContext).isAuthenticated;
    if(!isAuthenticated)
        return <Navigate to='/login' />
    return children;
}

export default AuthGuard;