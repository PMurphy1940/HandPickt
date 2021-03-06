import React from 'react'
import WithAuthentication from "../Auth/WithAuthentication"
import BottomNavbar from "../Footer/FooterNav"
import { Navbar, Button } from 'react-bootstrap';
import Image from 'react-bootstrap/Image'


const MyGarden = (props) => {

    const handleLogout = () => {
        sessionStorage.removeItem("credentials")
        props[0].setUser()
        props[0].history.push("/logout");
    }

    return(
        <div className="dashboard__Container">
            <div className="dashboard__Header">
                <picture >               
                    <img className="HPLogo__InApp" src={require(`../images/HandPickt_3.png`)} alt="HandPickt Logo" />
                </picture>
                <div className="logout__Grouping">
                    <button type="button" className="logout__Button__With__Image" onClick={handleLogout}>
                        { (props[0].activeUser.image !== "") &&
                            <Image src={require(`../images/${props[0].activeUser.image}`)} roundedCircle className="user__Image__Garden" />
                        }
                    <p className="logout__Text">Log Out</p></button>
                </div>
            </div>
            <div className="user__Container__AddAnother">
                    <h2>Success!</h2>
                    <img className="Another_Gif" src={require(`../images/Sprouts.gif`)} alt="Sprouting plants" />
                    <Button variant="primary" className="addanother__Button" onClick={ () => props[0].history.push("/addplant")}>I would Like to Add Another Plant</Button>
                    <Button variant="primary" className="addanother__Button" onClick={ () => props[0].history.push("/dashboard")}>I'm finished</Button>
            </div>
        
            <Navbar fixed="bottom" className="bottom__Nav">
                <div >
                    <BottomNavbar {...props}/>
                </div>
            </Navbar>
        </div>
    )
}

export default WithAuthentication(MyGarden)


                