import { useEffect, useState } from 'react'
import Filter from './components/Filter'
import Notification from './components/Notification';
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personsService from './services/personsService';

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [number, setNumber] = useState('')
  const [currentId, setCurrentId] = useState(persons.length)
  const [delim, setDelim] = useState('')
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    personsService.getAll()
      .then(({ data }) => {
        setPersons(data);
        setCurrentId(data.length);
      })
      .catch(err => console.log(err))
  }, [])


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
      if (window.confirm(`${newName} is already added to phonebook. replace the old number with a new one?`)) {
        const index = persons.findIndex((p) => p.name === newName);
        persons[index].number = number;
        personsService.update(persons[index]);
        setPersons([...persons]);
      }
    } else {
      const newData = { id: currentId + 1, name: newName, number: number };
      setCurrentId(e => e + 1);
      personsService.create(newData).then((newData) => {
        console.log(newData);
        setPersons([...persons, newData])
        setSuccessMessage(`Added ${newName}`);
        setTimeout(() => {
          setSuccessMessage(null);
        }, 2000);
      }).catch(err => {
        console.log(err.response.data);
        setErrorMessage(err.response.data.message);
        setTimeout(() => {
          setErrorMessage(null);
        }, 4000);

      });

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

  /**
   * 
   * @param {Number} id 
   */
  const deletePerson = (id) => {
    const person = persons.find((p) => id === p.id);
    if (person && window.confirm(`Delete ${person.name} ?`)) {
      setPersons(persons.filter((p) => p.id !== id));
      personsService.delete(id)
        .then(({ data }) => console.log(`${data} deleted`))
        .catch(err => {
          setErrorMessage(`Information of ${person.name} has already been removed from server`);
          setTimeout(() => {
            setErrorMessage(null);
          }, 2000);
        });

    }
  }

  const personsToShow = delim.length === 0 ? persons : persons.filter((p) => p.name.toLowerCase().includes(delim.toLowerCase()));



  return (
    <div>
      <h2>Phonebook</h2>
      <Notification type="success" message={successMessage} />
      <Notification type="error" message={errorMessage} />
      <Filter handleChange={handleFilterChange} />
      <PersonForm handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} onSubmit={addPhonebook} name={newName} number={number} />
      <h2>Numbers</h2>
      <Persons persons={personsToShow} deletePerson={deletePerson} />
    </div>
  )
}

export default App