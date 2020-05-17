import React from 'react'

const Filter = ({newFilter, handleFilterChange}) => {
  return (
    <div>
    filter: <input value={newFilter} onChange={handleFilterChange} />
    <hr />
  </div>
  )
}

export default Filter
