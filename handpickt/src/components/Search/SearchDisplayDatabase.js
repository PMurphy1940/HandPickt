import React from 'react'
import { Card } from 'react-bootstrap'

const SearchResultDatabase = (props) => {


    return (
        <>
        <div className="save__Card_Container">
            <Card className="save__Card">
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
                <img className="plant__Specific__Image" src={require(`../images/${props.plant.image}`)} alt={props.name} />                             
                <Card.Title>
                {props.plant.days_to_maturity} days to maturity
                </Card.Title>
                
                    <div className="Database__Search__Card__Text">
                        {props.plant.description}
                    </div>
                    <div className="Database__Search__Card__Text">
                        <h4>Planting</h4>
                        {props.plant.sowing_method}
                    </div>
                
            </Card.Body>
        </Card>
      </div>
        </>
    )
}
export default SearchResultDatabase