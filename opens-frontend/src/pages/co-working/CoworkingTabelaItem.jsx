import React from "react";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem,
  Col,
  Nav,
  Row,
  Tab,
  Table,
} from "react-bootstrap";

export const CoworkingTabelaItem = ({ posetilac }) => {
  const monthNames = [
    "Januar",
    "Februar",
    "Mart",
    "April",
    "Maj",
    "Jun",
    "Jul",
    "Avgust",
    "Septembar",
    "Oktobar",
    "Novembar",
    "Decembar",
  ];

  // Izračunava celokupan broj poseta
  const totalPoseta = posetilac.posete.reduce(
    (total, visit) => total + visit.godisnjiBrojPoseta,
    0
  );
  return (
    <>
      <Accordion>
        <AccordionItem
          key={posetilac.posetilacId}
          eventKey={posetilac.posetilacId}
        >
          <AccordionHeader>
            <strong>
              {" "}
              {posetilac.ime} {posetilac.prezime}
            </strong>{" "}
            (<i> godine: {posetilac.godine}</i>) - Ukupno poseta: {totalPoseta}
          </AccordionHeader>
          <AccordionBody>
            <Tab.Container defaultActiveKey="0">
              <Row>
                <Col sm={1}>
                  <Nav variant="pills" className="flex-column">
                    {posetilac.posete.map((visit, visitIndex) => (
                      <Nav.Item key={visitIndex}>
                        <Nav.Link eventKey={visitIndex}>
                          {visit.godinaPosete}
                        </Nav.Link>
                      </Nav.Item>
                    ))}
                  </Nav>
                </Col>
                <Col sm={11}>
                  <Tab.Content className="mx-5">
                    {posetilac.posete.map((visit, visitIndex) => (
                      <Tab.Pane key={visitIndex} eventKey={visitIndex}>
                        <Table size="sm" className="tabela-izvestaj">
                          <thead>
                            <tr>
                              {visit.posetePoMesecima.map(
                                (monthVisit, index) => (
                                  <th key={index}>
                                    {monthNames[monthVisit.mesecPosete - 1]}
                                  </th>
                                )
                              )}
                            </tr>
                          </thead>
                          <tbody className="table-group-divider">
                            <tr>
                              {visit.posetePoMesecima.map(
                                (monthVisit, index) => (
                                  <td key={index}>
                                    {monthVisit.mesecniBrojPoseta}
                                  </td>
                                )
                              )}
                            </tr>
                          </tbody>
                          <tfoot className="table-primary">
                            <tr>
                              <th colSpan={12}>
                                Ukupno poseta za {visit.godinaPosete}. godinu:{" "}
                                {visit.godisnjiBrojPoseta}
                              </th>
                            </tr>
                          </tfoot>
                        </Table>
                      </Tab.Pane>
                    ))}
                  </Tab.Content>
                </Col>
              </Row>
            </Tab.Container>
          </AccordionBody>
        </AccordionItem>
      </Accordion>
    </>
  );
};
export default CoworkingTabelaItem;
