import React from 'react'

export default function PersonForm({ onSubmit, handleNameChange, handleNumberChange, name, number }) {
    return (
        <form onSubmit={onSubmit}>

            <h2>Add a new</h2>
            <div>
                name: <input onChange={handleNameChange} value={name} />
            </div>
            <div>
                number: <input onChange={handleNumberChange} value={number} />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}
