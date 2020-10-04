import React from 'react';
import {Container} from 'semantic-ui-react';
import { Table } from 'semantic-ui-react';

const DataStatistics = (props) => {
    const {data} = props;

    return (
      <Container >
        <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>min close</Table.HeaderCell>
                <Table.HeaderCell>max close</Table.HeaderCell>
                <Table.HeaderCell>mean close</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
                <Table.Row>
                    <Table.Cell>{data.min}</Table.Cell>
                    <Table.Cell>{data.max}</Table.Cell>
                    <Table.Cell>{data.avg}</Table.Cell>
                </Table.Row>
            </Table.Body>
          </Table>
      </Container>
)}

export default DataStatistics;