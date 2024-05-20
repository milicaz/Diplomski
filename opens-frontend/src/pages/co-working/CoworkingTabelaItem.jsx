import React from "react";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem,
  Col,
  Container,
  Nav,
  Row,
  Tab,
  Table,
} from "react-bootstrap";
import { FaBuildingCircleArrowRight, FaClock } from "react-icons/fa6";

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

  return (
    <>
      <Accordion>
        <AccordionItem
          key={posetilac.posetilacId}
          eventKey={posetilac.posetilacId}
        >
          <AccordionHeader>
            <Container>
              <Row>
                <Col>
                  <b>
                    {posetilac.ime} {posetilac.prezime}{" "}
                  </b>{" "}
                  (<i>godine: {posetilac.godine}</i>)
                </Col>
                <Col className="text-end mx-2">
                  <FaBuildingCircleArrowRight />{" "}
                  <i className="me-2">{posetilac.totalPosete}</i>
                  <FaClock /> <i>{posetilac.totalnoProvedenoVreme}</i>
                </Col>
              </Row>
            </Container>
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
                              <th></th>
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
                              <td>Broj poseta u mesecu</td>
                              {visit.posetePoMesecima.map(
                                (monthVisit, index) => (
                                  <td key={index}>
                                    {monthVisit.mesecniBrojPoseta}
                                  </td>
                                )
                              )}
                            </tr>
                            <tr>
                              <td>Mesečno provedeno vreme:</td>
                              {visit.posetePoMesecima.map(
                                (monthVisit, index) => (
                                  <td key={index}>
                                    {monthVisit.mesecnoProvedenoVreme}
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
                            <tr>
                              <th colSpan={12}>
                                Ukupno provedeno vreme za {visit.godinaPosete}.
                                godinu: {visit.godisnjeProvedenoVreme}
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
