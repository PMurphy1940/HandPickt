import React, { useState, useEffect } from 'react'
import WithAuthentication from "../Auth/WithAuthentication"
import BottomNavbar from "../Footer/FooterNav"
import API from "../Server/HandPicktAPI"
import SearchResultPlantCard from "./SearchDisplayPlants"
import SearchResultNoteCard from "./SearchDisplayNotes"
import SearchResultComment from "./SearchDisplayComment"
import SearchResultDatabase from "./SearchDisplayDatabase"
import { Navbar, Button } from 'react-bootstrap';
import Image from 'react-bootstrap/Image'
import "./Search.css"

const Search = (props) => {
    const [searchQuery, setSearchQuery] = useState("")
    const [resultDB, setResultDB] = useState()
    const [resultUserPlant, setResultUserPlant] = useState()
    const [resultUserComment, setResultUserComment] = useState()
    const [resultNote, setResultNote] = useState()
    const [resultArchive, setResultArchive] = useState()
    const [holdSearchQuery, setHoldSearchQuery] = useState("")
    const [searchDB, setSearchDB] = useState(true)
    const [searchUserPlants, setSearchUserPlants] = useState(false)
    const [searchNotes, setSearchNotes] = useState(false)
    const [searchArchives, setSearchArchives] = useState(false)
    const [plantIsLoading, setPlantIsLoading] = useState(true)
    const [userPlantArray, setUserPlantArray] = useState([])
    const [commentIsLoading, setCommentIsLoading] = useState(true)
    const [userCommentArray, setUserCommentArray] = useState([])

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
    //Check on each button change to see if all user account buttons are off, and if so, set the search to 'Database'//
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
    }
    //Hold the search query in state so the found 'text' doesn't change if the user continues to modify the search field
    //Found 'text' only changes on submit of a new query//
    const submitSearch = () => {
        setPlantIsLoading(true)
        setHoldSearchQuery(searchQuery)
        searchDatabase()
    }

//Complex Search//

    //Set result state only after all the chained API calls have completed//   
    useEffect(() => {
        setResultUserPlant(userPlantArray)
    }, [plantIsLoading, userPlantArray])

    useEffect(() => {
        setResultUserComment(userCommentArray)
    }, [commentIsLoading, userCommentArray])

//This section has the route to search the user comments for the keyword, and then search the users plants and combine the data//
    const buildUserPlantSearch = () => {
        let flatPlantArray = []
        let userPlantSearch = []
        let userCommmentSearch = []
        let inGarden = props[0].userPlants;

        //First search the flat User Plants database for the keyword//
        let userId=props[0].activeUser.id
        userId = `userId=` + userId
        API.searchPlantsDB("userPlants", userId, searchQuery)
        .then((searchResult) => {

            //If there is a return, build an embed version to contian all data needed//
            if (searchResult !== undefined) {                                            
            searchResult.forEach(result => {
                API.getOne(result.id, "userPlants", "&_expand=plant")
                .then((secondResult) => {
                    userCommmentSearch.push(secondResult[0])
                    setUserCommentArray(userCommmentSearch)
                    checkSearchCommentLoadingState(userCommmentSearch.length, searchResult.length)
                })
                
                
            })}
        })
        //Then search all the plants in the database that are tied to the user//
        inGarden.forEach(plant => {
            let plantId = plant.plant.id
            plantId = `id=` + plantId
            
            API.searchPlantsDB("plants", plantId, searchQuery)
                    .then((searchResult) => {                       
                        if (searchResult[0] !== undefined) { 
                            flatPlantArray.push(searchResult[0])                         
                            //now take those results and pass them back to the API in order to properly attach the user card. //                                         
                            searchResult.forEach(result => {
                                let combinedId = result.id
                                //combine the plant id and the user id to return only the selected plants tied to just this user//                                
                                combinedId = `plantId=` + combinedId + `&?userId=` + userId
                                API.searchUserPlants("userPlants", combinedId, "&_expand=plant")
                                .then((thirdResult) => { 
                                    userPlantSearch.push(thirdResult[0])
                                    setUserPlantArray(userPlantSearch)
                                    checkSearchPlantLoadingState(userPlantSearch.length, flatPlantArray.length)
                                    })
                                })
                            }}
                        )
                   })
           }
    //Compares the length of the initial flat arrays to the length of the embedded arrays to ensure they are the same, and therefore the embed process is complete and the data is ready for display//      
    const checkSearchPlantLoadingState = (flatLength, embedLength) => {
        if (flatLength === embedLength && flatLength !== 0) {
            setPlantIsLoading(false)
        }
    }

    const checkSearchCommentLoadingState = (flatLength, embedLength) => {
        if (flatLength === embedLength && flatLength !== 0) {
            setCommentIsLoading(false)
        }
    }
//End of complex search//

    const searchDatabase = () => {
        //Clear the results on a new search//
        setResultDB(undefined)
        setResultUserPlant(undefined)
        setResultNote(undefined)
        setResultArchive(undefined)
        setResultUserComment(undefined)

        //The first two are the simple flat searches.//
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
        //This calls the Complex Search above that handles a search of the comments and user plants in an non-embedded format//
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
                        { (props[0].activeUser.image !== "") ?
                            <Image src={require(`../images/${props[0].activeUser.image}`)} roundedCircle className="user__Image__Garden" />
                            :
                            <Image src={require("../images/defaultuser.png")} roundedCircle className="user__Image__Dashboard" />
                        }
                    <p className="logout__Text">Log Out</p></button>
                </div>
                
            </div>
            <div className="headline__container">
                    <h3 className="category__Headline">Search My HandPickT</h3>
                    <img className="plant__Headline__Image" src={require(`../images/microscope.png`)} alt="microscope" />
            </div>
            <div className="searchArea">
            <div className="searchDB">
                <button className={ (!searchDB) ? "searchcheckbox" : "searchcheckboxAfter"} onClick={() => toggleSearchAll()}>
                    Database
                </button>
                <h3>search the database</h3>
            </div>
            <div className="search__Parameters">
                
                <button className={ (!searchUserPlants) ? "searchcheckbox" : "searchcheckboxAfter"} onClick={() => toggleSearchUserPlants()}>
                    My Plants
                </button>
                <button className={ (!searchNotes) ? "searchcheckbox" : "searchcheckboxAfter"} onClick={() => toggleSearchNotes()}>
                    My Notes
                </button>
                <button className={ (!searchArchives) ? "searchcheckbox" : "searchcheckboxAfter"} onClick={() => toggleSearchArchives()}>
                    My Archives
                </button>
                <h3>or search</h3>
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
            <div className="user__Container__Search__Result">
                    { (resultUserPlant !== undefined) &&                   
                    <>
                    { (holdSearchQuery !== "") && 
                    <h4 className="result__Separator"><strong>"{holdSearchQuery}"</strong> Found in your Plants</h4>}
                  {  resultUserPlant.map( plant =>   <SearchResultPlantCard
                                                            {...props}
                                                            key={plant.id}                                       
                                                            plant={plant}
                                                        />
                  )}</>
                  }      
                    { (resultUserComment !== undefined) &&                   
                    <>
                    { (holdSearchQuery !== "") &&
                    <h4 className="result__Separator"><strong>"{holdSearchQuery}"</strong> Found in your Comments</h4>}
                    </>
                    }
                    {(resultUserComment !== undefined) &&
                    <>
                  {  resultUserComment.map( plant =>   <SearchResultComment
                                                                key={plant.id} 
                                                                name={plant.plant.common_name}  
                                                                back={true} 
                                                                {...props}
                                                                plant={plant}
                                                                                                                           
                                                                />
                                                        )
                                            }
                  </>
                 
                  }      
                    { (resultDB !== undefined) &&                   
                    <>
                    <h4 className="result__Separator"><strong>"{holdSearchQuery}"</strong> Found in the Database</h4>
                  {  resultDB.map( plant =>   <SearchResultDatabase
                                                            key={plant.id}                                       
                                                            plant={plant}
                                                            
                                                            />
                  )}</>
                  }      
                    { (resultNote !== undefined) &&                   
                    <>
                    <h4 className="result__Separator"><strong>"{holdSearchQuery}"</strong> Found in your Notes</h4>
                  {  resultNote.map( note =>   <SearchResultNoteCard
                                                            key={note.id}
                                                                                                  
                                                            note={note}
                                                        />
                  )}</>
                  }      
                    { (resultArchive !== undefined) &&                   
                    <>
                    <h4 className="result__Separator"><strong>"{holdSearchQuery}"</strong> Found in your archives</h4>
                  {  resultArchive.map( plant =>   <SearchResultPlantCard
                                                            {...props}
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


                