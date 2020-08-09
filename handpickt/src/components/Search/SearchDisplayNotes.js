import React, { useState, useEffect } from 'react'


const SearchResultNoteCard = (props) => {
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

     return (
        <>
                
                <button className="search__Result__Note__Button" onClick={ () => props.details(props.note.id)}> 
                    <div className="note__Card_Container__Odd" id={pic}>
                        <div className="note__Specifics">       
                            <p className="search_Result__Note__Content">{props.note.note}</p>                   
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

export default SearchResultNoteCard