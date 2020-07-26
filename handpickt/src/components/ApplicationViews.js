import React from 'react'
import { Route } from 'react-router-dom'
import Login from "./Login/Login"
import Registration from "./Registration/Registration"
import Dashboard from "./Dashboard/Dashboard"
import LogOut from "./LogOut/LogOut"

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

            <Route
            exact
            path="/logout"
            render={props => {
                return <LogOut {...props} />
            }} />

        </>
    )

}

export default ApplicationViews