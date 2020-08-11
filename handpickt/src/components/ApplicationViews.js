import React, { useState, useEffect } from 'react'
import { Route, Redirect } from 'react-router-dom'
import Login from "./Login/Login"
import Registration from "./Registration/Registration"
import AddAnother from "./AddPlant/AddAnother"
import AddPlant from "./AddPlant/AddPlant"
import AccessDenied from "./Auth/AccessDenied"
import PageViews from './PageViews/PageViews'
const ApplicationViews = (props) => {
    const [activeUser, setActiveUser] = useState({userName: "", email: "", image: "", id: 0})

    useEffect(() => {
        if (sessionStorage.credentials !== undefined) {
            setActiveUser(JSON.parse(sessionStorage.credentials))}
    },[])
    const setUser = () => {
        if (sessionStorage.credentials !== undefined) {
            setActiveUser(JSON.parse(sessionStorage.credentials))
            
        }
    }
   
    return (
        <>
            <Route
            path="/login"
            render={props => {
                return <Login {...props} setUser={setUser} />
            }} />
            
            <Route
            exact
            path="/"
            render={props => {
                return <Redirect to="/login" {...props} setUser={setUser} />
            }} />
            <Route
            path="/accessdenied"
            render={props => {
                return <AccessDenied {...props} />
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

            
            <PageViews {...props} activeUser={activeUser} setUser={setUser}/>
            
            
           
        </>
    )

}

export default ApplicationViews