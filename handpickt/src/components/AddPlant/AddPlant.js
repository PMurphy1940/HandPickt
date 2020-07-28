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

    const handleLogout = () => {
        sessionStorage.removeItem("credentials")
        props[0].setUser()
        props[0].history.push("/logout");
    }
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
    //Use the category array to display the list of available categories//


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
            <div className="user__Container__AddPlant">
                  <div className="plant__Category__Scroll">
                      {categories.map(category => <PlantCategoryCard key={category} category={category}/>)}
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


                