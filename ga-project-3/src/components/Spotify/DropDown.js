import React from 'react'

export default function DropDown(props) {


    const dropdownChanged = (e) => {
        props.changed(e.target.value)
    }

    return (
        <div>
            {/* Arrays of generes and playlists are passed as options. Each array is mapped to create a selectable list.
                The method "dropdownChanged" is called when a selection is made.
                The selected value is equal item.id and then passed into the dropdownChanged method in above.
                genres's chenged runs a genreChanged method in SpotifyApp
                playlist's changed runs a playlistChanged method in SpotifyApp */}
            <select 
            value={props.selectedValue}
            onChange={dropdownChanged}>
                {props.options.map((item, idx) => <option key={idx + 1} value={item.id}>{item.name}</option>)}
            </select>
        </div>
    )
}
