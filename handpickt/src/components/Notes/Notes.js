import React, { useState, useEffect } from 'react'
import WithAuthentication from "../Auth/WithAuthentication"
import BottomNavbar from "../Footer/FooterNav"
import UserNoteCard from "./UserNoteCard"
import NoteDetails from "./NoteDetails"
import API from "../Server/HandPicktAPI"
import { Navbar, Button } from 'react-bootstrap';
import "./Notes.css"
const Notes = (props) => {
    const [userNotes, setUserNotes] = useState([])
    const [inspectViewOn, setInspectViewOn] = useState(false)
    const [noteToInspect, setNoteToInspect] = useState()
    const [saveScrollPosition, setSaveScrollPosition] = useState(0)
    const [editNoteFieldActive, setEditNoteFieldActive] = useState(true)
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
        console.log(editNoteFieldActive)
    }
    
    const toggleEditCommentsFieldActive = () => {
        setEditCommentsFieldActive(!editCommentsFieldActive)
    }

    const handleDelete = () => {
        console.log(noteToInspect)
        API.delete( "notes", noteToInspect[0].id)
        .then(() => props[0].getUserNotes())
        // .then(props[0].setUserNotes));
      };


    const details = (id) => {
        API.getOne(id, "notes", "")
        .then((singleNote) => {
            singleNote=singleNote[0]
            // holdPosition()
            
            setNoteToInspect(singleNote) 
            setInspectViewOn(true)  
        })
    }

    const handleNoteField = (event) => {
        const stateToChange ={...noteToInspect};
       
        stateToChange[event.target.id] = event.target.value;
         console.log(stateToChange)
        setNoteToInspect(stateToChange)
        setEnableSaveButton(true)
    }

    const makeNoteObject = () => {

        let noteObj = {
            userId: noteToInspect.userId,
            imageNumber:  noteToInspect.imageNumber,
            note: noteToInspect.note,
            date: noteToInspect.date,
            recurring: noteToInspect.recurring,
            recurrence: noteToInspect.recurrence,
        }
        return noteObj
    }

    console.log(props)
    //Send the Edit to the API//
    const handleSaveEdit = (id) => {
        setEnableSaveButton(false)
        let editNote = makeNoteObject()
        API.updateOne(editNote, id, "notes")
        .then(() => props[0].getUserNotes() )
    }

    const noteView = () => {

        if (!inspectViewOn) {
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
                                                    details={details}
                                                    toggleEditNoteFieldActive={toggleEditNoteFieldActive}
                                                    />)
                         }
                     </div>                
                 </div> 
             </> 
             )}
        else if (inspectViewOn) {
            return (

                <>
                    <div className="headline__container">
                        <h3 className="category__Headline">Notes</h3>
                        
                    </div>
                    
                    <div className="user__Container__Notes">
                        <div className="notes__Scroll" >
                        {  
                             <NoteDetails
                                    key={noteToInspect.id}                                       
                                    back={true} 
                                    handleDelete={handleDelete}
                                    note={noteToInspect}
                                    details={details}
                                    editNoteFieldActive={editNoteFieldActive}
                                    handleNoteField={handleNoteField}
                                    toggleEditNoteFieldActive={toggleEditNoteFieldActive}
                                    />
                            }
                        </div>

                        
                    </div> 
                </> 
                )
        }
     }

    return(
        <div className="dashboard__Container">
            {/* <div className="dashboard__Header">
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
            </div> */}
            <div className="user__Container__NoteTop">
                      {noteView()}        
            </div>
            {(inspectViewOn) && 
                <div>
                    <Button variant="primary" className="note__Back" onClick={ () => discard()}>Back</Button>
                    <Button variant="primary" className="note__Delete" onClick={handleDelete}>Remove</Button>             
                    <Button hidden={!enableSaveButton} variant="danger" className="save__Edit__Button" onClick={ () => handleSaveEdit(noteToInspect.id)}>Save Changes</Button> 
                </div>
                }     
            <Navbar fixed="bottom" className="bottom__Nav">
                <div >
                    <BottomNavbar {...props}/>
                </div>
            </Navbar>
            
        </div>
    )
}

export default WithAuthentication(Notes)


               