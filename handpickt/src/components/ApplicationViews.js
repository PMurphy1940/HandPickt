import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import Login from "./Login/Login"

const ApplicationViews = (props) => {

    return (
        <>
            <Route
            path="/login"
            render={props => {
                return <Login {...props} />
            }}/>
        </>
    )

}

export default ApplicationViews