import React from 'react'
import { Card, Button } from 'react-bootstrap'

const GardenPlantCard = (props) => {

console.log(props)
    return (
        <>
        <div className="save__Card_Container">
            <Card style={{ width: '24rem' }} className="save__Card">
        <div className="plant__Specific__Header">
            <Card.Header as="h5">{props.name}</Card.Header>
        </div>
                <Card.Body>
                <img className="plant__Specific__Image" src={require(`../images/beans.png`)} alt="HandPickt Logo" />               
                <Card.Title>{props.plant.days_to_maturity} days to harvest</Card.Title>
                <Card.Text className="plant__Specific__Text">
                {props.plant.description}
                </Card.Text>
                <div className="add__Button__Container">
                  <Button variant="primary" onClick={ () => props.editUserPlant()}>Edit</Button>
                  <Button variant="primary" onClick={ () => props.details()}>Inspect</Button>
                  <Button variant="primary" onClick={ () => props.handleDelete(props.plant.id)}>Delete</Button>
                </div>
            </Card.Body>
        </Card>
      </div>
        </>
    )
}

export default GardenPlantCard