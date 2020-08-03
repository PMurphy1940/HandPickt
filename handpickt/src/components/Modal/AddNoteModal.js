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

    // const [days, setDays] = useState({
    //                                     friday: false
    // })
    // const handleDays = (dayOfWeek) => {
    //     const stateToChange ={...days}; 
    //     let change = (stateToChange.dayOfWeek)
    //     change=(!change )          
    //     stateToChange[dayOfWeek] = change;
    //      console.log(change)
    //     setDays(stateToChange)
    //     console.log("Days", days)
    // }
    // <button className={ (!days.friday) ? "checkbox" : "checkboxAfter"} onClick={() => handleDays("friday")}>
    //                 Friday
    //             </button>

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

    const makeWeekArray = () => {
        let weekArray = []

        if (sunday === true) {
            weekArray.push({"day": 0})
        }
        if (monday === true) {
            weekArray.push({"day": 1})
        }
        if (tuesday === true) {
            weekArray.push({"day": 2})
        }
        if (wednesday === true) {
            weekArray.push({"day": 3})
        }
        if (thursday === true) {
            weekArray.push({"day": 4})
        }
        if (friday === true) {
            weekArray.push({"day": 5})
        }
        if (saturday === true) {
            weekArray.push({"day": 6})
        }
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
