import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import "./Modal.css"


const ModalNotes = (props) => {
    const [sunday, setSunday] = useState(false)
    const [monday, setMonday] = useState(false)
    const [tuesday, setTuesday] = useState(false)
    const [wednesday, setWednesday] = useState(false)
    const [thursday, setThursday] = useState(false)
    const [friday, setFriday] = useState(false)
    const [saturday, setSaturday] = useState(false)

   

    const toggleSunday = () => {        
        setSunday(!sunday)
    }
    const toggleMonday = () => {        
        setMonday(!monday)
    }
    const toggleTuesday = () => {        
        setTuesday(!tuesday)
    }
    const toggleWednesday = () => {        
        setWednesday(!wednesday)
    }
    const toggleThursday = () => {        
        setThursday(!thursday)
    }
    const toggleFriday = () => {        
        setFriday(!friday)
    }
    const toggleSaturday = () => {        
        setSaturday(!saturday)
    }

    let weekArray = []
    //produce an array of the selected days to return to the Add Note page//
    const makeWeekArray = () => {

         (sunday) ? 
            weekArray.push({"day0": true}):weekArray.push({"day0": false});
         (monday) ? 
            weekArray.push({"day1": true}):weekArray.push({"day1": false});
         (tuesday) ? 
            weekArray.push({"day2": true}):weekArray.push({"day2": false});
         (wednesday) ? 
            weekArray.push({"day3": true}):weekArray.push({"day3": false});
         (thursday) ? 
            weekArray.push({"day4": true}):weekArray.push({"day4": false});
         (friday) ? 
            weekArray.push({"day5": true}):weekArray.push({"day5": false});
         (saturday) ? 
            weekArray.push({"day6": true}):weekArray.push({"day6": false});
        
        props.returnWeekArrayFromModal(weekArray)
    }

const modalNotesView = () => {


return (
    <>
    <div >
        <Modal isOpen={props.openModal}>
            <ModalHeader >On which days does this note occur?</ModalHeader>
            <ModalBody>
            <div className="days" >
                <button className={ (!sunday) ? "checkbox" : "checkboxAfter"} onClick={() => toggleSunday()}>
                    Sunday
                </button>
                <button className={ (!monday) ? "checkbox" : "checkboxAfter"} onClick={() => toggleMonday()}>
                    Monday
                </button>
                <button className={ (!tuesday) ? "checkbox" : "checkboxAfter"} onClick={() => toggleTuesday()}>
                    Tuesday
                </button>
                <button className={ (!wednesday) ? "checkbox" : "checkboxAfter"} onClick={() => toggleWednesday()}>
                    Wednesday
                </button>
                <button className={ (!thursday) ? "checkbox" : "checkboxAfter"} onClick={() => toggleThursday()}>
                    Thursday
                </button>
                <button className={ (!friday) ? "checkbox" : "checkboxAfter"} onClick={() => toggleFriday()}>
                    Friday
                </button>                
                <button className={ (!saturday) ? "checkbox" : "checkboxAfter"} onClick={() => toggleSaturday()}>
                    Saturday
                </button>
            
            </div>
            </ModalBody>
            <ModalFooter>
            <Button color="primary" onClick={() => props.toggleModal()}>Cancel</Button>{' '}
            <Button color="primary" onClick={() => makeWeekArray()}>OK</Button>{' '}
            </ModalFooter>
        </Modal>
    </div>
    </>
    )
    }


    return (
        <>
        {modalNotesView()}
        </>
        )
}
    
export default ModalNotes
