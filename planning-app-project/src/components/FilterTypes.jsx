import React from 'react'
import '../styles/components/filterTypes.scss'


function FilterTypes({ types, selectedTypes, setSelectedTypes }) {

    // Add or remove a type
    const toggleType = (typeId) => {
        setSelectedTypes((prevSelected) =>       // (setSelected Types updates the selectedTypes list with the new calculated list)
            prevSelected.includes(typeId)                   // If typeId is already in the list:
            ? prevSelected.filter((id) => id !== typeId)    // we remove it -> returns a new list by removing typeId from prevSelected
            : [...prevSelected, typeId]                     // else we add it (-> returns a new list by adding typeId at the end of prevSelected)
        )
    }

    return (
        <ul className='filterList'>
            {types.map((type) => (
                <li key={type.id}>
                    <input
                        type="checkbox"
                        id={`type-${type.id}`}
                        checked={selectedTypes.includes(type.id)}     // Check if the type box is selected
                        onChange={() => toggleType(type.id)}          // Calls toggleType when clicked
                    />
                    <label htmlFor={`type-${type.id}`}>{type.typeName}</label>
                </li>
            ))}
        </ul>
    )
}

export default FilterTypes
