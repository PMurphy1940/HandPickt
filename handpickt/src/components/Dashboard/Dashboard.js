import React, { useState, useEffect } from 'react'
import WithAuthentication from "../Auth/WithAuthentication"
import Image from 'react-bootstrap/Image'
import "./Dashboard.css"

const Dashboard = (props) => {
    const [activeUser, setActiveUser] = useState()

    useEffect(() => {
    setActiveUser(JSON.parse(sessionStorage.credentials))
    }, [])
    const handleLogout = () => {
        sessionStorage.removeItem("credentials")
        setActiveUser()
        props[0].history.push("/logout");

    }
    // <button type="button" className="fas fa-search search__button"></button>

    return (
        <div className="dashboard__Container">
        
            <div className="dashboard__Header">
                <picture >               
                    <img className="HPLogo__InApp" src={require(`../images/HandPickt_3.png`)} alt="HandPickt Logo" />
                </picture>
                <div className="logout__Grouping">
                    <button type="button" className="logout__Button" onClick={handleLogout}>
                    { (activeUser !== undefined) &&
                    <Image src={require(`../images/${activeUser.image}`)} roundedCircle className="user__Image__Dashboard" />
                    }<p className="logout__Text">Log Out</p></button>
                </div>
            </div>
            <div className="user__Container__Dashboard">
            <p>Welcome</p>              
                   
           </div>
        </div>
    )
}

export default WithAuthentication(Dashboard) 

