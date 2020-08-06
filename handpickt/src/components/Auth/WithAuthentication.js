import React from 'react'
import { Link } from 'react-router-dom'

const WithAuthentication = (View) => {
    const isAuthenticated = () => {
        return sessionStorage.credentials ? true : false
    }

    

    return (...props) => {
       if (isAuthenticated()) {
            return <View {...props} />
                }
       else {
            
        }
    }
}

export default WithAuthentication

