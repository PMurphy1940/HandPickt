import React from 'react'
import { Button } from 'react-bootstrap'
import helper from "../Helpers/Helper"

const NoteCard = (props) => {


console.log("Card props", props)
    return (
        <>
        <div className="save__Card_Container">
         <p>Hello</p>
                
                <div className="add__Button__Container">
                  <Button variant="primary" onClick={ () => props.details(props.plant.id)}>Inspect</Button>
                  <Button variant="primary" onClick={ () => props.handleDelete(props.plant)}>Remove</Button>
                </div>

      </div>
        </>
    )
}

export default NoteCard