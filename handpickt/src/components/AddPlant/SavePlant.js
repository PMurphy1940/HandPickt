import React from 'react'
import { Card, Button } from 'react-bootstrap'

const SavePlant = (props) => {


    return (
        <>
        <div className="save__Card_Container">
            <Card className="save__Card">
        <div className="plant__Specific__Header">
            <Card.Header as="h5">{props.plant.common_name}</Card.Header>
        </div>
                <Card.Body>
                <img className="plant__Category__Image" src={require(`../images/${props.plant.image}`)} alt={props.plant.common_name} />                  
                <Card.Title>{props.plant.days_to_maturity} days to harvest</Card.Title>
                <Card.Text className="plant__Specific__Text">
                {props.plant.description}
                </Card.Text>
                <div className="add__Button__Container">
                  <Button variant="primary" onClick={ () => props.postToGarden()}>Plant it!</Button>
                  <Button variant="primary" onClick={ () => props.makeComment()}>Add Comment</Button>
                  <Button variant="primary" onClick={ () => props.goBack()}>Go Back</Button>
                </div>
            </Card.Body>
        </Card>
      </div>
        </>
    )
}

export default SavePlant