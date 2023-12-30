import React from "react";
import { Button, Card, Col, ListGroup, Row, Tab } from "react-bootstrap";

export const OmladinskiKlubList = () => {
  return (
    <>
      <div className="table-title">
        <div className="row mt-2 mb-3">
          <div className="col center">
            <h4>Omladinski klub</h4>
          </div>
        </div>
      </div>
      <Tab.Container className="my-5" defaultActiveKey="#link1">
        <Row>
          <Col sm={4}>
            <ListGroup>
              <ListGroup.Item action href="#link1">
                Ana Antić
              </ListGroup.Item>
              <ListGroup.Item action href="#link2">
                Bojan Bojić
              </ListGroup.Item>
              <ListGroup.Item action href="#link3">
                Vladimir Vladić
              </ListGroup.Item>
              <ListGroup.Item action href="#link4">
                Gorana Gorić
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col sm={8}>
            <Tab.Content>
              <Tab.Pane eventKey="#link1">
                <Card>
                  <Card.Body>
                    <h4>Ana Antić</h4>
                    <hr />
                    <Row>
                      <h6>Datum i vreme posete:</h6>
                      <p className="text-muted">27.11.2023. u 10:35h</p>
                    </Row>
                    <Row>
                      <h6>Oprema:</h6>
                      <li className="text-muted">
                        džojstik (serijski broj: 12345)
                      </li>
                      <li className="text-muted">
                        igrice (serijski broj: 12345)
                      </li>
                    </Row>
                    <Button className="btn-table mx-2">Odjavi</Button>
                    <Button className="btn-table mx-2">Odjavi opremu</Button>
                  </Card.Body>
                </Card>
              </Tab.Pane>
              <Tab.Pane eventKey="#link2">
                <Card>
                  <Card.Body>
                    <h4>Bojan Bojić</h4>
                    <hr />
                    <Row>
                      <h6>Datum i vreme posete:</h6>
                      <p className="text-muted">27.11.2023. u 10:35h</p>
                    </Row>
                    <Row>
                      <h6>Oprema:</h6>
                      <li className="text-muted">
                        džojstik (serijski broj: 56789)
                      </li>
                    </Row>
                    <Button className="btn-table">Odjavi</Button>
                  </Card.Body>
                </Card>
              </Tab.Pane>
              <Tab.Pane eventKey="#link3">
                <Card>
                  <Card.Body>
                    <h4>Vladimir Vladić</h4>
                    <hr />
                    <Row>
                      <h6>Datum i vreme posete:</h6>
                      <p className="text-muted">27.11.2023. u 10:45h</p>
                    </Row>
                    <Button className="btn-table mx-2">Odjavi</Button>
                  </Card.Body>
                </Card>
              </Tab.Pane>
              <Tab.Pane eventKey="#link4">
                <Card>
                  <Card.Body>
                    <h4>Gorana Gorić</h4>
                    <hr />
                    <Row>
                      <h6>Datum i vreme posete:</h6>
                      <p className="text-muted">27.11.2023. u 10:45h</p>
                    </Row>
                    <Button className="btn-table mx-2">Odjavi</Button>
                  </Card.Body>
                </Card>
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </>
  );
};
export default OmladinskiKlubList;
