import React, { useEffect }from 'react'
import { Card, Button } from 'react-bootstrap'
import helper from "../Helpers/Helper"

const ArchivePlantDetails = (props) => {


    useEffect(() => {
        window.scrollTo(0, 0)
      }, [])

    return (
        <>
        { (!props.isLoading) &&
        <div className="save__Card_Container">
            <Card style={{ width: '24rem' }} className="save__Card">
        <div className="garden__Card__Header">
            <Card.Header as="h5">
            <div className="card__Header__Garden">
                {props.plantToInspect.plant.common_name} 
                 
            </div>
            </Card.Header>
        </div>
                <Card.Body>
                <img className="plant__details__Image" src={require(`../images/beans.png`)} alt="HandPickt Logo" />               
                
                    Last planted on {helper.dateConverter(props.plantToInspect.plantingDate)} <br></br>                   
                    Archived on {helper.dateConverter(props.plantToInspect.archiveDate)}
                
                <Card.Title>
                    Status: Archived
                    
                </Card.Title>
                <div className="detail__Specific__Text">
                
                 {  (props.editCommentsFieldActive) ? 
                 <> 
                    <h2>Comments</h2> 
                    <div>             
                    <textarea
                        onChange={props.handlePlantedField}    
                        type="textarea" 
                        rows="4" 
                        cols="30"
                        name="userComments"
                        value={props.plantToInspect.userComments}
                        id="userComments"
                        />
                    </div> 
                    <button className="far fa-check-circle" onClick={props.toggleEditCommentsFieldActive}></button>
                </> 
                 :
                
                    <div className="detail__Comments">
                        <h2>Comments</h2>
                        <button className="detail__Comments__Button" onClick={props.toggleEditCommentsFieldActive}>
                            {props.plantToInspect.userComments}
                        </button><i className="far fa-edit"></i>
                    </div>
               
                }
                
                </div>
                <div>
                    <h2>Description</h2>
                    {props.plantToInspect.plant.description}
                </div>
                <div>
                    <h2>Planting tips</h2>
                    {props.plantToInspect.plant.sowing_method}
                </div>
                <div className="add__Button__Container">
                  <Button variant="primary" onClick={ () => props.discard()}>Back</Button>
                  <Button variant="primary" onClick={ () => props.handleDelete(props.plantToInspect)}>Remove</Button>
                </div>
            </Card.Body>
        </Card>
      </div>
      }
        </>
    )
}

export default ArchivePlantDetails