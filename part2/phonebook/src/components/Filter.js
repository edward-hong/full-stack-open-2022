const Filter = ({ query, handleChange }) => (
  <p>
    filter shown with <input value={query} onChange={handleChange} />
  </p>
)

export default Filter
