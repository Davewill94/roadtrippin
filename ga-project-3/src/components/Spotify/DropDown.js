import React from 'react'

export default function DropDown(props) {


    const dropdownChanged = (e) => {
        props.changed(e.target.value)
    }

    return (
        <div>
            <select 
            value={props.selectedValue}
            onChange={dropdownChanged}>
                {props.options.map((item, idx) => <option key={idx + 1} value={item.id}>{item.name}</option>)}
            </select>
        </div>
    )
}
