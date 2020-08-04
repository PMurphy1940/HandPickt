import React from 'react'
import { Card, Button } from 'react-bootstrap'

const SearchResultComment = (props) => {

console.log("Comments props",props)

    return (
        <>
        <div className="save__Card_Container">
            <Card style={{ width: '24rem' }} className="save__Card">
        <div className="garden__Card__Header">
            <Card.Header as="h5">
            <div className="card__Header__Garden">
                {props.name} 
               
            </div>
            </Card.Header>
        </div>
                <Card.Body>
                <img className="plant__Specific__Image" src={require(`../images/beans.png`)} alt="HandPickt Logo" />               
                <Card.Title>
                </Card.Title>
                <Card.Text className="garden__Specific__Text">
                  {props.plant.userComments}
                    
                </Card.Text>
                
                <div className="add__Button__Container">
                  <Button variant="primary" onClick={ () => props.details(props.plant.id)}>Inspect</Button>
                </div>
            </Card.Body>
        </Card>
      </div>
        </>
    )
}

export default SearchResultComment