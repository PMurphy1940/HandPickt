import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import Login from "./Login/Login"
import Registration from "./Registration/Registration"
import Dashboard from "./Dashboard/Dashboard"

const ApplicationViews = (props) => {

    return (
        <>
            <Route
            path="/login"
            render={props => {
                return <Login {...props} />
            }} />

            <Route
            path="/registration"
            render={props => {
                return <Registration {...props} />
            }} />

            <Route
            exact
            path="/dashboard"
            render={props => {
                return <Dashboard {...props} />
            }} />

        </>
    )

}

export default ApplicationViews