import React, { useState, useEffect } from 'react'
import WithAuthentication from "../Auth/WithAuthentication"
import BottomNavbar from "../Footer/FooterNav"
import UserNoteCard from "./UserNoteCard"
import NoteDetails from "./NoteDetails"
import API from "../Server/HandPicktAPI"
import { Navbar } from 'react-bootstrap';
import Image from 'react-bootstrap/Image'
import "./Notes.css"
const Notes = (props) => {
    const [userNotes, setUserNotes] = useState([])
    const [inspectViewOn, setInspectViewOn] = useState(false)
    const [noteToInspect, setNoteToInspect] = useState()
    const [saveScrollPosition, setSaveScrollPosition] = useState(0)
    const [editNoteFieldActive, setEditNoteFieldActive] = useState(false)
    const [editCommentsFieldActive, setEditCommentsFieldActive] = useState(false)
    const [enableSaveButton, setEnableSaveButton] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [openModal, setOpenModal] = useState(false)
    const [modalType, setModalType] = useState('')

    const handleLogout = () => {
        sessionStorage.removeItem("credentials")
        props[0].setUser()
        props[0].history.push("/logout");
    }
    
    //Toggle function for modal window//
    const toggleModal = () => {
        setOpenModal(!openModal)
    }

    const discard = () => {
        setEnableSaveButton(false)
        setInspectViewOn(false)   
    }

    const toggleEditNoteFieldActive = () => {
        setEditNoteFieldActive(!editNoteFieldActive)
    }
    
    const toggleEditCommentsFieldActive = () => {
        setEditCommentsFieldActive(!editCommentsFieldActive)
    }

    const handleDelete = (note) => {
        setNoteToInspect(note)
        setModalType("Delete")
        toggleModal()
      };

    const completeDelete = (id) => {
        API.delete( "notes", noteToInspect.id)
          .then(() => API.getAll("userNotes")
          .then(props[0].setUserNotes));
    }

    const handleNoteField = (event) => {
 
        const stateToChange ={...noteToInspect};
        stateToChange[event.target.id] = event.target.value;
        
        setNoteToInspect(stateToChange)
        setEnableSaveButton(true)
    }

    const noteView = () => {

         return (
             <>
                 <div className="headline__container">
                     <h3 className="category__Headline">Notes</h3>
                     
                 </div>
                 <div className="user__Container__Notes">
                     <div className="notes__Scroll" id="categoryList">
                     {  
                         props[0].userNotes.map(note => <UserNoteCard 
                                                    key={note.id}                                       
                                                    back={true} 
                                                    handleDelete={handleDelete}
                                                    note={note}
                                                    />)
                         }
                     </div>                
                 </div> 
             </> 
             ) 
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
            <div className="user__Container__NoteTop">
                      {noteView()}        
            </div>
        
            <Navbar fixed="bottom" className="bottom__Nav">
                <div >
                    <BottomNavbar {...props}/>
                </div>
            </Navbar>
        </div>
    )
}

export default WithAuthentication(Notes)


               