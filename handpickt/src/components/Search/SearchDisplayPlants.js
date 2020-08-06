import React from 'react'
import { Card, Button } from 'react-bootstrap'

const SearchResultPlantCard = (props) => {

console.log(props)
    const resultVerify = () => {

         if (props.plant.plant === undefined) {
            return (
                <>
                <h3>Sorry, nothing matches your search</h3>
                </>
            )
         } 

         else {
             return (
                 <>
                    <div className="save__Card_Container">
                            <Card className="save__Card">
                        <div className="garden__Card__Header">
                            <Card.Header as="h5">
                            <div className="card__Header__Garden">
                                {props.plant.plant.common_name}               
                            </div>
                            </Card.Header>
                        </div>
                                <Card.Body>
                                <div className="image__Centering">
                                   <img className="plant__Specific__Image" src={require(`../images/${props.plant.plant.image}`)} alt={props.name} />             
                                </div>
                                
                                <Card.Title>
                                </Card.Title>
                                <Card.Text className="garden__Specific__Text">
                                {props.plant.userComments}
                                    
                                </Card.Text>
                                
                                <div className="add__Button__Container">
                                <Button variant="primary" onClick={ () => props[0].history.push("/mygarden")}>Take me to My Garden</Button>
                                </div>
                            </Card.Body>
                        </Card>
                    </div>
                 </>
             )
         }

    }
    return (
        <>
        {resultVerify()}
        </>
    )

}

export default SearchResultPlantCard