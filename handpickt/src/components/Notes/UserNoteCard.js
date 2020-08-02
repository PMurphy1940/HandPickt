import React, { useState } from 'react'

import helper from "../Helpers/Helper"

const UserNoteCard = (props) => {
    // const [oddEven, setOddEven] = useState(false)
    let pic= `pic${props.note.imageNumber}`
    const leftOrRight = () => {
        if (props.note.id%2 !== 0) {
            return (
                <>
            <div className="note__Card_Container__Odd" id={pic}>
                <div className="note__Specifics">
                <p className="note__Content">{props.note.note}</p>
                </div>       
                <div className="add__Button__Container">

                </div>
            </div>
           
            </>
            )
        }
        else {
            return (
                <>
            
            <div className="note__Card_Container__Even" id={pic}>
                
                <div className="note__Specifics">
                <p className="note__Content">{props.note.note}</p>
                </div>       
                <div className="add__Button__Container">

                </div>
            </div>
            </>
            )
        }   
    }


console.log(props)
console.log("Card props", props)
    return (
        <>
         <div className="notes__Holder" id="categoryList">
         
            {leftOrRight()}
        </div>
        </>
    )
}

export default UserNoteCard


