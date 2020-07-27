import React from 'react'
import { Link } from 'react-router-dom'
import WithAuthentication from "../Auth/WithAuthentication"
import "./FooterNav.css"
const BottomNavbar = (props) => {

    //generate the center position NavBar link type according to the current path//
    const centerFunction = () => {
        if (props[0][0].location.pathname === "/dashboard") {
            return (
                <>
                    <img className="center__Nav__Dashboard" src={require(`../images/HPbottomNavPic.png`)} alt="HandPickt Logo" />
                </>
            )}
        }



    return (
        <>
            <Link to="/dashboard" className="fas fa-home navLink"/>
            <Link to="/dashboard" className="fas fa-seedling navLink"/>
            {centerFunction()}
            <Link to="/dashboard" className="fas fa-clipboard navLink" />
            <Link to="/dashboard" className="fas fa-archive navLink"/>         
        </>
    )
}

export default WithAuthentication(BottomNavbar)