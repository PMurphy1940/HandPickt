import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import WithAuthentication from "../Auth/WithAuthentication"

const Dashboard = () => {


    return (
        <>
            <p>welcome to HandPickt</p>
        </>
    )
}

export default WithAuthentication(Dashboard) 