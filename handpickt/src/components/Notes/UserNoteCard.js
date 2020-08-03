import React, { useState, useEffect } from 'react'

const UserNoteCard = (props) => {
    const [thisNoteToday, setThisNoteToday] = useState(false)

    let note = props.note

    let today = `today${props.note.imageNumber}`

    let pic= `pic${props.note.imageNumber}`

    useEffect(() => {
        checkForNoteAlert(note)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [note])

    const checkForNoteAlert = (note) => {
        let date = new Date()
        let dayOfWeek = date.getDay()
        dayOfWeek = "day" + dayOfWeek
        
            checkRecurrence(note, dayOfWeek)
             
    }

    const checkRecurrence = (singleNote, day) => {

        if (singleNote.recurring === true) {
                if (singleNote[day] === true) {
                    setThisNoteToday(true)
                }
            
        }
    }


    const leftOrRight = () => {
        if (props.note.id%2 !== 0) {
            return (
                <>
                <button onClick={ () => props.details(props.note.id)}> 
                <div className="note__Card_Container__Odd" id={pic}>

                <div className="note__Specifics">
                    
                    <p className="note__Content">{props.note.note}</p>
                    
                </div>
                      
                <div className="add__Button__Container">
                { (thisNoteToday) && <img className={today} src={require(`../images/today.png`)} alt="A note for today" />}
                { (thisNoteToday) && <p>Today!</p>}
                </div>
            </div>
                </button>
            </>
            )
        }
        else {
            return (
                <>
            <button className="note__Edit__Button__Space"onClick={ () => props.details(props.note.id)}>  
            <div className="note__Card_Container__Even" id={pic}>
             
            <div className="note__Specifics">
                    
                    <p className="note__Content">{props.note.note}</p>
                    
                </div>     
                <div className="add__Button__Container">
                
                { (thisNoteToday) && <img className={today} src={require(`../images/today.png`)} alt="A note for today" />}
                { (thisNoteToday) && <p>Today!</p>}
                </div>
                
            </div>
            </button>
            </>
            )
        }   
    }

    return (
        <>
         <div className="notes__Holder" id="categoryList">
         
            {leftOrRight()}
        </div>
        </>
    )
}

export default UserNoteCard


