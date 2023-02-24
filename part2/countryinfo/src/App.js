import React, { useEffect, useState } from 'react';
import Countries from './components/Countries';
import countryService from './services/countryService';

function App() {

  const [countries, setCountries] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    countryService.getAll()
      .then(({ data }) => {
        setCountries(data);
      })
      .catch(err => console.log(err));
  }, []);

  /**
   * 
   * @param {HTMLInputElement} event 
   */
  const handleSearchValueChange = (event) => {
    setSearchValue(event.target.value);
  }

  return (
    <div >
      find countries <input onChange={handleSearchValueChange} />
      <Countries searchValue={searchValue} countries={countries} />

    </div>
  );
}

export default App;
