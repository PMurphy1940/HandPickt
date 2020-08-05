import React from 'react'
import { Link } from 'react-router-dom'

const WithAuthentication = (View) => {
    const isAuthenticated = () => {
        return sessionStorage.credentials ? true : false
    }

    

    return (...props) => {
       if (isAuthenticated()) {
            return <View {...props} />
                }
       else {
            return <>
                    
                    <div className="login_Containter">
                        <div className="Logo">       
                            <picture >               
                                <img className="HPLogo" src={require(`../images/HandPickt_3.png`)} alt="HandPickt Logo" />
                            </picture>
                        </div>
                        <div className="logout_Outline">
                            <h2 className="Thanks">We're Sorry. You must be logged in to HandPickt to access this page</h2>
                            <picture >               
                                <img className="sunshine__Pic" src={require(`../images/Sunshine.png`)} alt="Sunshine with heart hands" />
                            </picture>
                                <Link to="/login" className="returnTo__Login" >Didn't mean to leave? Return to login here</Link>
                        </div>
                    </div>
                </>
        }
    }
}

export default WithAuthentication

