import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import helper from "../Helpers/Helper"
import API from "../Server/HandPicktAPI"
import "./Login.css"

const Login = (props) => {
    const [passwordView, setPasswordView] = useState(true)
    // const [authenticated, setAuthenticated] = useState(false)
    const [badAccountName, setBadAccountName] = useState (false)
    const [badPassword, setBadPassword] = useState (false)

        //warning field indicators//
    const toggleBadAccount = () => {
        setBadAccountName(!badAccountName)
    }
    const toggleBadPassword = () => {
        setBadPassword(!badPassword)
    }

    //Testing buttons//

    // <Button  variant="light" onClick={toggleBadAccount} >Toggle bad account</Button>{' '}
    // <Button  variant="light" onClick={toggleBadPassword} >Toggle bad password</Button>{' '}

    //End of testing buttons//

    //Make password visible//
    const togglePasswordView = () => {
        setPasswordView(!passwordView)
    }
 
    //Declare and set initial state on Login and Registration forms//
    const [loginForm, setLoginForm] = useState({
            userName:"", 
            password:""
        })

    //Handle the user input from the entry fields//
    const handleChange = (e) => {
        setBadAccountName(false)
        setBadPassword(false)
        const change = { ...loginForm};
        change[e.target.id] = e.target.value;
        setLoginForm(change);
    }
    //Query the database to see if the user exists//
    const handleLogin = () => {

                //Remove any whitespace from the User Name
        const loginSearchQuery = helper.removeSpace(loginForm.userName);

        let foundUser
               //Query the Database//
               API.loginQuery(loginSearchQuery)
               .then((response) => {
                    foundUser = response[0];
                    if (foundUser === undefined) {
                        toggleBadAccount()
                    }

                    else {
                    //Verify the user//
                    authenticateUser(foundUser)
                    }
               })
    }

                //Authenticate the User entry//
        const authenticateUser = (foundUser) => {
            if (loginForm.userName === foundUser.userName && loginForm.password === foundUser.passwords[0].password) {
                delete foundUser.passwords
                sessionStorage.setItem("credentials", JSON.stringify(foundUser))
                // props.history.push("/dashboard")
            }
            else if (loginForm.userName !== foundUser.userName) {
                toggleBadAccount()
            }
            else if (loginForm.password !== foundUser.passwords[0].password) {
                toggleBadPassword()
            }
        }


    return (
        <div className="login_Containter">
            <div className="Logo">       
                <picture >               
                    <img className="HPLogo" src={require(`../images/HandPickt_3.png`)} alt="HandPickt Logo" />
                </picture>
            </div>
            <div className="login_Outline">
                <p>Login</p>
                <div >
                    <fieldset className="loginFields">
                        <input
                            className="individual__Login__Field1" 
                            type="text" 
                            id="userName" 
                            value={loginForm.userName}
                            placeholder="Account Name"
                            onChange={handleChange}
                            />
                        <p hidden={!badAccountName} className="warning__field__Name">Sorry, that account name does not exist</p>
                        <div className="password__Field">
                            <input 
                                className="individual__Login__Field2" 
                                type={passwordView ? "password" : "text"} 
                                id="password"  
                                value={loginForm.password}
                                placeholder="Password"
                                onChange={handleChange}
                                />
                                <p hidden={!badPassword} className="warning__field__Password">Sorry, the password does not match</p>
                            <button onClick={togglePasswordView}>{passwordView ? <i className="far fa-eye-slash"></i> : <i className="far fa-eye"></i>}</button>
                        </div>
                    </fieldset>
                    <Link to="/registration" className="reg__Link" >New to HandPickt? Register here</Link>
                </div>
                <div className="login__Button">
                    <Button  variant="light" onClick={handleLogin} >Login</Button>
                    
                </div>
            </div>
        </div>
    )


}

export default Login