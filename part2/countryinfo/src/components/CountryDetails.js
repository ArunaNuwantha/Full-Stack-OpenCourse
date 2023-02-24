import React from 'react'

export default function CountryDetails({ country }) {
    return (
        <div>
            <h2>{country.name.common}</h2>
            <div>
                <p>capital {country.capital[0]}</p>
                <p>area {country.area}</p>
            </div>
            <div>
                <b>Languages:</b>
                <ul>
                    {Object.values(country.languages).map((l, i) => <li key={i}>{l}</li>)}
                </ul>
            </div>
            <div>
                <img alt={country.flags.alt} src={country.flags.png} loading="lazy" />
            </div>
        </div>
    )
}
