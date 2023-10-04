import React, { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/authContext';
import useReuseHook from '../hooks/useReuseHook';
const ProtectedRoute = (props) => {
    const {user}=useReuseHook()
console.log(user)
    if (!user) {
        return <Navigate to="/login" replace />;
      }
      return <Outlet {...props}/>;
}

export default ProtectedRoute