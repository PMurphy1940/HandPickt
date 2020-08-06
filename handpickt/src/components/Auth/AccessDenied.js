import React from 'react'
import { Link } from 'react-router-dom'
import "./AccessDenied.css"

const AccessDenied = (props) => {

    return (
        <div className="login_Containter">
            <div className="Logo">       
                <picture >               
                    <img className="HPLogo" src={require(`../images/HandPickt_3.png`)} alt="HandPickt Logo" />
                </picture>
            </div>
            <div className="logout_Outline">
                <h2 className="Denied">We're Sorry. You must be logged in to HandPickT to view this page</h2>
                <picture >               
                    <img className="sunshine__Pic__Access__Denied" src={require(`../images/Sunshine.png`)} alt="Sunshine with heart hands" />
                </picture>
                    <Link to="/login" className="returnTo__Login" >You may access the Login page here</Link>
            </div>
        </div>
    )
    
}

export default AccessDenied