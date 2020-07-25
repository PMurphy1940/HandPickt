import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import "./Login.css"

const Login = (props) => {
    const [loginForm, setLoginForm] = useState({userName:"", password:""})

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
                            name="userName" 
                            value={loginForm.userName}
                            placeholder="UserName"
                            onChange={handleLogin}
                            />
                        <input 
                            className="individual__Login__Field2" 
                            type="text" 
                            id="password" 
                            name="password" 
                            value={loginForm.password}
                            placeholder="Password"
                            onChange={handleLogin}
                            />
                    </fieldset>
                    <Link to="/registration" className="reg__Link">New to HandPickt? Register here</Link>
                </div>
                <div className="login__Button">
                    <Button  variant="light">Login</Button>{' '}
                </div>
            </div>
        </div>
    )


}

export default Login