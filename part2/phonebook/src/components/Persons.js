import React from 'react'

export default function Persons({ persons, deletePerson }) {
    return (
        <div>{persons.map((p, i) => {
            return (
                <p key={p.id}>{p.name} {p.number} <button key={p.id} onClick={() => deletePerson(p.id)}>delete</button></p>
            )
        })}</div>
    )
}
