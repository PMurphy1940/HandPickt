import React, { useState, useEffect } from 'react'
import { Route } from 'react-router-dom'
import Login from "./Login/Login"
import Registration from "./Registration/Registration"
import AddAnother from "./AddPlant/AddAnother"
import AddPlant from "./AddPlant/AddPlant"
import PageViews from './PageViews/PageViews'
const ApplicationViews = (props) => {
    const [activeUser, setActiveUser] = useState({userName: "", email: "", image: "", id: 0})

    useEffect(() => {
        if (sessionStorage.credentials !== undefined) {
            setActiveUser(JSON.parse(sessionStorage.credentials))}
    },[])
    const setUser = user => {
        if (sessionStorage.credentials !== undefined) {
            setActiveUser(JSON.parse(sessionStorage.credentials))}
    }
   
    return (
        <>
            <Route
            path="/login"
            render={props => {
                return <Login {...props} setUser={setUser} />
            }} />

            <Route
            path="/registration"
            render={props => {
                return <Registration {...props} setUser={setUser}/>
            }} />

            <Route
            exact
            path="/addplant"
            render={props => {
                return <AddPlant {...props} activeUser={activeUser} setUser={setUser}/>
            }} /> 

            <Route
            exact
            path="/addanother"
            render={props => {
                return <AddAnother {...props} activeUser={activeUser} setUser={setUser}/>
            }} /> 

            {(activeUser.id !== 0) &&
            <PageViews {...props} activeUser={activeUser} setUser={setUser}/>
            }
            
           
        </>
    )

}

export default ApplicationViews