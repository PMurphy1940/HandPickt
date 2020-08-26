import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import "../Modal/Modal.css"

const LogOutAdd = (props) => {
const [modalAdd, setModalAdd] = useState(true)




const SwitchModalAdd = () => {
    setModalAdd(false)
}

    return (
        <>
        {modalAdd ? 
        <div >
            <Modal isOpen={props.openAdd}>
                <ModalHeader >Be Sure To Check Out Our Friends at</ModalHeader>
                <ModalBody>
                    <h2 className="Adds">Granny's Recipe Box</h2>
                    <img className="sunshine__Pic" src={require(`../images/GrannysRecipeBox.png`)} alt="Grannys Recipe Box" /> 
                    <h4 className="Adds">Your Recipes. Your Way.</h4>
                </ModalBody>
                <ModalFooter>
                <Button color="primary" onClick={() => SwitchModalAdd()}>OK</Button>{' '}
                </ModalFooter>
            </Modal>
        </div>
        :
        <div >
            <Modal isOpen={props.openAdd}>
                <ModalHeader >Be Sure To Check Out Our Friends at</ModalHeader>
                <ModalBody>
                    <h2 className="Adds">Brenda's Angel</h2>
                    <img className="sunshine__Pic" src={require(`../images/BrendasAngel.png`)} alt="Brendas Angel" /> 
                    <h4 className="Adds">Put your trust in Brenda. She'll get you through.</h4>
                </ModalBody>
                <ModalFooter>
                <Button color="primary" onClick={props.closeAdd}>OK</Button>{' '}
                </ModalFooter>
            </Modal>
        </div>
        }
        </>
        )
    
}

export default LogOutAdd