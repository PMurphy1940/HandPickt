import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import "./Modal.css"


const ModalEntries = (props) => {

    // const toggleSaturday = () => {

    // }
    console.log("ModalSaturday", props.saturday)

const modalView = () => {
    if (props[0].match.path.toString() === "/addplant") {
        return (
            <>
            <div >
                <Modal isOpen={props.openModal}>
                    <ModalHeader >Save comments with plant</ModalHeader>
                    <ModalBody>
                        <fieldset className="commentsField">
                            <textarea
                                className="individual__Comments__Field1" 
                                type="textarea" 
                                id="userComments" 
                                rows="4" 
                                cols="44"
                                value={props.plantForm.userComments}
                                placeholder="Comments"
                                onChange={props.handleChange}
                                />
                        </fieldset>
                    </ModalBody>
                    <ModalFooter>
                    <Button color="primary" onClick={props.toggle}>OK</Button>{' '}
                    </ModalFooter>
                </Modal>
            </div>
            </>
            )}
    else if (props.modalType === "earlyHarvest") {
        return (
            <>
            <div >
                <Modal isOpen={props.openModal}>
                    <ModalHeader >Do you wish to set the plant to early harvest? </ModalHeader>
                    <ModalBody>
                        This action is not reversable
                    </ModalBody>
                    <ModalFooter>
                    <Button color="primary" onClick={props.harvestNow}>OK</Button>{' '}
                    <Button color="primary" onClick={props.toggleModal}>Cancel</Button>{' '}
                    </ModalFooter>
                </Modal>
            </div>
            </>
            )
        }
    else if (props.modalType === "archiveOrDelete") {
        return (
            <>
            <div >
                <Modal isOpen={props.openModal}>
                    <ModalHeader >You may Archive the plant or Delete outright</ModalHeader>
                    <ModalBody>
                        If you choose to Archive, you may save a comment with the plant on the next page.
                    </ModalBody>
                    <ModalFooter>
                    <Button color="primary" onClick={() => props.toggleModal()}>Cancel</Button>{' '}
                    <Button color="primary" onClick={() => props.toArchive()}>Archive</Button>{' '}
                    <Button color="primary" onClick={() => props.completeDelete()}>Delete</Button>{' '}
                    </ModalFooter>
                </Modal>
            </div>
            </>
            )
    }
    // else if (props.modalType === "addNote") {
    //     return (
    //         <>
    //         <div >
    //             <Modal isOpen={props.openModal}>
    //                 <ModalHeader >On which days does this note occur?</ModalHeader>
    //                 <ModalBody>
    //                 <div className="days" >
    //                     <div className="checkbox">
    //                         <input
    //                             type="checkbox"
    //                             value="0"
    //                             name="Sunday"
    //                             id="Sunday"
    //                             />
    //                         <label htmlFor="Sunday">Sunday</label>
    //                     </div>
    //                     <div className="checkbox">
    //                         <input
    //                             type="checkbox"
    //                             value="1"
    //                             name="Monday"
    //                             id="Monday"
    //                             />
    //                         <label htmlFor="Monday">Monday</label>
    //                     </div>
    //                     <div className="checkbox">
    //                         <input
    //                             type="checkbox"
    //                             value="2"
    //                             name="Tuesday"
    //                             id="Tuesday"
    //                             />
    //                         <label htmlFor="Tuesday">Tuesday</label>
    //                     </div>
    //                     <div className="checkbox">
    //                         <input
    //                             type="checkbox"
    //                             value="3"
    //                             name="Wednesday"
    //                             id="Wednesday"
    //                             />
    //                         <label htmlFor="Wednesday">Wednesday</label>
    //                     </div>
    //                     <div className="checkbox">
    //                         <input
    //                             type="checkbox"
    //                             value="4"
    //                             name="Thursday"
    //                             id="Thursday"
    //                             />
    //                         <label htmlFor="Thursday">Thursday</label>
    //                     </div>
    //                     <button className={ (!props.days.friday) ? "checkbox" : "checkboxAfter"} onClick={() => props.handleDays("friday")}>
    //                         Friday
    //                     </button>
    //                     <button className={ (!props.saturday) ? "checkbox" : "checkboxAfter"} onClick={() => props.toggleSaturday()}>
    //                         Saturday
    //                     </button>
                    
    //                 </div>
    //                 </ModalBody>
    //                 <ModalFooter>
    //                 <Button color="primary" onClick={() => props.toggleModal()}>Cancel</Button>{' '}
    //                 <Button color="primary" onClick={() => props.completeDelete()}>OK</Button>{' '}
    //                 </ModalFooter>
    //             </Modal>
    //         </div>
    //         </>
    //         )
    // }
}

return (
    <>
    {modalView()}
    </>
    )
}

export default ModalEntries