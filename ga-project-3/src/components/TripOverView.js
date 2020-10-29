import React from 'react';

function TripOverView(props) {
    console.log(props.playlisttime)
    return (
        <div className="trip-totals-wrapper">
            {props.directionsReady && 
            <div className="trip-totals">
                <h3>Total Distance:</h3> 
                <p>{(props.overView[0].totalDistance/1000).toFixed(1)} km</p> 
                <h3>Total Time:</h3> 
                <p>{(props.overView[0].totalTime/3600).toFixed(1)} hrs </p>
                {props.playlisttime>0 ?
                    <div>
                        <h3>Playlist Time:</h3>
                        <p>{props.playlisttime} hrs</p>                    
                    </div>
                    :
                    null
                }
                <button onClick={props.startTrip} className="buttons">
                    <a href="#map">Start Trip</a>
                </button>
            </div>    
            }
        </div>
    )
}

export default TripOverView;