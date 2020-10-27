import React from 'react';

function Directions(props) {
    return(
        <div className="directions">
                    {props.directionsReady && 
                        props.routeInfo._selectedRoute.instructions.map((direction, id) => {
                            return (
                                <div className="leaflet-routing-alt" key={id}>
                                    <p>
                                        {direction.text} {direction.distance < 1000 ? 
                                        `${direction.distance} m` 
                                        : 
                                        `${Math.floor(direction.distance/1000)} km`}
                                    </p>
                                </div>
                            )
                        })
                    }
        </div>
    )
}


export default Directions;