import React, { useState } from 'react'
import CountryDetails from './CountryDetails';


export default function Countries({ countries, searchValue }) {
    const countriesToShow = countries.filter((c) => c.name.common.toLowerCase().includes(searchValue.toLowerCase()));
    const cLength = countriesToShow.length;
    console.log(countriesToShow);
    const [showDetails, setShowDetails] = useState(Array(cLength).fill(false));

    const handleShowCountry = (event, id) => {
        showDetails[id] = !showDetails[id];
        setShowDetails([...showDetails])
    }

    if (cLength > 10) {
        return (
            <div>
                Too many matches, specify another filter
            </div>)
    }
    else if (cLength === 0) {
        return;
    }

    else if (cLength > 1 && cLength <= 10) {
        return (
            <div>
                {countriesToShow.map((c, i) => {
                    return (
                        <div key={i}>
                            <div>{c.name.common} <button onClick={(e) => handleShowCountry(e, i)}>{showDetails[i] ? "hide" : "show"}</button></div>
                            {showDetails[i] && <CountryDetails key={i} country={c} />}
                        </div>
                    )
                })}
            </div>);
    }

    else if (cLength === 1) {
        const country = countriesToShow[0];
        return (
            <CountryDetails country={country} />
        )
    }


}
