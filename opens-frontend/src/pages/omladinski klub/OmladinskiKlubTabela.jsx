import React from "react";
import { Col, Form, FormLabel, Row, Table } from "react-bootstrap";

export const OmladinskiKlubTabela = () => {
  return (
    <>
      <div className="table-title">
        <div className="row mt-2 mb-3">
          <div className="col center">
            <h4>Tabela prisutnosti - Omladinski klub</h4>
          </div>
        </div>
      </div>
      <div className="table-title">
        <Row className="my-3">
          <Form.Group as={Col}>
            <FormLabel>Od</FormLabel>
            <Form.Control type="date" />
          </Form.Group>
          <Form.Group as={Col}>
            <FormLabel>Do</FormLabel>
            <Form.Control type="date" />
          </Form.Group>
        </Row>
      </div>
      <Table hover>
        <thead>
          <tr>
            <th>Posetilac</th>
            <th>Mesto posete</th>
            <th>Datum posete</th>
            <th>Vreme posete</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Mila Milić</td>
            <td>OPENS - Omladinski klub</td>
            <td>12.10.2023</td>
            <td>10:12</td>
          </tr>
          <tr>
            <td>Jovana Jovanović</td>
            <td>OPENS - Omladinski klub</td>
            <td>15.10.2023</td>
            <td>10:02</td>
          </tr>
          <tr>
            <td>Petar Petrović</td>
            <td>OPENS - Omladinski klub</td>
            <td>22.10.2023</td>
            <td>13:52</td>
          </tr>
          <tr>
            <td>Luka Lukić</td>
            <td>OPENS - Omladinski klub</td>
            <td>22.10.2023</td>
            <td>16:02</td>
          </tr>
          <tr>
            <td>Stevan Stevanović</td>
            <td>OPENS - Omladinski klub</td>
            <td>25.10.2023</td>
            <td>13:00</td>
          </tr>
        </tbody>
      </Table>
    </>
  );
};
export default OmladinskiKlubTabela;
