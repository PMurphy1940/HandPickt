import React from 'react'
import { Link } from 'react-router-dom'
import WithAuthentication from "../Auth/WithAuthentication"
import BottomNavbar from "../Footer/FooterNav"
import { Navbar } from 'react-bootstrap';
import Image from 'react-bootstrap/Image'
import "./Dashboard.css"

const Dashboard = (props) => {

    const handleLogout = () => {
        sessionStorage.removeItem("credentials")
        props[0].setUser()
        props[0].history.push("/logout");

    }
    // <button type="button" className="fas fa-search search__button"></button>
        
    return (
        <div className="dashboard__Container">
            <button type="button" className="logout__Button" onClick={handleLogout}>Logout</button>
            <div className="dashboard__Header">
                <picture className="HPLogo__box">               
                    <img className="HPLogo__InApp" src={require(`../images/HandPickt_3.png`)} alt="HandPickt Logo" />
                </picture>
                <Link to="/search" className="search__Object" >
                <p>Search myHandPickt</p>&#x1F50D;
                </Link>
            </div>
            <div className="user__Container__Dashboard">
                { (props[0].activeUser.image !== "") &&
                        <Image src={require(`../images/${props[0].activeUser.image}`)} roundedCircle className="user__Image__Dashboard" />
                        }
                <p>Welcome<br></br><strong>{props[0].activeUser.userName}</strong></p>                   
            </div>
            <div className="dashboard__Linkbox">
                <div className="dashboard__Row1">
                    <Link to="/mygarden" className="link__Dashboard" >
                        <div className="gradient__Button">
                            <Image src={require(`../images/blueMeanie.png`)} rounded className="image1__Dashboard" />
                        </div>
                        <p>My Garden</p>
                    </Link>
                    <Link to="/notes" className="link__Dashboard" >
                    <div className="gradient__Button">
                        <Image src={require(`../images/cuttingboard.png`)} rounded className="image1__Dashboard" />
                            </div>
                        <p>Notes</p>
                        { props[0].noteAlert && 
                            <Image src={require(`../images/addnote.png`)} rounded className="noteAlert__Dashboard" />
                        }
                    </Link>
                </div>
                <div className="dashboard__Row2">
                    <Link to="/addplant" className="link__Dashboard" >
                        <div className="gradient__Button">
                            <Image src={require(`../images/Tomato1.png`)} rounded className="image1__Dashboard" />
                        </div>
                        <p>Add a Plant</p>
                    </Link>
                    <Link to="/archive" className="link__Dashboard" >
                        <div className="gradient__Button">
                            <Image src={require(`../images/Peppers.png`)} rounded className="image1__Dashboard" />
                        </div>
                        <p>Archives</p>
                    </Link>
                </div>
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

