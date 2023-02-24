import { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: "0711111111" }
  ])
  const [newName, setNewName] = useState('')
  const [number, setNumber] = useState('')
  const [delim, setDelim] = useState('')

  /**
   * 
   * @param {HTMLFormElement} event 
   */
  const addPhonebook = (event) => {
    event.preventDefault();
    let isAvaiable = false;
    for (let person of persons) {
      if (person.name === newName) {
        isAvaiable = true;
      }
    }
    if (isAvaiable) {
      alert(`${newName} is already added to phonebook`);
    } else {
      setPersons([...persons, { name: newName, number: number }])
    }
  }

  /**
   * 
   * @param {HTMLInputElement} event 
   */
  const handleNameChange = (event) => {
    setNewName(event.target.value);
    // console.log(event)
  }

  /**
   * 
   * @param {HTMLInputElement} event 
   */
  const handleNumberChange = (event) => {
    setNumber(event.target.value);
  }

  /**
   * 
   * @param {HTMLInputElement} event 
   */
  const handleFilterChange = (event) => {
    setDelim(event.target.value);
  }

  const personsToShow = delim.length === 0 ? persons : persons.filter((p) => p.name.toLowerCase().includes(delim.toLowerCase()));


  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleChange={handleFilterChange} />
      <PersonForm handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} onSubmit={addPhonebook} name={newName} number={number} />
      <h2>Numbers</h2>
      <Persons persons={personsToShow} />
    </div>
  )
}

export default App