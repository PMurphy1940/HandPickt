import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import helper from "../Helpers/Helper"
import API from "../Server/HandPicktAPI"
import "./Registration.css"

const Registration = (props) => {
    const [passwordView, setPasswordView] = useState(true)
    const [badEmail, setBadEmail] = useState(false)
    const [existingEmail, setExistingEmail] = useState(false)
    const [badAccountName, setBadAccountName] = useState (false)
    const [emptyAccountName, setEmptyAccountName] = useState (false)
    const [badPassword, setBadPassword] = useState (false)
    const [badPasswordMatch, setBadPasswordMatch] = useState (false)

         //Declare and set initial state on Registration form//
    const [registrationForm, setRegistrationForm] = useState({       
            userName: "",
            email:"",
            password: "",
            confirmPassword: "",
            image: ""      
    })

    
    //warning field indicators//
    const toggleBadAccount = () => {
        setBadAccountName(!badAccountName)
    }
    const toggleEmptyAccountName = () => {
        setEmptyAccountName(!emptyAccountName)
    }
    const toggleBadPassword = () => {
        setBadPassword(!badPassword)
    }
    const toggleBadEmail = () => {
        setBadEmail(!badEmail)
    }
    const toggleExistingEmail = () => {
        setExistingEmail(!existingEmail)
    }
    const toggleBadPasswordMatch = () => {
        setBadPasswordMatch(!badPasswordMatch)
    }
    //Testing buttons//
    // <Button  variant="light" onClick={toggleBadAccount} >Toggle bad account</Button>{' '}
    // <Button  variant="light" onClick={toggleBadPassword} >Toggle bad password</Button>{' '}  
    // <Button  variant="light" onClick={toggleBadEmail} >Toggle bad email</Button>{' '}  
    // <Button  variant="light" onClick={toggleBadPasswordMatch} >Toggle bad Match</Button>{' '}  
    //End of testing buttons//

    //Make password visible or hidden again//
    const togglePasswordView = () => {
        setPasswordView(!passwordView)
    }
 
   
    //Handle the user input from the entry fields//
    const handleChange = (e) => {
        setBadAccountName(false)
        setEmptyAccountName(false)
        setBadEmail(false)
        setBadPassword(false)
        setBadPasswordMatch(false)
        const change = { ...registrationForm};
        change[e.target.id] = e.target.value;
        setRegistrationForm(change);
    }
    //Query the database to see if the user exists//
    const handleRegistration = () => {

        //check for blank fields//
        if (registrationForm.userName === "" || registrationForm.email === "" || registrationForm.password === "" || registrationForm.password !== registrationForm.confirmPassword) {
            //Indicate bad fields//
            if (registrationForm.userName === "") {
                toggleEmptyAccountName()
             }
            else if (registrationForm.email === "") {
                toggleBadEmail()
                }
            else if (registrationForm.password === "") {
                toggleBadPassword()
                }
            else if (registrationForm.password !== registrationForm.confirmPassword) {
                toggleBadPasswordMatch()
                }
            }
        //On valid fields, call the function to build the user object, check the Account name isn't already in use, and then send to the database//
        else {

            //Refactor any spaces in the Account Name for use in a search//
            const registrationSearchQuery = helper.removeSpace(registrationForm.userName);
            let foundUser
                //Query the Database to check account name//
                API.loginQuery(registrationSearchQuery, "userName")
                .then((response) => {
                    foundUser = response[0];
                       API.loginQuery(registrationForm.email, "email")
                        .then((response) => {
                            let foundEmail = response[0];

                                if (foundUser !== undefined) {
                                    toggleBadAccount()
                                        }
                                else if (foundEmail !== undefined) {
                                    toggleExistingEmail()
                                }
                                else {
                                    constructNewUserObject()
                                    }
                                }) 
            })
}
        //Make the new user object to send to the database
    const constructNewUserObject = () => {
        let newUserObject = {
            userName: registrationForm.userName,
            email: registrationForm.email,
            image: registrationForm.image
        }
       API.addNew( newUserObject, "users" )
       .then(() => attachUserIdAndSavePassword())
    }

    const attachUserIdAndSavePassword = () => {
        //Remove any whitespace from the User Name
        const registrationSearchQuery = helper.removeSpace(registrationForm.userName);
        let foundUser
            //Query the Database to get the newly saved users id/
            API.loginQuery(registrationSearchQuery, "userName")
            .then((response) => {
                foundUser = response[0];       
                    //Make the password object to send to the database//
                    let passwordObject = {
                        userId: foundUser.id,
                        password: registrationForm.password
                    }
                    //Store the user's password in a seperate database file//
                    API.addNew( passwordObject, "passwords" )
                    .then(() => placeNewUserIntoSessionStorage(foundUser))
                })
            }
    }

    const placeNewUserIntoSessionStorage = (foundUser) => {
            delete foundUser.passwords;
            //Set the new users credentials to session storage//
            sessionStorage.setItem("credentials", JSON.stringify(foundUser));
            props.history.push("/dashboard");
            }
  
            
    


    return (
        <div className="login_Containter">
            <div className="Logo">       
                <picture >               
                    <img className="HPLogo" src={require(`../images/HandPickt_3.png`)} alt="HandPickt Logo" />
                </picture>
            </div>
            <div className="login_Outline">
                <p>New Account</p>
                <div >
                    <fieldset className="loginFields">
                        <input
                            className="individual__Login__Field1" 
                            type="text" 
                            id="userName" 
                            value={registrationForm.userName}
                            placeholder="Account Name"
                            onChange={handleChange}
                            />
                        <p hidden={!emptyAccountName} className="warning__field__Name">This field is required</p>
                        <p hidden={!badAccountName} className="warning__field__Name">Sorry, this account name is already in use</p>
                        <input
                            className="individual__Login__Field2" 
                            type="email" 
                            id="email" 
                            value={registrationForm.email}
                            placeholder="email address"
                            onChange={handleChange}
                            />
                        <p hidden={!badEmail} className="warning__field__Email">Must be a valid email address</p>
                        <p hidden={!existingEmail} className="warning__field__Email">Sorry, this email is already in use</p>
                        <div className="password__Field">
                            <input 
                                className="individual__Login__Field3" 
                                type={passwordView ? "password" : "text"} 
                                id="password"  
                                value={registrationForm.password}
                                placeholder="Password"
                                onChange={handleChange}
                                />
                                <p hidden={!badPassword} className="warning__field__Password__Empty">Sorry, you must enter a password</p>
                                <button onClick={togglePasswordView}>{passwordView ? <i className="far fa-eye-slash"></i> : <i className="far fa-eye"></i>}</button>
                            <input 
                                className="individual__Login__Field4" 
                                type={passwordView ? "password" : "text"} 
                                id="confirmPassword"  
                                value={registrationForm.confirmPassword}
                                placeholder="Confirm Password"
                                onChange={handleChange}
                                />
                                <p hidden={!badPasswordMatch} className="warning__field__Password">Sorry, the password does not match</p>
                            
                        </div>
                    </fieldset>
                    <Link to="/login" className="reg__Link" >Click here to return to Login</Link>
                </div>
                <div className="login__Button">
                    <Button  variant="light" onClick={handleRegistration} >Register</Button>

                </div>
            </div>
        </div>
    )


}

export default Registration