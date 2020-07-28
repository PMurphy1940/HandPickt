import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import WithAuthentication from "../Auth/WithAuthentication"
import PlantCategoryCard from "./PlantCategoryCard"
import API from "../Server/HandPicktAPI"
import BottomNavbar from "../Footer/FooterNav"
import { Navbar } from 'react-bootstrap';
import Image from 'react-bootstrap/Image'
import helper from "../Helpers/Helper"
import "./AddPlant.css"
const AddPlant = (props) => {
    const [plantList, setPlantList] = useState([])
    const [categories, setCategories] = useState([])
    const [showCategories, setShowCategories] = useState(true)
    const [selectedPlantArray, setSelectedPlantArray] = useState([])
   
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
        setCategories(categoryArrayMaker)
    }, [plantList])

    // useEffect(() => {
    //     setShowCategories(true)
    // }, [selectedPlantArray])


    //Produce an array of the available categories//
    const categoryArrayMaker = () => {
            const categoryArrayWithDuplicates = plantList.map(plant => {
                return (plant.category)
            })
            //Remove duplicate categories from the array//
            let categoryArray = []
            categoryArrayWithDuplicates.forEach((category) => {
                let capsCat = helper.firstLetterCase(category)
                if (!categoryArray.includes(capsCat)) {
                    categoryArray.push(capsCat)
                }
            })
            return categoryArray
          
    }
    //Make the array of available plants within a category the the user has selected//
    const selectCategory = (selectedCategory) => {
        console.log(selectedCategory)
        let plantArray = []
        plantList.map(plant => {
            if (helper.firstLetterCase(plant.category) == selectedCategory)  {
                plantArray.push(plant)
            }
        })
        setSelectedPlantArray(plantArray);
        setShowCategories(false)


    }
console.log(selectedPlantArray)
    const selectPlant = (selectedPlant) => {
        console.log(selectedPlant)
        
    }
console.log("Categories", showCategories)
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
            { showCategories ? 
                <h3 className="category__Headline">Select A Category</h3>
                :
                <h3 className="category__Headline">Select A Plant</h3>
            }
            <div className="user__Container__AddPlant">
                  <div className="plant__Category__Scroll">
                  { showCategories ?
                      categories.map(category => <PlantCategoryCard key={category} name={category} selectType={selectCategory}/>) 
                      : 
                      selectedPlantArray.map(plant => <PlantCategoryCard key={plant.id} name={plant.common_name} selectType={selectPlant}/>)
                    }
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

export default WithAuthentication(AddPlant)


                