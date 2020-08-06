import React from 'react'
import { Card, Button } from 'react-bootstrap'
import helper from "../Helpers/Helper"
import {
    CircularProgressbar,
    buildStyles
  } from "react-circular-progressbar";
  import "react-circular-progressbar/dist/styles.css";

const GardenPlantCard = (props) => {



    return (
        <>
        <div className="save__Card_Container">
            <Card  className="save__Card">
        <div className="garden__Card__Header">
            <Card.Header as="h5" >
            <div className="garden__Card__Header__Content">
                <div className="card__PlantName__Details">
                    {props.name}
                </div> 
                <div className="progress__Container"> 
                {(props.plant.percentComplete < 100) ?            
                    <CircularProgressbar
                    className="ProgressBar"
                    value={props.plant.percentComplete}
                    strokeWidth={50}
                    styles={buildStyles({
                    strokeLinecap: "butt"
                    
                    })}
                    /> : 
                    <CircularProgressbar
                    className="ProgressBar__Complete"
                    value={props.plant.percentComplete}
                    strokeWidth={50}
                    styles={buildStyles({
                    strokeLinecap: "butt",
                    pathColor: "#ffea70"
                    })}
                    />
                }
                </div>
                <button disabled={(!props.plant.percentComplete < 100)} className="fas fa-utensils knife" onClick={props.earlyHarvest}></button>
               
            </div>
            </Card.Header>
        </div>
                <Card.Body style={{marginTop: "5%" }}>
                <img className="plant__Specific__Image" src={require(`../images/${props.plant.plant.image}`)} alt={props.name} />               
                Planted on {helper.dateConverter(props.plant.plantingDate)}
                
                <Card.Title>
                { (props.plant.daysRemaining > 0) ?
                   <>
                    {props.plant.daysRemaining} days to harvest </>: <>Ready to harvest</>
                    
                    }</Card.Title>
                <Card.Text className="garden__Specific__Text">
                  {props.plant.userComments}
                    
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

export default GardenPlantCard