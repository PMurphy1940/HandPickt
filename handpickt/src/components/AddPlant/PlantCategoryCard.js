import React from 'react'
import { Card, Button } from 'react-bootstrap'

const PlantCategoryCard = (props) => {

    return (
        <Card style={{ width: '14rem' }} className="plant__Card">
            
            <Card.Header as="h5">{props.category}</Card.Header>
                <Card.Body>
                <Card.Title>Special title treatment</Card.Title>
                <Card.Text>
                With supporting text below as a natural lead-in to additional content.
                </Card.Text>
            <Button variant="primary">Go somewhere</Button>
            </Card.Body>
        </Card>
    )
}

export default PlantCategoryCard