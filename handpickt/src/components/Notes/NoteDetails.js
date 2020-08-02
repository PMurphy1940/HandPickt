import React, { useState, useEffect }from 'react'
import { Card, Button } from 'react-bootstrap'
import helper from "../Helpers/Helper"


const NoteDetails = (props) => {
    const [thisNoteToday, setThisNoteToday] = useState(false)


    let note = props.note[0]

    let today = `todayDetails${note.imageNumber}`

    let pic= `pic${note.imageNumber}`

    useEffect(() => {
        checkForNoteAlert(note)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [note])

    const checkForNoteAlert = (note) => {
        let date = new Date()
        let dayOfWeek = date.getDay()

        
            checkRecurrence(note, dayOfWeek)
             
    }

    const checkRecurrence = (singleNote, day) => {
        if (singleNote.recurrence !== "") {
            singleNote.recurrence.forEach(recurrenceElement => {
                if (recurrenceElement.day === day) {
                    setThisNoteToday(true)
                }
            })
        }
    }
    useEffect(() => {
        window.scrollTo(0, 0)
      }, [])

      return (
        <>
         <div className="notes__Holder__Details" id="categoryList">
            <div className="note__Card_Container__Details" id={pic}>
        {(props.editNoteFieldActive) ? 
            <div className="note__Specifics">
                <button onClick={props.toggleEditNoteFieldActive}>
                <p className="note__Content">{note.note}</p>
                </button>
            </div> 
            :
            <div className="note__Specifics__Edit">
            <div>
            <textarea
                        onChange={props.handleNoteField}    
                        type="textarea" 
                        rows="3" 
                        cols="13"
                        name="note"
                        value={note.note}
                        id="note"
                        className="note__In__Edit"
                        />
            </div>
            <button className="far fa-check-circle" onClick={props.toggleEditNoteFieldActive} id="note__Edit__Done"></button>
            </div> 
            }
                
            <div className="add__Button__Container">
            { (thisNoteToday) && <img className={today} src={require(`../images/today.png`)} alt="A note for today" />}
            { (thisNoteToday) && <p>Today!</p>}
            </div>
                
        </div>
    </div>
   
    </>
    )
}

export default NoteDetails