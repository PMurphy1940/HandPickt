import React from 'react'


const SearchResultPlantCard = (props) => {



    return (
        <>

                <img className="plant__Specific__Image" src={require(`../images/beans.png`)} alt="HandPickt Logo" />               
                <p>{props.plant.common_name}</p>
        </>
    )
}

export default SearchResultPlantCard