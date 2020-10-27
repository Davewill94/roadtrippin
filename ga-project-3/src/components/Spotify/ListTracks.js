import React from 'react';

export default function ListTracks(props) {

    const clicked = e => {
        e.preventDefault();
        props.clicked(e.target.id);
    }    

    return (
        <div>
            <div>
                {props.items.map((item, idx) => 
                    <button key={idx}
                        onClick={clicked}
                        id={item.track.id}>{item.track.name}
                    </button>)}
            </div>
        </div>
    );
}
