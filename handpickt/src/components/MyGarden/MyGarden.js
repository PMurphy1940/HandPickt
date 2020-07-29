import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import WithAuthentication from "../Auth/WithAuthentication"
import GardenPlantCard from "./GardenPlantCard"
import BottomNavbar from "../Footer/FooterNav"
import API from "../Server/HandPicktAPI"
import { Navbar } from 'react-bootstrap';
import Image from 'react-bootstrap/Image'
import "./MyGarden.css"

const MyGarden = (props) => {
    const [userPlants, setUserPlants] = useState([])

    const handleLogout = () => {
        sessionStorage.removeItem("credentials")
        props[0].setUser()
        props[0].history.push("/logout");
    }

    const handleDelete = (id) => {
        API.delete( "userPlants", id)
          .then(() => API.getAll("userPlants")
          .then(setUserPlants));
      };
    //Get the user plants from the database along with the expanded plant data//
    const getUserPlants = () => {
        const route = `userPlants?userId=${props[0].activeUser.id}&_expand=plant`
        API.getAll(route)
        .then((response) => {
            setUserPlants(response) 
        })      
    }

    useEffect (() => {
        getUserPlants()
    }, [props[0].activeUser.id])



    const daysRemainingToMaturity = (plant) => {
        let today = new Date()
        let daysRemaining = new Date()
    }
    //Sort the Plant array by comparing planting date, days to maturity value, and current date//
    const sortUserPlantArrayByMaturity = () => {
        
    }
// console.log(Date.now())

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
            <div className="user__Container__Garden">
            <div className="headline__container">
                    <h3 className="category__Headline">My Garden</h3>
                    <img className="plant__Headline__Image" src={require(`../images/garden.png`)} alt="Seedling" />
                        </div>
                        <div className="user__Container__AddPlant">
                            <div className="plant__Category__Scroll" id="categoryList">
                            {  
                                userPlants.map(plant => <GardenPlantCard 
                                                                        key={plant.id} 
                                                                        name={plant.plant.common_name}  
                                                                        back={true} 
                                                                        handleDelete={handleDelete}
                                                                        plant={plant}
                                                                        />)
                                }
                            </div>                
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

export default WithAuthentication(MyGarden)


                