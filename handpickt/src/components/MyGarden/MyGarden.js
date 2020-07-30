import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import WithAuthentication from "../Auth/WithAuthentication"
import GardenPlantCard from "./GardenPlantCard"
import PlantDetails from    "./PlantDetails"
import BottomNavbar from "../Footer/FooterNav"
import API from "../Server/HandPicktAPI"
import { Navbar } from 'react-bootstrap';
import Image from 'react-bootstrap/Image'
import "./MyGarden.css"


const MyGarden = (props) => {
    const [userPlants, setUserPlants] = useState([])
    const [inspectViewOn, setInspectViewOn] = useState(false)
    const [plantToInspect, setPlantToInspect] = useState(0)
    const [saveScrollPosition, setSaveScrollPosition] = useState(0)


    useEffect(() => {
        if (!inspectViewOn) {
        let storedScroll = parseInt(saveScrollPosition)
        console.log(storedScroll)
        window.scrollTo(0, storedScroll) }

        else {
            window.scrollTo(0,0)
        }
        }, [inspectViewOn])

        const holdPosition = () => {
            setSaveScrollPosition(window.pageYOffset)
        }
    

    let msInADay = (1000*60*60*24)

    const handleLogout = () => {
        sessionStorage.removeItem("credentials")
        props[0].setUser()
        props[0].history.push("/logout");
    }

    const details = (id) => {
        API.getOne(id, "userPlants", "&_expand=plant")
        .then((singlePlant) => {
        setPlantToInspect(singlePlant)
        holdPosition()
        setInspectViewOn(true)
    
        })
    }

    const discard = () => {
        setInspectViewOn(false)   
    }
    const handleDelete = (id) => {
        API.delete( "userPlants", id)
          .then(() => API.getAll("userPlants")
          .then(setUserPlants));
      };

    const addDaysRemainingToObject = (plantData) => {
        let animatorArray = []
        let enhancedPlants = []

        plantData.forEach(plant => {

            let remainToHarvest = daysRemainingToMaturity(plant)

            //Calculate percent complete for the progress bar//
            let percentCompleteToHarvest = (1 - remainToHarvest/plant.plant.days_to_maturity)*100
                //Modifiy the plant objects for easier handling//
                let modifiedPlantObject = 
                {
                 ...plant,
                    daysRemaining: remainToHarvest,
                    percentComplete: percentCompleteToHarvest              
                }
                enhancedPlants.push(modifiedPlantObject)
            })
            //Sort the plant array to display the closest to maturity first//
            let sortedplantsdata = enhancedPlants.sort((a, b) => {                
                let catA = a.daysRemaining
                let catB = b.daysRemaining
                if (catA < catB) {
                    return -1;
                }
                if (catA > catB) {
                    return 1;
                }
                return 0           
            })
        setUserPlants(sortedplantsdata)
    }
    // console.log(userPlants)
    //Get the user plants from the database along with the expanded plant data//
    const getUserPlants = () => {
        const route = `userPlants?userId=${props[0].activeUser.id}&_expand=plant`
        API.getAll(route)
        .then((plantData) => {
            // setUserPlants(plantData)
            addDaysRemainingToObject(plantData)
            
        })      
    }

    useEffect (() => {
        getUserPlants()
    }, [props[0].activeUser.id])


    //Calculate the days remaining until maturity(harvest)//
    const daysRemainingToMaturity = (plant) => {
        let today = new Date()
        let daysSoFar = today.getTime() - Date.parse(plant.plantingDate)   
        daysSoFar = (daysSoFar/msInADay).toFixed(0)
        let daysRemaining = plant.plant.days_to_maturity - daysSoFar

        //Trigger Maturity if days remaining reaches 0//
        if (daysRemaining < 0) {
            return 0
        }
        else {
        return daysRemaining
        }
    }

    const gardenPageView = () => {

       if (!inspectViewOn) {
        return (
            <>
                <div className="headline__container">
                    <h3 className="category__Headline">My Garden</h3>
                    <img className="plant__Headline__Image" src={require(`../images/garden.png`)} alt="vegetable harvest" />
                </div>
                <div className="user__Container__AddPlant">
                    <div className="garden__Plants__Scroll" id="categoryList">
                    {  
                        userPlants.map(plant => <GardenPlantCard 
                                                                key={plant.id} 
                                                                name={plant.plant.common_name}  
                                                                back={true} 
                                                                handleDelete={handleDelete}
                                                                plant={plant}
                                                                details={details}
                                                                />)
                        }
                    </div>                
                </div> 
            </> 
            ) 
          }
        else if (inspectViewOn) {
            return (
                <>
                    <div className="user__Container__AddPlant">
                        <div className="garden__Plants__Scroll" id="categoryList">
                          
                             <PlantDetails 
                                key={plantToInspect.id} 
                                    
                                back={true} 
                                handleDelete={handleDelete}
                                plantToInspect={plantToInspect}
                                discard={discard}
                                />
                        
                        </div>                
                    </div> 
                </>
                )    
            }
    }


    return(
        <div className="dashboard__Container">
            { !inspectViewOn && <div className="dashboard__Header">
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
            </div>}
            <div className="user__Container__Garden">

                {gardenPageView()}

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


                