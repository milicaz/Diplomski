import React, { useCallback, useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  ListGroup,
  Row,
  Tab,
  Toast,
} from "react-bootstrap";
import { BiGame, BiSolidJoystick } from "react-icons/bi";
import { FaHeadphones, FaLaptop } from "react-icons/fa";
import { FaComputerMouse } from "react-icons/fa6";
import httpCommon from "../../http-common";
import eventBus from "../../utils/eventBus";
import Pagination from "../Pagination";

export const OmladinskiCentarTrenutno = ({
  mestoPoseteId,
  mestoPoseteNaziv,
}) => {
  const [trenutno, setTrenutno] = useState([]);
  const [tipoviOpreme, setTipoviOpreme] = useState([]);
  const [selectedTipOpreme, setSelectedTipOpreme] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastVariant, setToastVariant] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(15);

  const fetchTrenutno = useCallback(async () => {
    try {
      const { data } = await httpCommon.get(
        `/posete/${mestoPoseteId}/datumPosete`
      );
      setTrenutno(data);
    } catch (error) {
      if (
        error.response &&
        (error.response.status === 401 || error.response.status === 400)
      ) {
        eventBus.dispatch("logout");
      } else {
        console.error(
          "Greška prilikom fetching trenutnih poseta za mesta posete: ",
          error
        );
      }
    }
  }, [setTrenutno, mestoPoseteId]);

  const fetchTipoviOpreme = useCallback(async () => {
    try {
      const { data } = await httpCommon.get("/tipoviOpreme");
      setTipoviOpreme(data);
    } catch (error) {
      if (
        error.response &&
        (error.response.status === 401 || error.response.status === 400)
      ) {
        eventBus.dispatch("logout");
      } else {
        console.error("Greška prilikom fetching tipova opreme: ", error);
      }
    }
  }, [setTipoviOpreme]);

  useEffect(() => {
    fetchTrenutno();
    fetchTipoviOpreme();
  }, []);

  const handleCheckOut = async (id) => {
    try {
      await httpCommon.put(`/posete/${id}/odjava`);
      fetchTrenutno();
      fetchTipoviOpreme();
    } catch (error) {
      if (
        error.response &&
        (error.response.status === 401 || error.response.status === 400)
      ) {
        eventBus.dispatch("logout");
      } else {
        console.error("Error:", error);
      }
    }
  };

  const handleCheckOutOpremu = async (id) => {
    try {
      await httpCommon.put(`/posete/${id}/oprema`);
      fetchTrenutno();
      fetchTipoviOpreme();
    } catch (error) {
      if (
        error.response &&
        (error.response.status === 401 || error.response.status === 400)
      ) {
        eventBus.dispatch("logout");
      } else {
        console.error("Error:", error);
      }
    }
  };

  const handleShowToast = (message, variant) => {
    setToastMessage(message);
    setToastVariant(variant);
    setShowToast(true);
  };

  const filteredTrenutno =
    trenutno.length > 0
      ? trenutno.filter((poseta) => {
          const searchQueryLowerCase = searchQuery.toLowerCase();
          const posetilacImeLowerCase = poseta.posetilac.ime.toLowerCase();
          const posetilacPrezimeLowerCase =
            poseta.posetilac.prezime.toLowerCase();

          const isVremeOdjavePopulated = poseta.vremeOdjave != null;
          return (
            (!selectedTipOpreme ||
              poseta.oprema.some(
                (o) => o.tipOpreme.naziv === selectedTipOpreme
              )) &&
            !isVremeOdjavePopulated &&
            (posetilacImeLowerCase.includes(searchQueryLowerCase) ||
              posetilacPrezimeLowerCase.includes(searchQueryLowerCase))
          );
        })
      : [];

  const allHaveVremeOdjave = filteredTrenutno.every(
    (poseta) => poseta.vremeOdjave != null
  );

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

  const modifyNaziv = (nazivMesta) => {
    if (nazivMesta === "Coworking prostor") {
      return "Coworking prostoru";
    } else if (nazivMesta === "Omladinski klub") {
      return "Omladinskom klubu";
    }
    return nazivMesta;
  };
  return (
    <>
      <div className="my-4">
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
      {trenutno.length === 0 || allHaveVremeOdjave ? (
        <Container
          className="d-flex justify-content-center align-items-center mt-3"
          style={{ height: "100v" }}
        >
          <Row>
            <Col>
              <h4>Trenutno nema nikoga u {modifyNaziv(mestoPoseteNaziv)}.</h4>
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
                              handleShowToast(
                                "Uspešno ste odjavili posetioca!",
                                "success"
                              );
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
                            onClick={() =>
                              handleShowToast(
                                "Prvo morate odjaviti opremu!",
                                "danger"
                              )
                            }
                          >
                            Odjavi
                          </Button>
                          <Button
                            className="btn-table mx-2"
                            onClick={() => {
                              handleCheckOutOpremu(poseta.id);
                              handleShowToast(
                                "Uspešno ste odjavili opremu!",
                                "success"
                              );
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
              <Toast
                show={showToast}
                onClose={() => setShowToast(false)}
                style={{
                  position: "fixed",
                  bottom: 20,
                  left: 20,
                  minWidth: 300,
                  backgroundColor:
                    toastVariant === "success" ? "#a3c57b" : "#f56f66",
                  color: "white",
                }}
                delay={3000}
                autohide
              >
                <Toast.Header>
                  <strong className="me-auto">
                    {toastVariant === "success" ? "" : "Greška"}
                  </strong>
                </Toast.Header>
                <Toast.Body>{toastMessage}</Toast.Body>
              </Toast>
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
export default OmladinskiCentarTrenutno;
