import React, { useState, useEffect } from 'react'
import WithAuthentication from "../Auth/WithAuthentication"
import ArchivePlantCard from "./ArchivePlantCard"
import ArchivePlantDetails from "./ArchivePlantDetails"
import BottomNavbar from "../Footer/FooterNav"
import API from "../Server/HandPicktAPI"
import { Navbar, Button } from 'react-bootstrap';
import Image from 'react-bootstrap/Image'
import "./Archive.css"


const Archive = (props) => {
    const [userPlants, setUserPlants] = useState([])
    const [inspectViewOn, setInspectViewOn] = useState(false)
    const [plantToInspect, setPlantToInspect] = useState()
    const [saveScrollPosition, setSaveScrollPosition] = useState(0)

    const [editCommentsFieldActive, setEditCommentsFieldActive] = useState(false)
    const [enableSaveButton, setEnableSaveButton] = useState(false)

        
    useEffect(() => {
        if (!inspectViewOn) {
        let storedScroll = parseInt(saveScrollPosition)
        window.scrollTo(0, storedScroll) }

        else {
            window.scrollTo(0,0)
        }
        }, [inspectViewOn, saveScrollPosition])

        const holdPosition = () => {
            setSaveScrollPosition(window.pageYOffset)
        }


    const handleLogout = () => {
        sessionStorage.removeItem("credentials")
        props[0].setUser()
        props[0].setNoteAlert(false)
        props[0].history.push("/logout");
    } 

    const handlePlantedField = (event) => {
 
        const stateToChange ={...plantToInspect};
        stateToChange[event.target.id] = event.target.value;
        
        setPlantToInspect(stateToChange)
        setEnableSaveButton(true)
    }

//*** This section is for handling the plant Details view and it various functions ***//

    //Button functionality//

    const discard = () => {
        setEnableSaveButton(false)
        setInspectViewOn(false)   
    }
    
    const toggleEditCommentsFieldActive = () => {
        setEditCommentsFieldActive(!editCommentsFieldActive)
    }
    
    //GET the details plant freshly from the API//

    const details = (id) => {
        API.getOne(id, "userPlants", "&_expand=plant")
        .then((singlePlant) => {
            singlePlant = singlePlant[0]
            holdPosition()
            viewArchivedPlant(singlePlant)   
        })
    }

    //Modify the details plant to ADD 'percent complete' and 'days remaining' to the plant object//
    const viewArchivedPlant = (singlePlant) => {
        
    
            setPlantToInspect(singlePlant)
            //Save the current scroll position and open the Details view//               
           
            setInspectViewOn(true)           
    }

    const makePlantObject = () => {


        let plantObj = {
            userId: plantToInspect.userId,
            plantId:  plantToInspect.plantId,
            plantingDate: plantToInspect.plantingDate,
            userComments: plantToInspect.userComments,
            earlyMaturity: plantToInspect.earlyHarvest,
            archiveDate: plantToInspect.archiveDate
        }
        return plantObj
    }
    //Send the Edit to the API//
    const handleSaveEdit = (id) => {
        setEnableSaveButton(false)
        let editPlant = makePlantObject()
        API.updateOne(editPlant, id, "userPlants")
        .then(() => getUserPlants() )
    }

///***  End of Details section  ***///

    

    const handleDelete = (plant) => {

        setPlantToInspect(plant)
        API.delete( "userPlants", plantToInspect.id)
        .then(() => API.getAll("userPlants")
        .then(setUserPlants));

      };

    const onlyArchivePlantData = (plantData) => {

        //Remove any active plants from the plant array
        let onlyArchivePlantData = plantData.filter(plant => {
            if ( plant.archiveDate !== "" ) {
                return plant
            }
        })
        setUserPlants(onlyArchivePlantData)     
    }

    //Get the user plants from state along with the expanded plant data//
    const getUserPlants = () => {    
            onlyArchivePlantData(props[0].userPlants)                    
    }

    useEffect (() => {
        onlyArchivePlantData(props[0].userPlants)  
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props[0].userPlants])

    

    const gardenPageView = () => {

       if (!inspectViewOn) {
        return (
            <>
                <div className="headline__container">
                    <h3 className="category__Headline">Plant Archves</h3>
                    <img className="plant__Headline__Image" src={require(`../images/Archive.png`)} alt="vegetable harvest" />
                </div>
                <div className="user__Container__AddPlant">
                    <div className="garden__Plants__Scroll" id="categoryList">
                    {  
                        userPlants.map(plant => <ArchivePlantCard 
                                                                key={plant.id} 
                                                                name={plant.plant.common_name}  
                                                                back={true} 
                                                                handleDelete={handleDelete}
                                                                plant={plant}
                                                                details={details}
                                                                handlePlantedField={handlePlantedField}
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
                             <ArchivePlantDetails 
                                key={plantToInspect.id}
                                handlePlantedField={handlePlantedField} 
                                back={true} 
                                handleDelete={handleDelete}
                                plantToInspect={plantToInspect}
                                discard={discard}
                                editCommentsFieldActive={editCommentsFieldActive}
                                toggleEditCommentsFieldActive={toggleEditCommentsFieldActive}
                                />                        
                        </div>                
                    </div> 
                </>
            )}
    }


    return(
        <div className="dashboard__Container">
            { !inspectViewOn && <div className="dashboard__Header">
                <picture >               
                    <img className="HPLogo__InApp" src={require(`../images/HandPickt_3.png`)} alt="HandPickt Logo" />
                </picture>
                <div className="logout__Grouping">
                    <button type="button" className="logout__Button__With__Image" onClick={handleLogout}>
                        { (props[0].activeUser.image !== "") ?
                            <Image src={require(`../images/${props[0].activeUser.image}`)} roundedCircle className="user__Image__Garden" alt="user"/>
                            :
                            <Image src={require("../images/defaultuser.png")} roundedCircle className="user__Image__Dashboard" />
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

export default WithAuthentication(Archive)


                