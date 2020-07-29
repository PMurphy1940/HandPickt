import React from 'react'
import { Card, Button } from 'react-bootstrap'

const PlantCategoryCard = (props) => {


    return (
      <div className="plant__Card">
        <Card style={{ width: '16rem' }} className="plant__Card">
            
            <Card.Header as="h5">{props.name}</Card.Header>
                <Card.Body>
                <Card.Title>Special title treatment</Card.Title>
                <Card.Text>
                With supporting text below as a natural lead-in to additional content.
                </Card.Text>
                <div className="add__Button__Container">

                { !props.back &&
                  <Button variant="primary" onClick={ () => props.selectType(`${props.name}`)}>Select</Button>
                  }

                  { props.back && 
                  <>
                  <Button variant="primary" onClick={ () => props.selectType(props.plant)}>Plant</Button>
                  <Button variant="primary" onClick={ () => props.goBack()}>Go Back</Button>
                  </>
                  }
                </div>
            </Card.Body>
        </Card>
      </div>
    )
}

export default PlantCategoryCard