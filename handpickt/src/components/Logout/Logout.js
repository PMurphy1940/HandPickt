import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import LogOutAdd from "./LogOutADD"
import "./Logout.css"

const Logout = (props) => {

const [openAdd, setOpenAdd] = useState(false)
const [addRun, setAddRun] = useState(false)

const showAdd = () => {
    setOpenAdd(true)
    setAddRun(true)
}

if (addRun === false) {
setTimeout(showAdd, 2000)}


const closeAdd = () => {
    setOpenAdd(false)
}

    return (
        <div className="login_Containter">
            <div className="Logo">       
                <picture >               
                    <img className="HPLogo" src={require(`../images/HandPickt_3.png`)} alt="HandPickt Logo" />
                </picture>
            </div>
            <div className="logout_Outline">
                <h2 className="Thanks">Thank You for choosing HandPickT</h2>
                <picture >               
                    <img className="sunshine__Pic" src={require(`../images/vegetableheart.png`)} alt="Sunshine with heart hands" />
                </picture>
                    <Link to="/login" className="returnTo__Login" >Didn't mean to leave? Return to login here</Link>
            </div>
            <LogOutAdd 
                closeAdd={closeAdd} 
                openAdd={openAdd}                
                {...props}
                /> 
        </div>
    )
    
}

export default Logout