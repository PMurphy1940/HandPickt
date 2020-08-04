import React, { useState, useEffect } from 'react'
import WithAuthentication from "../Auth/WithAuthentication"
import BottomNavbar from "../Footer/FooterNav"
import API from "../Server/HandPicktAPI"
import SearchResultPlantCard from "./SearchDisplayPlants"
import { Navbar, Button } from 'react-bootstrap';
import Image from 'react-bootstrap/Image'
import "./Search.css"
import _default from 'react-bootstrap/esm/Toast';
const Search = (props) => {
    const [searchQuery, setSearchQuery] = useState("")
    const [resultDB, setResultDB] = useState()
    const [resultUserPlant, setResultUserPlant] = useState()
    const [resultNote, setResultNote] = useState()
    const [resultArchive, setResultArchive] = useState()
    const [searchDB, setSearchDB] = useState(true)
    const [searchUserPlants, setSearchUserPlants] = useState(false)
    const [searchNotes, setSearchNotes] = useState(false)
    const [searchArchives, setSearchArchives] = useState(false)

    const handleLogout = () => {
        sessionStorage.removeItem("credentials")
        props[0].setUser()
        props[0].history.push("/logout");
    }

    //These handle the search criteria buttons on the search field///
    const toggleSearchUserPlants = () => {        
        setSearchUserPlants(!searchUserPlants)  
    }
    const toggleSearchArchives = () => {       
        setSearchArchives(!searchArchives)      
    }
    const toggleSearchNotes = () => {      
        setSearchNotes(!searchNotes)
    }
    const toggleSearchAll = () => {
        setSearchDB(true)
        setSearchUserPlants(false)
        setSearchNotes(false)
        setSearchArchives(false)
    }
    
    const checkForAll =  () => {
        if ( searchUserPlants === false && searchNotes === false && searchArchives === false) {
            setSearchDB(true);
        }
        else {setSearchDB(false)};
    }
    useEffect(() => {
        checkForAll()
    })
   
    const handleSearchField = (event) => {
        let stateToChange = {...searchQuery}
        stateToChange = event.target.value
        setSearchQuery(stateToChange)
        // if (searchQuery.length > 2) {
        //     searchDatabase()

    }
    const submitSearch = () => {
        searchDatabase()
    }

    

    

    // console.log(userPlantSearch)

    const buildUserPlantSearch = () => {
        let userPlantSearch = []
        let inGarden = props[0].userPlants;

        inGarden.forEach(plant => {
            let id = plant.plant.id
            API.searchPlantsDB("plants", id, searchQuery)
                    .then((searchResult) => {
                        if (searchResult[0] !== undefined) {                            
                            userPlantSearch.push(searchResult[0])               
                            setResultUserPlant(userPlantSearch)
                    }}
                    )
            })

        }

   

    const searchDatabase = () => {
        if ( searchDB === true ){
            API.search("plants", searchQuery)
            .then((searchResult) => {
                setResultDB(searchResult)
            })
        }
         
        if ( searchNotes === true) {
            API.search("notes", searchQuery)
            .then((searchResult) => {
                setResultNote(searchResult)
            })
        }
        if ( searchUserPlants === true) {
                buildUserPlantSearch()
            
        }

    }

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
            <div className="headline__container">
                    <h3 className="category__Headline">Search My HandPickT</h3>
                    <img className="plant__Headline__Image" src={require(`../images/microscope.png`)} alt="microscope" />
            </div>
            <div className="searchArea">
            <div className="search__Parameters">
                <button className={ (!searchDB) ? "searchcheckbox" : "searchcheckboxAfter"} onClick={() => toggleSearchAll()}>
                    Database
                </button>
                <button className={ (!searchUserPlants) ? "searchcheckbox" : "searchcheckboxAfter"} onClick={() => toggleSearchUserPlants()}>
                    My Plants
                </button>
                <button className={ (!searchNotes) ? "searchcheckbox" : "searchcheckboxAfter"} onClick={() => toggleSearchNotes()}>
                    My Notes
                </button>
                <button className={ (!searchArchives) ? "searchcheckbox" : "searchcheckboxAfter"} onClick={() => toggleSearchArchives()}>
                    My Archives
                </button>
            </div>
            <div className="search__Grouping"></div>
            <fieldset>
                <input
                    className="search__Grouping__Element"
                    type="search"
                    name="search"
                    id="search"
                    value={searchQuery}
                    onChange={handleSearchField}
                    />
               <label htmlFor="search"></label>
               <Button variant="info" className="search__Grouping__Element" onClick={submitSearch}>Search</Button>
            </fieldset>
            </div>
            <div className="user__Container__Garden">
                    { (resultUserPlant !== undefined) &&                   
                    <>
                    <span>Found in My Garden</span>
                  {  resultUserPlant.map( plant =>   <SearchResultPlantCard
                                                            key={plant.id}                                       
                                                            plant={plant}
                                                        />
                  )}</>
                  }      
            </div>
        
            <Navbar fixed="bottom" className="bottom__Nav">
                <div >
                    <BottomNavbar {...props}/>
                </div>
            </Navbar>
        </div>
    )
}

export default WithAuthentication(Search)


                