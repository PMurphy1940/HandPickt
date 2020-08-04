import React from 'react'
import { Card, Button } from 'react-bootstrap'

const SearchResultDatabase = (props) => {

console.log("Database props",props)

    return (
        <>
        <div className="save__Card_Container">
            <Card style={{ width: '24rem' }} className="save__Card">
        <div className="garden__Card__Header">
            <Card.Header as="h5">
            <div className="card__Header__Garden">
                {props.plant.common_name} 
                <div className="progress__Container"> 
                </div>
               
            </div>
            </Card.Header>
        </div>
                <Card.Body>
                <img className="plant__Specific__Image" src={require(`../images/beans.png`)} alt="HandPickt Logo" />                             
                <Card.Title>
                {props.plant.days_to_maturity} days to maturity
                </Card.Title>
                
                    <div className="Database__Search__Card__Text">
                        {props.plant.description}
                    </div>
                
            </Card.Body>
        </Card>
      </div>
        </>
    )
}
export default SearchResultDatabase