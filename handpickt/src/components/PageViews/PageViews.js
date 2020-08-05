import React, { useState, useEffect } from 'react'
import { Route } from 'react-router-dom'
import LogOut from "../LogOut/Logout"
import Dashboard from "../Dashboard/Dashboard"
import MyGarden from "../MyGarden/MyGarden"
import PlantDetails from "../MyGarden/PlantDetails"
import AddNote from "../Notes/AddNote"
import Notes from "../Notes/Notes"
import Archive from "../Archive/Archive"
import API from "../Server/HandPicktAPI"
import Search from "../Search/Search"


const PageViews = (props) => {
    const [userPlants, setUserPlants] = useState([])
    const [userNotes, setUserNotes] = useState([])
    const [noteAlert, setNoteAlert] = useState(false)
   
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
        getUserNotes()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeUserId])

    const getUserNotes = () => {
        const route = `notes?userId=${props.activeUser.id}`
        API.getAll(route)
        .then((noteData) => {
            setUserNotes(noteData)            
        })      
    }

    useEffect(() => {
        checkForNoteAlert(userNotes)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userNotes])

    const checkForNoteAlert = (notes) => {
        let date = new Date()
        let dayOfWeek = date.getDay()
        dayOfWeek = "day" + dayOfWeek
        
        notes.forEach(note => {
            checkRecurrence(note, dayOfWeek)
        })      
    }

     const checkRecurrence = (singleNote, day) => {

        if (singleNote.recurring === true) {
                if (singleNote[day] === true) {
                    setNoteAlert(true)
                }
            
        }
    }
    
    return (
        <>
        <Route
            exact
            path="/dashboard"
            render={props => {
                return <Dashboard {...props} activeUser={activeUser} setUser={setUser} noteAlert={noteAlert} />
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
                return <Notes {...props} activeUser={activeUser} setUser={setUser} userNotes={userNotes} getUserNotes={getUserNotes} />
            }} /> 

            <Route
            exact
            path="/addnote"
            render={props => {
                return <AddNote {...props} activeUser={activeUser} setUser={setUser} getUserNotes={getUserNotes}/>
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
                return <Search {...props} activeUser={activeUser} setUser={setUser} userPlants={userPlants}/>
            }} />

            <Route
            exact
            path="/logout"
            render={props => {
                return <LogOut {...props} setUser={setUser} setNoteAlert={setNoteAlert} />
            }} />
        </>
    )
}

export default PageViews