const Person = ({ name, number, handleRemovePerson }) => (
  <div key={name}>
    {name} {number} <button onClick={handleRemovePerson}>delete</button>
  </div>
)

export default Person
