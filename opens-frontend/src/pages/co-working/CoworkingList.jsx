import React from "react";
import { Button, Card, Col, ListGroup, Row, Tab } from "react-bootstrap";

export const CoworkingList = () => {
  return (
    <>
      <div className="table-title">
        <div className="row mt-2 mb-3">
          <div className="col center">
            <h4>Co-working prostor</h4>
          </div>
        </div>
      </div>
      <Tab.Container className="my-5" defaultActiveKey="#link1">
        <Row>
          <Col sm={4}>
            <ListGroup>
              <ListGroup.Item action href="#link1">
                Mila Milić
              </ListGroup.Item>
              <ListGroup.Item action href="#link2">
                Petar Petrović
              </ListGroup.Item>
              <ListGroup.Item action href="#link3">
                Stevan Stevanović
              </ListGroup.Item>
              <ListGroup.Item action href="#link4">
                Jovana Jovanović
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col sm={8}>
            <Tab.Content>
              <Tab.Pane eventKey="#link1">
                <Card>
                  <Card.Body>
                    <h4>Mila Milić</h4>
                    <hr />
                    <Row>
                      <h6>Datum i vreme posete:</h6>
                      <p className="text-muted">27.11.2023. u 14:35h</p>
                    </Row>
                    <Row>
                      <h6>Oprema:</h6>
                      <p className="text-muted">
                        laptop + punjac (serijski broj: 12345)
                      </p>
                    </Row>
                    <Button className="btn-table mx-2">Odjavi</Button>
                    <Button className="btn-table mx-2">Odjavi opremu</Button>
                  </Card.Body>
                </Card>
              </Tab.Pane>
              <Tab.Pane eventKey="#link2">
                <Card>
                  <Card.Body>
                    <h4>Petar Petrović</h4>
                    <hr />
                    <Row>
                      <h6>Datum i vreme posete:</h6>
                      <p className="text-muted">27.11.2023. u 14:35h</p>
                    </Row>
                    <Button className="btn-table">Odjavi</Button>
                  </Card.Body>
                </Card>
              </Tab.Pane>
              <Tab.Pane eventKey="#link3">
                <Card>
                  <Card.Body>
                    <h4>Stevan Stevanović</h4>
                    <hr />
                    <Row>
                      <h6>Datum i vreme posete:</h6>
                      <p className="text-muted">27.11.2023. u 15:00h</p>
                    </Row>
                    <Row>
                      <h6>Oprema:</h6>
                      <p className="text-muted">
                        laptop + punjac (serijski broj: 69874)
                      </p>
                    </Row>
                    <Button className="btn-table mx-2">Odjavi</Button>
                    <Button className="btn-table mx-2">Odjavi opremu</Button>
                  </Card.Body>
                </Card>
              </Tab.Pane>
              <Tab.Pane eventKey="#link4">
                <Card>
                  <Card.Body>
                    <h4>Jovana Jovanović</h4>
                    <hr />
                    <Row>
                      <h6>Datum i vreme posete:</h6>
                      <p className="text-muted">27.11.2023. u 16:02h</p>
                    </Row>
                    <Row>
                      <h6>Oprema:</h6>
                      <p className="text-muted">
                        laptop + punjac (serijski broj: 14785)
                      </p>
                    </Row>
                    <Button className="btn-table mx-2">Odjavi</Button>
                    <Button className="btn-table mx-2">Odjavi opremu</Button>
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
export default CoworkingList;
