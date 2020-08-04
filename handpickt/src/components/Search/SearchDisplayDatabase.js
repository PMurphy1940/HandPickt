import React from 'react'
import { Card, Button } from 'react-bootstrap'
import helper from "../Helpers/Helper"
import {
    CircularProgressbar,
    buildStyles
  } from "react-circular-progressbar";
  import "react-circular-progressbar/dist/styles.css";

const SearchResultDatabase = (props) => {

console.log("Comments props",props)

    return (
        <>
        <div className="save__Card_Container">
            <Card style={{ width: '24rem' }} className="save__Card">
        <div className="garden__Card__Header">
            <Card.Header as="h5">
            <div className="card__Header__Garden">
                {props.name} 
                <div className="progress__Container"> 
                </div>
               
            </div>
            </Card.Header>
        </div>
                <Card.Body>
                <img className="plant__Specific__Image" src={require(`../images/beans.png`)} alt="HandPickt Logo" />               

                
                <Card.Title>
                </Card.Title>
                <Card.Text className="garden__Specific__Text">
                  
                    
                </Card.Text>
                
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
export default SearchResultDatabase