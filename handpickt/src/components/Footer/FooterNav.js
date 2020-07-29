import React from 'react'
import { Link } from 'react-router-dom'
import WithAuthentication from "../Auth/WithAuthentication"
import "./FooterNav.css"
const BottomNavbar = (props) => {
    //generate the center position NavBar link image and route according to the current path//
    const centerFunction = () => {
        if (props[0][0].location.pathname === "/dashboard" || 
            props[0][0].location.pathname === "/addplant" || 
            props[0][0].location.pathname === "/archive" || 
            props[0][0].location.pathname === "/addnote" || 
            props[0][0].location.pathname === "/search" || 
            props[0][0].location.pathname === "/addanother")
            {
            return (
                <>
                    <img className="center__Nav__Dashboard" src={require(`../images/HPbottomNavPic.png`)} alt="HandPickt Logo" />
                </>
            )}
        else if (props[0][0].location.pathname === "/mygarden") {
            return (
                <>
                    <Link to="/addplant">
                    <img className="center__Nav__Garden" src={require(`../images/seedling.png`)} alt="seedling" />               
                    </Link>
                </>
            )
        }
        else if (props[0][0].location.pathname === "/notes") {
            return (
                <>
                    <Link to="/addnote">
                    <img className="center__Nav__Garden" src={require(`../images/addnote.png`)} alt="seedling" />               
                    </Link>
                </>
            )
        }
        }



    return (
        <>
            <Link to="/dashboard" className="fas fa-home navLink"></Link>
            <Link to="/mygarden" className="fas fa-seedling navLink"></Link>
            {centerFunction()}
            <Link to="/notes" className="fas fa-clipboard navLink"></Link>
            <Link to="/archive" className="fas fa-archive navLink"></Link>     
        </>
    )
}

export default WithAuthentication(BottomNavbar)