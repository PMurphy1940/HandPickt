import React from 'react'
import { Card, Button } from 'react-bootstrap'
import helper from "../Helpers/Helper"
const ArchivePlantCard = (props) => {



    return (
        <>
        <div className="save__Card_Container">
            <Card className="save__Card">
        <div className="garden__Card__Header">
            <Card.Header as="h5">
            <div className="card__Header__Garden">
                {props.name}                
            </div>
            </Card.Header>
        </div>
                <Card.Body>
                <img className="plant__Specific__Image" src={require(`../images/${props.plant.plant.image}`)} alt={props.name} />               
                Last planted on {helper.dateConverter(props.plant.plantingDate)}<br></br>

                Archived on {helper.dateConverter(props.plant.archiveDate)}
                
                <Card.Title>
                Status: Archived
                    
                </Card.Title>
                
                  {props.plant.userComments}
                    
              
                
                <div className="add__Button__Container">
                  <Button variant="primary" onClick={ () => props.details(props.plant.id)}>Inspect</Button>
                  <Button variant="primary" onClick={ () => props.handleDelete(props.plant)}>Remove</Button>
                </div>
            </Card.Body>
        </Card>
      </div>
        </>
    )
}

export default ArchivePlantCard