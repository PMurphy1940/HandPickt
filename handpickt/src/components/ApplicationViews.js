import React, { useState, useEffect } from 'react'
import { Route } from 'react-router-dom'
import Login from "./Login/Login"
import Registration from "./Registration/Registration"
import Dashboard from "./Dashboard/Dashboard"
import MyGarden from "./MyGarden/MyGarden"
import AddPlant from "./AddPlant/AddPlant"
import AddNote from "./AddNote/AddNote"
import Notes from "./Notes/Notes"
import Archive from "./Archive/Archive"
import Search from "./Search/Search"
import LogOut from "./LogOut/LogOut"

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
            path="/dashboard"
            render={props => {
                return <Dashboard {...props} activeUser={activeUser} setUser={setUser}/>
            }} /> 
            
            <Route
            exact
            path="/mygarden"
            render={props => {
                return <MyGarden {...props} activeUser={activeUser} setUser={setUser}/>
            }} />

            <Route
            exact
            path="/notes"
            render={props => {
                return <Notes {...props} activeUser={activeUser} setUser={setUser}/>
            }} /> 

            <Route
            exact
            path="/addplant"
            render={props => {
                return <AddPlant {...props} activeUser={activeUser} setUser={setUser}/>
            }} /> 

            <Route
            exact
            path="/addnote"
            render={props => {
                return <AddNote {...props} activeUser={activeUser} setUser={setUser}/>
            }} /> 

            <Route
            exact
            path="/archive"
            render={props => {
                return <Archive {...props} activeUser={activeUser} setUser={setUser}/>
            }} />

            <Route
            exact
            path="/search"
            render={props => {
                return <Search {...props} activeUser={activeUser} setUser={setUser}/>
            }} /> 

            <Route
            exact
            path="/logout"
            render={props => {
                return <LogOut {...props} setUser={setUser}/>
            }} />
        </>
    )

}

export default ApplicationViews