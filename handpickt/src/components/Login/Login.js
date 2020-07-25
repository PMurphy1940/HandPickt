import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import "./Login.css"

const Login = (props) => {
    const [passwordView, setPasswordView] = useState(false)
    const togglePasswordView = () => {
        setPasswordView(!passwordView)
    }
 
    //Declare and set initial state on Login and Registration forms//
    const [loginForm, setLoginForm] = useState({
            userName:"", 
            password:""
        })
    const [registrationForm, setRegistrationForm] = useState({
        user: {
            userName: "",
            email:"",
            password: "",
            confirmPassword: ""
        }
    })

    //
    const handleChange = (e) => {
        const change = { ...loginForm};
        change[e.target.id] = e.target.value;
        setLoginForm(change);
    }

    const handleLogin = () => {

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
                            placeholder="UserName"
                            onChange={handleChange}
                            />
                        <div className="password__Field">
                            <input 
                                className="individual__Login__Field2" 
                                type={passwordView ? "password" : "text"} 
                                id="password"  
                                value={loginForm.password}
                                placeholder="Password"
                                onChange={handleChange}
                                />
                            <button onClick={togglePasswordView}>{passwordView ? <i class="far fa-eye-slash"></i> : <i class="far fa-eye"></i>}</button>
                        </div>
                    </fieldset>
                    <Link to="/registration" className="reg__Link" onClick={handleLogin}>New to HandPickt? Register here</Link>
                </div>
                <div className="login__Button">
                    <Button  variant="light">Login</Button>{' '}
                </div>
            </div>
        </div>
    )


}

export default Login