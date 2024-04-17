import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  ListGroup,
  Row,
  Tab,
} from "react-bootstrap";
import { BiGame, BiSolidJoystick } from "react-icons/bi";
import { FaHeadphones, FaLaptop } from "react-icons/fa";
import { FaComputerMouse } from "react-icons/fa6";
import httpCommon from "../../http-common";

export const OmladinskiKlubList = () => {
  const [trenutno, setTrenutno] = useState([]);
  const [tipoviOpreme, setTipoviOpreme] = useState([]);
  const [selectedTipOpreme, setSelectedTipOpreme] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const now = new Date();
  const datumPosete = now.toISOString().split("T")[0]; // Formats the date as "YYYY-MM-DD"

  useEffect(() => {
    // eslint-disable-next-line
    fetchTrenutno();
    fetchTipoviOpreme();
  }, []);

  const fetchTrenutno = async () => {
    const { data } = await httpCommon.get("/posete/2/datum-posete", {
      params: { datum: datumPosete },
    });
    setTrenutno(data);
  };

  const fetchTipoviOpreme = async () => {
    const { data } = await httpCommon.get("/tipoviOpreme");
    setTipoviOpreme(data);
  };

  const filteredTrenutno =
    trenutno.length > 0
      ? trenutno.filter((poseta) => {
          const searchQueryLowerCase = searchQuery.toLowerCase();
          const posetilacImeLowerCase = poseta.posetilac.ime.toLowerCase();
          const posetilacPrezimeLowerCase =
            poseta.posetilac.prezime.toLowerCase();
          return (
            (!selectedTipOpreme ||
              poseta.oprema.some(
                (o) => o.tipOpreme.naziv === selectedTipOpreme
              )) &&
            !poseta.vremeOdjave &&
            (posetilacImeLowerCase.includes(searchQueryLowerCase) ||
              posetilacPrezimeLowerCase.includes(searchQueryLowerCase))
          );
        })
      : [];

  return (
    <>
      <div>
        <Form.Control
          type="text"
          placeholder="Pretraga po imenu ili prezimenu"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="mb-4"
        />
      </div>
      <div className="row my-2">
        <div className="col-sm-8">
          <div className="row align-items-center mb-3">
            <div className="col-auto pe-0">
              <span>Prikaži</span>
            </div>
            <div className="col-auto">
              <Form.Select name="limit" style={{ width: "100%" }}>
                <option value="10">10</option>
                <option value="15">15</option>
                <option value="20">20</option>
              </Form.Select>
            </div>
            <div className="col-auto ps-0">
              <span>unosa</span>
            </div>
          </div>
        </div>
        <div className="col-sm-4">
          <div className="row align-items-center mb-3">
            <div className="col-auto pe-0">
              <span>Filtiranje prema: </span>
            </div>
            <div className="col">
              <Form.Select
                value={selectedTipOpreme}
                onChange={(e) => setSelectedTipOpreme(e.target.value)}
              >
                <option value="">sve</option>
                {tipoviOpreme.map((tip) => (
                  <option key={tip.id} value={tip.naziv}>
                    {tip.naziv}
                  </option>
                ))}
              </Form.Select>
            </div>
          </div>
        </div>
      </div>
      {trenutno.length === 0 ? (
        <Container
          className="d-flex justify-content-center align-items-center mt-2"
          style={{ height: "100v" }}
        >
          <Row>
            <Col>
              <h4>Trenutno nema nikoga u Omladinskom centru.</h4>
            </Col>
          </Row>
        </Container>
      ) : (
        <Tab.Container className="my-5">
          <Row>
            <Col sm={4}>
              <ListGroup>
                {filteredTrenutno.map((poseta) =>
                  poseta.oprema.length === 0 ? (
                    <ListGroup.Item action key={poseta.id} eventKey={poseta.id}>
                      {poseta.posetilac.ime} {poseta.posetilac.prezime}
                    </ListGroup.Item>
                  ) : (
                    <ListGroup.Item
                      action
                      key={poseta.id}
                      eventKey={poseta.id}
                      className="d-flex justify-content-between"
                    >
                      {poseta.posetilac.ime} {poseta.posetilac.prezime}{" "}
                      <span className="icon-container">
                        {poseta.oprema.map((o, index) => (
                          <span key={index}>
                            {o.tipOpreme.id === 1 ? (
                              <FaLaptop />
                            ) : o.tipOpreme.id === 2 ? (
                              <FaComputerMouse />
                            ) : o.tipOpreme.id === 3 ? (
                              <FaHeadphones />
                            ) : o.tipOpreme.id === 4 ? (
                              <BiSolidJoystick />
                            ) : o.tipOpreme.id === 5 ? (
                              <BiGame />
                            ) : (
                              <br />
                            )}
                          </span>
                        ))}
                      </span>
                    </ListGroup.Item>
                  )
                )}
              </ListGroup>
            </Col>
            <Col sm={8}>
              <Tab.Content>
                {filteredTrenutno.map((poseta) =>
                  poseta.oprema.length === 0 ? (
                    <Tab.Pane key={poseta.id} eventKey={poseta.id}>
                      <Card>
                        <Card.Body>
                          <h4>
                            {poseta.posetilac.ime} {poseta.posetilac.prezime}
                          </h4>
                          <hr />
                          <Row>
                            <h6>Datum i vreme posete:</h6>
                            <p className="text-muted">
                              {new Date(poseta.datumPosete).toLocaleDateString(
                                "sr-SR"
                              )}{" "}
                              u {poseta.vremePosete.substring(0, 5)}
                            </p>
                          </Row>
                          <Button className="btn-table mx-2">Odjavi</Button>
                        </Card.Body>
                      </Card>
                    </Tab.Pane>
                  ) : (
                    <Tab.Pane key={poseta.id} eventKey={poseta.id}>
                      <Card>
                        <Card.Body>
                          <h4>
                            {poseta.posetilac.ime} {poseta.posetilac.prezime}
                          </h4>
                          <hr />
                          <Row>
                            <h6>Datum i vreme posete:</h6>
                            <p className="text-muted">
                              {new Date(poseta.datumPosete).toLocaleDateString(
                                "sr-SR"
                              )}{" "}
                              u {poseta.vremePosete.substring(0, 5)}
                            </p>
                          </Row>
                          <Row>
                            <h6>Oprema:</h6>
                            {poseta.oprema.map((o, index) => (
                              <li className="text-muted" key={index}>
                                {o.tipOpreme?.naziv} (serijski broj:{" "}
                                {o.serijskiBroj})
                              </li>
                            ))}
                          </Row>
                          <Button className="btn-table mx-2">Odjavi</Button>
                          <Button className="btn-table mx-2">
                            Odjavi opremu
                          </Button>
                        </Card.Body>
                      </Card>
                    </Tab.Pane>
                  )
                )}
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      )}
    </>
  );
};
export default OmladinskiKlubList;
