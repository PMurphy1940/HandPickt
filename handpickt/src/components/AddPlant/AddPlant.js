import React, { useState, useEffect } from 'react'
import WithAuthentication from "../Auth/WithAuthentication"
import PlantCategoryCard from "./PlantCategoryCard"
import SavePlant from "./SavePlant"
import API from "../Server/HandPicktAPI"
import BottomNavbar from "../Footer/FooterNav"
import { Navbar } from 'react-bootstrap';
import Image from 'react-bootstrap/Image'
import helper from "../Helpers/Helper"
import ModalEntries from "../Modal/Modal"
import "./AddPlant.css"
const AddPlant = (props) => {
    const [plantList, setPlantList] = useState([])
    const [categories, setCategories] = useState([])
    const [showCategories, setShowCategories] = useState(true)
    const [selectedPlantArray, setSelectedPlantArray] = useState([])
    const [selectMessage, setSelectMessage] = useState('')
    const [savePlantState, setSavePlantState] = useState(false)
    const [savePlant, setSavePlant] = useState("")
    const [plantForm, setPlantForm] = useState({ userId: 0, plantId: 0, plantingDate: 0, userComments: "", earlyMaturity: null, acrhiveDate: null})
    const [openModal, setOpenModal] = useState(false)
    const [saveScrollPosition, setSaveScrollPosition] = useState(0)

    //Holds scroll position in state, so when the user returns to the category view, it is where they left off//
    useEffect(() => {
        //returns the user to the saved scroll position in the Categories display//
        const scollDiv = document.querySelector(".plant__Category__Scroll")
        if (showCategories) {
        let storedScroll = parseInt(saveScrollPosition)
        
        scollDiv.scrollTo(storedScroll, 0) }
        //Scroll position of the plants subcategory set to 0//
        else {
            scollDiv.scrollTo(0,0)
        }
        }, [showCategories, saveScrollPosition])
        //Capture the Categories scroll position when the user selects a category//
        const holdPosition = () => {
            const scollDiv = document.querySelector(".plant__Category__Scroll")
            const currentScroll = scollDiv.scrollLeft
            setSaveScrollPosition(currentScroll)
        }
    
    const goBack = () => {
        setSavePlantState(false)
        setShowCategories(true)      
    }

    const toggle = () => {
        setOpenModal(!openModal)
    }

    const selectPlant = (selectedPlant) => {
        setSavePlant(selectedPlant)
        setSavePlantState(true)
        }

    const handleLogout = () => {
        sessionStorage.removeItem("credentials")
        props[0].setUser()
        props[0].history.push("/logout");
    }
    //Get All the plant data from the database to build the Add list//
    const generatePlantList = () => {
        API.getAll("plants")
        .then((plantsdata) => {
            //Sort the returned data so it is ordered by category for easy display//
           let sortedplantsdata = plantsdata.sort((a, b) => {                
                let catA = helper.firstLetterCase(a.category)
                let catB = helper.firstLetterCase(b.category)
                if (catA < catB) {
                    return -1;
                }
                if (catA > catB) {
                    return 1;
                }
                return 0           
            })
            setPlantList(sortedplantsdata)
        })   
    }

    useEffect(() => {
        generatePlantList()
    }, [])

    useEffect(() => {
        categoryArrayMaker()
    }, [plantList])

    //Produce an array of the available categories//
    const categoryArrayMaker = () => {
        API.getAll("cats")
        .then((catsData) => {
            //Sort the returned categories into alphabetical order//
            let sortedCategorydata = catsData.sort((a, b) => {                
                let catA = helper.firstLetterCase(a.category_name)
                let catB = helper.firstLetterCase(b.category_name)
                if (catA < catB) {
                    return -1;
                }
                if (catA > catB) {
                    return 1;
                }
                return 0           
            })
            setCategories(sortedCategorydata)
        })        
    }
    //Ensure correct grammar on 'Select a plant' message//
    const makeSelectMessage = (category) => {
        let singularPlant = category
        //first checks for vowels//
        if (helper.firstLetterCase(category.charAt(0)) === "A" || helper.firstLetterCase(category.charAt(0)) === "E" || helper.firstLetterCase(category.charAt(0)) === "I" || helper.firstLetterCase(category.charAt(0)) === "O" || helper.firstLetterCase(category.charAt(0)) === "U") {
            
            //then checks for plurality//
            if(category.endsWith("es")) {
                let index = category.lastIndexOf("es")
                singularPlant = category.slice(0, index)
            }
            else if (category.endsWith("s")) {
                let index = category.lastIndexOf("s")
                singularPlant = category.slice(0, index)
            }           
            return `Select an ${singularPlant} to plant`
        }
        else {if(category.endsWith("es")) {
                    let index = category.lastIndexOf("es")
                    singularPlant = category.slice(0, index)
        }
        else if (category.endsWith("s")) {
                    let index = category.lastIndexOf("s")
                    singularPlant = category.slice(0, index)
        }
            return `Select a ${singularPlant} to plant`
     
    }
    }
    //Make the array of available plants within a category the the user has selected//
    const selectCategory = (selectedCategory) => {
        let plantArray = []
        plantList.map(plant => {
            if (helper.firstLetterCase(plant.category) === selectedCategory)  {
                plantArray.push(plant)
            }
            return null
        })
        setSelectedPlantArray(plantArray);
        setSelectMessage(makeSelectMessage(selectedCategory))
        holdPosition()
        setShowCategories(false)
    }

    //Handle the user input from the entry fields//
    const handleChange = (e) => {
        const change = { ...plantForm};
        change[e.target.id] = e.target.value;
        setPlantForm(change);
    }

    const makeComment = () => {
            setOpenModal(true)
    }

    const makePlantObject = () => {
        let user = JSON.parse(props[0].activeUser.id)
        let date = new Date()
        let plantObj = {
            userId: user,
            plantId:  savePlant.id,
            plantingDate: date,
            userComments: plantForm.userComments,
            earlyMaturity: "",
            archiveDate: ""
        }
        return plantObj
    }
    const postToGarden = () => {
        let postPlant = makePlantObject();
        
        API.addNew( postPlant, "userPlants" )
       .then(() => props[0].history.push("/addanother"))

    }
        //Provide the views on this page, depending on the user choices - Category/Plant/Save//
    const addPlantView = () => {
            if (savePlantState === false) {
                return (
                    <>
                        <div className="headline__container">
                            { showCategories ? 
                                <h3 className="category__Headline">Select a Plant Category</h3>
                                :
                                <h3 className="category__Headline">{selectMessage}</h3>
                            }
                            <img className="plant__Headline__Image" src={require(`../images/seedling.png`)} alt="Seedling" />
                        </div>
                        <div className="user__Container__AddPlant">
                            <div className="plant__Category__Scroll" id="categoryList">
                            { showCategories ?
                                categories.map(category => <PlantCategoryCard 
                                                                        key={category.id} 
                                                                        name={category.category_name} 
                                                                        selectType={selectCategory}
                                                                        showCategories={showCategories}
                                                                        category={category} 
                                                                        back={false} />) 
                                : 
                                selectedPlantArray.map(plant => <PlantCategoryCard 
                                                                        key={plant.id} 
                                                                        name={plant.common_name} 
                                                                        selectType={selectPlant} 
                                                                        back={true} goBack={goBack}
                                                                        plant={plant}
                                                                        />)
                                }
                            </div>                
                        </div>
                    </>
                    )
                }
            else if (savePlantState === true) {
                return (
                    <>
                        <h3 className="category__Headline">Plant in Your Garden</h3>
                        <SavePlant 
                            key={savePlant.id} 
                            plant={savePlant}
                            goBack={goBack}
                            handleChange={handleChange}
                            makeComment={makeComment}
                            postToGarden={postToGarden}
                            />
                    </>
                )
            }
    }

    return(
        <div className="addplant__Container">
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

            {addPlantView()}

            <ModalEntries 
                    toggle={toggle} 
                    openModal={openModal} 
                    handleChange={handleChange}
                    plantForm={plantForm}
                    {...props}
                    />            
            <Navbar fixed="bottom" className="bottom__Nav">
                <div >
                    <BottomNavbar {...props}/>
                </div>
            </Navbar>
        </div>
    )
}

export default WithAuthentication(AddPlant)


                