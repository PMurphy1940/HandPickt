import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import Login from "./Login/Login"
import Dashboard from "./Dashboard/Dashboard"

const ApplicationViews = (props) => {

    return (
        <>
            <Route
            path="/login"
            render={props => {
                return <Login {...props} />
            }}/>
            <Route
            exact
            path="/dashboard"
            render={props => {
                return <Dashboard {...props} />
            }}
            />

        </>
    )

}

export default ApplicationViews