import React, { useState, useEffect }from 'react'
import BottomNavbar from "../Footer/FooterNav"
import WithAuthentication from "../Auth/WithAuthentication"
import API from "../Server/HandPicktAPI"
import ModalNotes from "../Modal/AddNoteModal"
import { Navbar, Button } from 'react-bootstrap';


const AddNote = (props) => {
    const [note, setNote] = useState({
                                        userId: "",
                                        imageNumber: 1,
                                        note: "",
                                        date: "",
                                        recurring: false,
                                        day0: false,
                                        day1: false,
                                        day2: false,
                                        day3: false,
                                        day4: false,
                                        day5: false,
                                        day6: false,
                                    })
    const [enableSaveButton, setEnableSaveButton] = useState(false)
    const [recurring, setRecurring] = useState(false)
    const [openModal, setOpenModal] = useState(false)
    const [weekArray, setWeekArray] = useState("")
    
    

    const modalType= "addNote"                                  
    const toggleModal = () => {
        setOpenModal(!openModal)
    }
    const assignPostIt = () => {
        let randomNumber = Math.floor(Math.random() * 7) + 1       
        setNote({...note,
               imageNumber: randomNumber})
        }

    let pic= `pic${note.imageNumber}`

    useEffect(() => {
        assignPostIt()
    })

    const toggleRecurring = () => {
        setRecurring(!recurring)
    }
    const handleNoteField = (event) => {
        const stateToChange ={...note};      
        stateToChange[event.target.id] = event.target.value;
         console.log(stateToChange)
        setNote(stateToChange)
        setEnableSaveButton(true)
    }

    const returnWeekArrayFromModal = (weekArrayFromModal) => {       
        toggleModal();
        setWeekArray(weekArrayFromModal);
    }

    const makeNoteObject = () => {
        let today = new Date()
        let noteObj = {
            userId: props[0].activeUser.id,
            imageNumber:  note.imageNumber,
            note: note.note,
            date: today,
            recurring: recurring,
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

    const handleSaveNote = (id) => {
        setEnableSaveButton(false)
        let saveNote = makeNoteObject()
        API.addNew(saveNote, "notes")
        .then(() => props[0].getUserNotes() )
    }

      return (
        <>
        <div className="headline__container">
            <h3 className="category__Headline">New Note</h3>
            <img className="note__For__Recycle" src={require(`../images/addnote${note.imageNumber}.png`)} alt="recycle postIt note" /> 
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
        <div className="new__Note__Container">
            <div className="notes__Scroll" id="categoryList"></div>               
            
            <div className="notes__Holder__Details" id="categoryList">
                <div className="note__Card_Container__Details" id={pic}>                       
                    <textarea
                        onChange={handleNoteField}    
                        type="textarea" 
                        rows="4" 
                        cols="16"
                        name="note"
                        value={note.note}
                        id="note"
                        className="note__In__Edit"
                    />                               
                </div>
            </div>
            <ModalNotes 
                toggleModal={toggleModal} 
                openModal={openModal}                
                modalType={modalType}
                returnWeekArrayFromModal={returnWeekArrayFromModal}
                {...props}
                /> 

        <Button hidden={!recurring} variant="info" className="select__Recurring__Button" onClick={toggleModal}>Set Recurring Days</Button> 
        <Button hidden={!enableSaveButton} variant="danger" className="save__Edit__Button" onClick={ () => handleSaveNote()}>Save Changes</Button> 
            
        <Navbar fixed="bottom" className="bottom__Nav">
            <div >
                <BottomNavbar {...props}/>
            </div>
        </Navbar>
   </div>
    </>
    )
}

export default WithAuthentication(AddNote)