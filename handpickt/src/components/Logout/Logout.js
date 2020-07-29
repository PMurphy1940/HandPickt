import React from 'react'
import { Link } from 'react-router-dom'
import "./Logout.css"

const Logout = () => {


    return (
        <div className="login_Containter">
            <div className="Logo">       
                <picture >               
                    <img className="HPLogo" src={require(`../images/HandPickt_3.png`)} alt="HandPickt Logo" />
                </picture>
            </div>
            <div className="logout_Outline">
                <p>Thank You for choosing HandPickT</p>
                <picture >               
                    <img className="sunshine__Pic" src={require(`../images/vegetableheart.png`)} alt="Sunshine with heart hands" />
                </picture>
                    <Link to="/login" className="returnTo__Login" >Didn't mean to leave? Return to login here</Link>
            </div>
        </div>
    )
    
}

export default Logout