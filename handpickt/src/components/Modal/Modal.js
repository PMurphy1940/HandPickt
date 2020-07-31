import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import "./Modal.css"


const ModalEntries = (props) => {
// console.log(props)

const modalView = () => {
    if (props[0].match.path == "/addplant") {
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
    else if (props[0].match.path == "/mygarden") {
        return (
            <>
            <div >
                <Modal isOpen={props.openModal}>
                    <ModalHeader >Do you wish to set the plant to early harvest? </ModalHeader>
                    <ModalBody>
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

}

return (
    <>
    {modalView()}
    </>
    )
}

export default ModalEntries