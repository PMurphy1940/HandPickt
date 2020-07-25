import React from 'react'
import { Redirect } from 'react-router-dom'

const WithAuthentication = (View) => {
    const isAuthenticated = () => {
        return sessionStorage.credentials ? true : false
    }

    return (props) => {
        (isAuthenticated) ? 
         <View {...props} /> : <Redirect to="/login" />
    }
}

export default WithAuthentication