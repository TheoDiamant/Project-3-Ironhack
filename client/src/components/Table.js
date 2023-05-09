import React from 'react'

const Table = ({ products }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Title</th>
          <th>Description</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>
      {products?.map((item) => (
  <tr key={item.id}>
    <td>{item.title}</td>
    <td>{item.description}</td>
    <td>{item.price}</td>
  </tr>
))}
      </tbody>
    </table>
  )
}

export default Table