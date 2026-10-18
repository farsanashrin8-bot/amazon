import React from 'react'
import { Navigate } from 'react-router-dom'

function ProtectedRoute({children}) {
    const isadmin=localStorage.getItem('isAdmin')
  return isadmin=='true'?children:<Navigate to='/adminlogin' replace/>
}

export default ProtectedRoute