import React from 'react';
const DatatableComponent = ({data}) => {
    const columns = data[0] && Object
    return (
       <table cellPadding={0} cellSpacing={0}>
           <thead>
           <tr>{data[0] && columns.map(heading => <th>{heading}</th>)}</tr>
           </thead>
           <tbody>

           </tbody>
       </table>
    );
};

export default DatatableComponent;