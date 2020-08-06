import React from 'react'
import { Card, Button } from 'react-bootstrap'

const PlantCategoryCard = (props) => {

    return (
      <div className="plant__Card">
        <Card style={{ width: '16rem' }} className="plant__Card__Individual">
            <div className="plant__Card__Header">
            <Card.Header as="h5" style={{ height: '4rem' }}>{props.name}</Card.Header>
            </div>
             
                <Card.Body>
                {(props.showCategories)  ?                
                    <img className="plant__Category__Image" src={require(`../images/${props.category.category_image}`)} alt={props.name} />               
                  :
                    <img className="plant__Category__Image" src={require(`../images/${props.plant.image}`)} alt={props.plant.common_name} />   }            
                
                  <div className="category__Description__Container">  
                  {(props.showCategories)  ?                
                    props.category.category_description
                  :
                    props.plant.description
                    }                   
                    
                  </div> 
              
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