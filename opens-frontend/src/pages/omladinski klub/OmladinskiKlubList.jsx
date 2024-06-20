import React, { useCallback, useEffect, useState } from "react";
import {
  Alert,
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
import Pagination from "../Pagination";

export const OmladinskiKlubList = () => {
  const [trenutno, setTrenutno] = useState([]);
  const [tipoviOpreme, setTipoviOpreme] = useState([]);
  const [selectedTipOpreme, setSelectedTipOpreme] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [show, setShow] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(15);

  const now = new Date();
  const datumPosete = now.toISOString().split("T")[0]; // Formats the date as "YYYY-MM-DD"

  const fetchTrenutno = useCallback(async () => {
    const { data } = await httpCommon.get("/posete/2/datum-posete", {
      params: { datum: datumPosete },
    });
    setTrenutno(data);
  }, [setTrenutno, datumPosete]);

  const fetchTipoviOpreme = useCallback(async () => {
    const { data } = await httpCommon.get("/tipoviOpreme");
    setTipoviOpreme(data);
  }, [setTipoviOpreme]);

  useEffect(() => {
    fetchTrenutno();
    fetchTipoviOpreme();
  }, [fetchTrenutno, fetchTipoviOpreme]);

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

  const indexOfLastItem = currentPage * limit;
  const indexOfFirstitem = indexOfLastItem - limit;
  const currentItems = filteredTrenutno.slice(
    indexOfFirstitem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredTrenutno.length / limit);

  const onInputChange = (e) => {
    setLimit(e.target.value);
  };

  const shouldShowPagination =
    searchQuery.trim() === "" && filteredTrenutno.length >= 10;

  // Reset current page to 1 kad je search obrisan
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setCurrentPage(1);
    }
  }, [searchQuery]);

  const handleCheckOut = async (id) => {
    try {
      await httpCommon.put(`/posete/${id}/odjava`);
      fetchTrenutno();
      fetchTipoviOpreme();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleCheckOutOpremu = async (id) => {
    try {
      await httpCommon.put(`/posete/${id}/oprema`);
      fetchTrenutno();
      fetchTipoviOpreme();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  if (show) {
    return (
      <Alert variant="danger" onClose={() => setShow(false)} dismissible>
        <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
        <p>Prvo morate odjaviti opremu!</p>
      </Alert>
    );
  }

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
          {filteredTrenutno && shouldShowPagination && (
            <div className="row align-items-center mb-3">
              <div className="col-auto pe-0">
                <span>Prikaži</span>
              </div>
              <div className="col-auto">
                <Form.Select
                  name="limit"
                  value={limit}
                  onChange={(e) => onInputChange(e)}
                  style={{ width: "100%" }}
                >
                  <option value="15">15</option>
                  <option value="20">20</option>
                  <option value="25">25</option>
                </Form.Select>
              </div>
              <div className="col-auto ps-0">
                <span>unosa</span>
              </div>
            </div>
          )}
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
                {currentItems.map((poseta) =>
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
                {currentItems.map((poseta) =>
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
                          <Button
                            className="btn-table mx-2"
                            onClick={() => {
                              handleCheckOut(poseta.id);
                            }}
                          >
                            Odjavi
                          </Button>
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
                          <Button
                            className="btn-table mx-2"
                            onClick={() => setShow(true)}
                          >
                            Odjavi
                          </Button>
                          <Button
                            className="btn-table mx-2"
                            onClick={() => {
                              handleCheckOutOpremu(poseta.id);
                            }}
                          >
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
          {trenutno && shouldShowPagination && (
            <Pagination
              pages={totalPages}
              setCurrentPage={setCurrentPage}
              array={filteredTrenutno}
              limit={limit}
              maxVisibleButtons={3}
            />
          )}
        </Tab.Container>
      )}
    </>
  );
};
export default OmladinskiKlubList;
