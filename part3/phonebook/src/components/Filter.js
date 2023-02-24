import React from 'react'

export default function Filter({ handleChange }) {
    return (
        <div>
            filter shown with <input type="search" onChange={handleChange} />
        </div>
    )
}
