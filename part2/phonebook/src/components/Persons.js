import Person from './Person'

const Persons = ({ persons, query, handleRemovePerson }) => (
  <>
    {persons
      .filter(person => person.name.toLowerCase().includes(query))
      .map(({ name, number, id }) => (
        <Person
          key={id}
          name={name}
          number={number}
          handleRemovePerson={handleRemovePerson(id, name)}
        />
      ))}
  </>
)

export default Persons
