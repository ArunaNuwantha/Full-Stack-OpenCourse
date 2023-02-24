import React from 'react'

export default function Persons({ persons }) {
    return (
        <div>{persons.map((p, i) => {
            return (
                <p key={i}>{p.name} {p.number}</p>
            )
        })}</div>
    )
}
