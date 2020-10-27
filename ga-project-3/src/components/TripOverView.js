import React from 'react';

function TripOverView(props) {

    return (
        <div >
            {props.directionsReady && 
                <p>{(props.overView[0].totalDistance/1000).toFixed(1)} km : {(props.overView[0].totalTime/3600).toFixed(1)} hr </p>
            }
        </div>
    )
}

export default TripOverView;