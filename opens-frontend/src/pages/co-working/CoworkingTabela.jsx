import React from "react";
import { Form, InputGroup, Table } from "react-bootstrap";

export const CoworkingTabela = () => {
  return (
    <>
      <div className="table-title">
        <div className="row my-2">
          <div className="col-md-4">
            <InputGroup className="mb-3">
              <Form.Control
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
              />
              <InputGroup.Text id="inputGroup-sizing-default">
                Default
              </InputGroup.Text>
            </InputGroup>
          </div>
          {/* <div className="col-md-4 center">
            <h4>Mesta događaja</h4>
          </div>
          <div className="col-md-4">
            <Button className="btn btn-success my-3" onClick={handleShow}>
              <BsFillPlusCircleFill className="me-2" size="20" /> Dodaj
            </Button>
          </div> */}
        </div>
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
            <td>OPENS - Coworking prostor</td>
            <td>12.11.2023</td>
            <td>13:12</td>
          </tr>
          <tr>
            <td>Jovana Jovanović</td>
            <td>OPENS - Coworking prostor</td>
            <td>15.11.2023</td>
            <td>10:02</td>
          </tr>
          <tr>
            <td>Petar Petrović</td>
            <td>OPENS - Coworking prostor</td>
            <td>22.11.2023</td>
            <td>16:52</td>
          </tr>
          <tr>
            <td>Luka Lukić</td>
            <td>OPENS - Coworking prostor</td>
            <td>22.11.2023</td>
            <td>18:02</td>
          </tr>
          <tr>
            <td>Stevan Stevanović</td>
            <td>OPENS - Coworking prostor</td>
            <td>25.11.2023</td>
            <td>13:00</td>
          </tr>
        </tbody>
      </Table>
    </>
  );
};
export default CoworkingTabela;
