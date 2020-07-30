import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import WithAuthentication from "../Auth/WithAuthentication"
import GardenPlantCard from "./GardenPlantCard"
import PlantDetails from    "./PlantDetails"
import BottomNavbar from "../Footer/FooterNav"
import API from "../Server/HandPicktAPI"
import { Navbar, Button } from 'react-bootstrap';
import Image from 'react-bootstrap/Image'
import "./MyGarden.css"


const MyGarden = (props) => {
    const [userPlants, setUserPlants] = useState([])
    const [inspectViewOn, setInspectViewOn] = useState(false)
    const [plantToInspect, setPlantToInspect] = useState()
    const [saveScrollPosition, setSaveScrollPosition] = useState(0)
    const [editPlantedFieldActive, setEditPlantedFieldActive] = useState(false)
    const [editCommentsFieldActive, setEditCommentsFieldActive] = useState(false)
    const [enableSaveButton, setEnableSaveButton] = useState(false)
    const [isLoading, setIsLoading] = useState(true)


    useEffect(() => {
        if (!inspectViewOn) {
        let storedScroll = parseInt(saveScrollPosition)
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

    const discard = () => {
        setEnableSaveButton(false)
        setInspectViewOn(false)   
    }

    const toggleEditPlantedFieldActive = () => {
        setEditPlantedFieldActive(!editPlantedFieldActive)
    }
    const toggleEditCommentsFieldActive = () => {
        setEditCommentsFieldActive(!editCommentsFieldActive)
    }
    
    const details = (id) => {
        API.getOne(id, "userPlants", "&_expand=plant")
        .then((singlePlant) => {
            addDaysRemainingToSinglePlantObject(singlePlant)   
        })
    }

    const addDaysRemainingToSinglePlantObject = (singlePlant) => {
        
            {
            let remainToHarvest = daysRemainingToMaturity(singlePlant[0])
            //Calculate percent complete for the progress bar//
            let percentCompleteToHarvest = (1 - remainToHarvest/singlePlant[0].plant.days_to_maturity)*100
                //Modifiy the plant objects for easier handling//
                setPlantToInspect({
                 ...singlePlant[0],
                    daysRemaining: remainToHarvest,
                    percentComplete: percentCompleteToHarvest              
                }) 
              setIsLoading(false)
            }
            
            //Save the current scroll position and open the Details view//               
            holdPosition()
            setInspectViewOn(true)           
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

    const handlePlantedField = (event) => {
        // let target = event.target
        // let {name, value} = target
        // console.log(name, value)
        const stateToChange ={...plantToInspect};
        stateToChange[event.target.id] = event.target.value;
        
        setPlantToInspect(stateToChange)
        setEnableSaveButton(true)
    }

    const makePlantObject = () => {
 
        let plantObj = {
            userId: plantToInspect.userId,
            plantId:  plantToInspect.plantId,
            plantingDate: plantToInspect.plantingDate,
            userComments: plantToInspect.userComments,
            earlyMaturity: plantToInspect.earlyMaturity,
            acrhiveDate: plantToInspect.acrhiveDate
        }
        return plantObj
    }

    const handleSaveEdit = (id) => {
        setEnableSaveButton(false)
        let editPlant = makePlantObject()
        API.updateOne(editPlant, id, "userPlants")
        .then(() => getUserPlants() )
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
                                isLoading={isLoading} 
                                handlePlantedField={handlePlantedField}    
                                back={true} 
                                handleDelete={handleDelete}
                                plantToInspect={plantToInspect}
                                discard={discard}
                                editPlantedFieldActive={editPlantedFieldActive}
                                editCommentsFieldActive={editCommentsFieldActive}
                                toggleEditPlantedFieldActive={toggleEditPlantedFieldActive}
                                toggleEditCommentsFieldActive={toggleEditCommentsFieldActive}
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
            <Button hidden={!enableSaveButton} variant="danger" className="save__Edit__Button" onClick={ () => handleSaveEdit(plantToInspect.id)}>Save Changes</Button>      
            <Navbar fixed="bottom" className="bottom__Nav">
                <div >
                    <BottomNavbar {...props}/>
                </div>
            </Navbar>
        </div>
    )
}

export default WithAuthentication(MyGarden)


                