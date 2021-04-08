import React from 'react'
const Datatable = ({ data }) => {
  const columns = data[0] && Object
  return (
    <table cellPadding={0} cellSpacing={0}>
      <thead>
        {/* eslint-disable-next-line react/jsx-key */}
        <tr>{data[0] && columns.map(heading => <th>{heading}</th>)}</tr>
      </thead>
      <tbody />
    </table>
  )
}

export default Datatable
