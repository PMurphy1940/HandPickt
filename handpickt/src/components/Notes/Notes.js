import React, { useState } from 'react'
import WithAuthentication from "../Auth/WithAuthentication"
import BottomNavbar from "../Footer/FooterNav"
import UserNoteCard from "./UserNoteCard"
import NoteDetails from "./NoteDetails"
import ModalNotes from "../Modal/AddNoteModal"
import API from "../Server/HandPicktAPI"
import { Navbar, Button } from 'react-bootstrap';
import "./Notes.css"
const Notes = (props) => {
    const [inspectViewOn, setInspectViewOn] = useState(false)
    const [noteToInspect, setNoteToInspect] = useState()
    const [editNoteFieldActive, setEditNoteFieldActive] = useState(true)
    const [enableSaveButton, setEnableSaveButton] = useState(false)
    const [openModal, setOpenModal] = useState(false)
    const [recurring, setRecurring] = useState(false)
    const [weekArray, setWeekArray] = useState("")

    window.scrollTo(0,0)
    
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
  

    const handleDelete = () => {
        console.log(noteToInspect)
        API.delete( "notes", noteToInspect.id)
        .then(() => props[0].getUserNotes())
        // .then(props[0].setUserNotes));
      };

    const toggleRecurring = () => {
        setRecurring(!recurring)
    }

    const setRecurringStateForEdit = () => {

        setRecurring(noteToInspect.recurring)
    }

    const assignPostIt = () => {
        let randomNumber = Math.floor(Math.random() * 7) + 1       
        setNoteToInspect({...noteToInspect,
               imageNumber: randomNumber})
        }


    const details = (id) => {
        API.getOne(id, "notes", "")
        .then((singleNote) => {
            singleNote=singleNote[0]
            setNoteToInspect(singleNote)
             
            setInspectViewOn(true)  
        })
    }

    const handleNoteField = (event) => {
        const stateToChange ={...noteToInspect};      
        stateToChange[event.target.id] = event.target.value;
        setNoteToInspect(stateToChange)
        setEnableSaveButton(true)
    }
    //get the user selected days from the details Occuring modal
    const returnWeekArrayFromModal = (weekArrayFromModal) => {       
            toggleModal();
            setEnableSaveButton(true)
            setWeekArray(weekArrayFromModal);
        }

    const makeNoteObject = () => {

        let noteObj = {
            userId: noteToInspect.userId,
            imageNumber:  noteToInspect.imageNumber,
            note: noteToInspect.note,
            date: noteToInspect.date,
            recurring: noteToInspect.recurring,
            day0: weekArray[0].day0,
            day1: weekArray[1].day1,
            day2: weekArray[2].day2,
            day3: weekArray[3].day3,
            day4: weekArray[4].day4,
            day5: weekArray[5].day5,
            day6: weekArray[6].day6,
        }
        return noteObj
    }

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
                        <img className="note__For__Recycle" src={require(`../images/addnote${noteToInspect.imageNumber}.png`)} alt="recycle postIt note" /> 
                        <button onClick={assignPostIt} className="recycle">
                        <img className="HPLogo__InApp" src={require(`../images/recycle.png`)} alt="recycle postIt note" /> 
                        </button>
                        <div className="add__Note__Buttons">
                                <button hidden={!recurring} onClick={toggleRecurring} className="recurring__Button">
                                    <p>Recurring</p>
                                    <i className="far fa-check-circle" id="NoteCheck"></i>
                                </button>
                                <button hidden={recurring} onClick={toggleRecurring} className="recurring__Button">
                                    <p>Not Recurring</p>
                                    <i  className="far fa-check-circle" id="NoteCheck"></i>
                                </button>
                        </div>      
                    </div>
                    <Button hidden={!recurring} variant="info" className="select__Recurring__Button" onClick={toggleModal}>Set Recurring Days</Button> 
                    <div className="user__Container__Notes">
                        <div className="notes__Scroll" >
                        {  
                             <NoteDetails
                                    key={noteToInspect.id}                                       
                                    back={true} 
                                    setRecurringStateForEdit={setRecurringStateForEdit}
                                    handleDelete={handleDelete}
                                    note={noteToInspect}
                                    details={details}
                                    recurring={recurring}
                                    editNoteFieldActive={editNoteFieldActive}
                                    handleNoteField={handleNoteField}
                                    toggleEditNoteFieldActive={toggleEditNoteFieldActive}
                                    toggleModal={toggleModal}
                                    />
                            }
                        </div>
                        <ModalNotes 
                            toggleModal={toggleModal}
                            inspectViewOn={inspectViewOn} 
                            openModal={openModal} 
                            note={noteToInspect}               
                            returnWeekArrayFromModal={returnWeekArrayFromModal}
                            {...props}
                            /> 
                        
                    </div> 
                </> 
                )
        }
     }

    return(
        <div className="dashboard__Container">
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


               