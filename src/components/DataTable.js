import React from 'react';
import { Container } from 'semantic-ui-react';
import { Table } from 'semantic-ui-react';

const DataTable = (props) => {
    const {data} = props;
    let rowsArray = [];
    for(let key in data) {
      rowsArray.push(data[key]);
    }
    return (
      <Container>
        <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>datetime</Table.HeaderCell>
                <Table.HeaderCell>open</Table.HeaderCell>
                <Table.HeaderCell>close</Table.HeaderCell>
                <Table.HeaderCell>low</Table.HeaderCell>
                <Table.HeaderCell>high</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {rowsArray.map((singleRowData, index) => {
                return (
                  <Table.Row key={index}>
                    <Table.Cell>{singleRowData.date}</Table.Cell>
                    <Table.Cell>{singleRowData.open}</Table.Cell>
                    <Table.Cell>{singleRowData.close}</Table.Cell>
                    <Table.Cell>{singleRowData.low}</Table.Cell>
                    <Table.Cell>{singleRowData.high}</Table.Cell>
                  </Table.Row>
                )
              })}
            </Table.Body>
          </Table>
      </Container>
)}

export default DataTable;