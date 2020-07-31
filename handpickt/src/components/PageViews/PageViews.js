import React, { useState, useEffect } from 'react'
import { Route } from 'react-router-dom'
import Dashboard from "../Dashboard/Dashboard"
import MyGarden from "../MyGarden/MyGarden"
import PlantDetails from "../MyGarden/PlantDetails"
import AddNote from "../AddNote/AddNote"
import Notes from "../Notes/Notes"
import Archive from "../Archive/Archive"
import API from "../Server/HandPicktAPI"
import Search from "../Search/Search"


const PageViews = (props) => {
    const [userPlants, setUserPlants] = useState([])

    
    const activeUser = props.activeUser
    const setUser = props.setUser
    const activeUserId = props.activeUser.id


    //Get the user plants from the database along with the expanded plant data//
    const getUserPlants = () => {
        const route = `userPlants?userId=${props.activeUser.id}&_expand=plant`
        API.getAll(route)
        .then((plantData) => {
            setUserPlants(plantData)            
        })      
    }

    useEffect (() => {
        getUserPlants()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeUserId])

    // console.log("plants", userPlants)
    
    return (
        <>
        <Route
            exact
            path="/dashboard"
            render={props => {
                return <Dashboard {...props} activeUser={activeUser} setUser={setUser} />
            }} /> 
            
            <Route
            exact
            path="/mygarden"
            render={props => {
                return <MyGarden {...props} activeUser={activeUser} setUser={setUser} userPlants={userPlants}/>
            }} /> 

            <Route
            exact
            path="/plantdetails"
            render={props => {
                return <PlantDetails {...props} activeUser={activeUser} setUser={setUser}/>
            }} />

            <Route
            exact
            path="/notes"
            render={props => {
                return <Notes {...props} activeUser={activeUser} setUser={setUser}/>
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
                return <Archive {...props} activeUser={activeUser} setUser={setUser} userPlants={userPlants}/>
            }} />

            <Route
            exact
            path="/search"
            render={props => {
                return <Search {...props} activeUser={activeUser} setUser={setUser}/>
            }} /> 

        </>
    )
}

export default PageViews