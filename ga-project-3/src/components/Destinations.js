import React from 'react';

const Destinations = (props) => {

    return(
        <aside>
            <form>
                <label for='start'>Enter Starting City:</label>
                <input type="text" placeholder="From" />
                <label for="destination">Enter Destination City:</label>
                <input type="text" placeholder="From" />
                <input type="submit" value="Take a trip?" />
            </form>
        </aside>

    )


}



export default Destinations;