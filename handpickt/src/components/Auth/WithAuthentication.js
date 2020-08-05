import React from 'react'
import { Redirect } from 'react-router-dom'

const WithAuthentication = (View) => {
    const isAuthenticated = () => {
        return sessionStorage.credentials ? true : false
    }

    return (...props) => {
       if (isAuthenticated()) {
            return <View {...props} />
       }
       else {
            return <Redirect to="/login" />
        }
    }
}

export default WithAuthentication