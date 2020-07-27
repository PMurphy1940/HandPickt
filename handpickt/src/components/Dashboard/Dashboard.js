import React from 'react'
import { Link } from 'react-router-dom'
import WithAuthentication from "../Auth/WithAuthentication"
import BottomNavbar from "../Footer/FooterNav"
import { Navbar } from 'react-bootstrap';
import Image from 'react-bootstrap/Image'
import "./Dashboard.css"

const Dashboard = (props) => {
console.log(props[0])
    const handleLogout = () => {
        sessionStorage.removeItem("credentials")
        props[0].setUser()
        props[0].history.push("/logout");

    }
    // <button type="button" className="fas fa-search search__button"></button>
                //  <div className="logout__Grouping">
                //     <button type="button" className="logout__Button" onClick={handleLogout}>
                //         { (activeUser !== undefined) &&
                //             <Image src={require(`../images/${activeUser.image}`)} roundedCircle className="user__Image__Dashboard" />
                //         }
                //     <p className="logout__Text">Log Out</p></button>
                // </div>
    return (
        <div className="dashboard__Container">
            <button type="button" className="logout__Button" onClick={handleLogout}>Logout</button>
            <div className="dashboard__Header">
                <picture >               
                    <img className="HPLogo__InApp" src={require(`../images/HandPickt_3.png`)} alt="HandPickt Logo" />
                </picture>
                
            </div>
            <div className="user__Container__Dashboard">
                { (props[0].activeUser.image !== "") &&
                        <Image src={require(`../images/${props[0].activeUser.image}`)} roundedCircle className="user__Image__Dashboard" />
                        }
                <p>Welcome<br></br><strong>{props[0].activeUser.userName}</strong></p>                   
            </div>
            <div className="dashboard__Row1">
                <Link to="/mygarden" className="returnTo__Login" >My Garden</Link>
                <Link to="/notes" className="returnTo__Login" >Notes</Link>
            </div>
            <div className="dashboard__Row2">
                <Link to="/addplant" className="returnTo__Login" >Add a Plant</Link>
                <Link to="/archives" className="returnTo__Login" >Archives</Link>
            </div>
            <Navbar fixed="bottom" className="bottom__Nav">
                <div >
                    <BottomNavbar {...props}/>
                </div>
            </Navbar>
        </div>
    )
}

export default WithAuthentication(Dashboard) 

