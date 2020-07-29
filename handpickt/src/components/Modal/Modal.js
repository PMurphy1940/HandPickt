import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import "./Modal.css"


const ModalEntries = (props) => {


return (
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
    )
}

export default ModalEntries