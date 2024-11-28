import React, { useContext, useEffect, useState } from "react";
import { Button, Col, Form, Image, Modal, Row } from "react-bootstrap";
import { FaRegFilePdf } from "react-icons/fa";
import { FaSquarePlus } from "react-icons/fa6";
import { MdDelete, MdEdit } from "react-icons/md";
import { RiFileExcel2Fill } from "react-icons/ri";
import { useLocation, useNavigate } from "react-router-dom";
import { httpProtected } from "../../../apis/http";
import Pagination from "../../Pagination";
import { DogadjajContext } from "../DogadjajContext";
import DeleteUcesnikForm from "./DeleteUcesnikForm";
import EditUcesnikForm from "./EditUcesnikFrom";

const DogadjajUcesniciForm = ({ currentDogadjaj }) => {
  const { getUcesnici } = useContext(DogadjajContext);
  const { kreirajExcelUcesnici } = useContext(DogadjajContext);
  const { kreirajPdfUcesnici } = useContext(DogadjajContext);
  const { dodajUcesnika } = useContext(DogadjajContext);
  const { deleteUcesnik } = useContext(DogadjajContext);
  const { editUcesnik } = useContext(DogadjajContext);

  const navigate = useNavigate();
  const location = useLocation();

  const [ucesnici, setUcesnici] = useState([]);

  const [currentUcesnik, setCurrentUcesnik] = useState(null);

  const id = currentDogadjaj.id;

  const naziv = currentDogadjaj.naziv;

  const [limit, setLimit] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const [logos, setLogos] = useState([]);

  const [ucesnik, setUcesnik] = useState({
    ime: "",
    prezime: "",
    rod: "",
    godine: "",
    mestoBoravista: "",
    brojTelefona: "",
    email: "",
    organizacija: "",
  });

  const r = [
    { id: 1, naziv: "ZENSKO" },
    { id: 2, naziv: "MUSKO" },
    { id: 3, naziv: "DRUGO" },
  ];

  const rodMapping = {
    MUSKO: "muško",
    ZENSKO: "žensko",
    DRUGO: "drugo",
  };

  const handleChangeUcesnik = (event) => {
    const { name, value } = event.target;
    setUcesnik({ ...ucesnik, [name]: value });
  };

  const [showHeader, setShowHeader] = useState(false);
  const [showFooter, setShowFooter] = useState(false);

  const handleShowHeader = () => setShowHeader(true);
  const handleCloseHeader = () => setShowHeader(false);

  const handleShowFooter = () => setShowFooter(true);
  const handleCloseFooter = () => setShowFooter(false);

  const [showUcesnik, setShowUcesnik] = useState(false);

  const handleShowUcesnik = () => setShowUcesnik(true);
  const handleCloseUcesnik = () => setShowUcesnik(false);

  const [showDelete, setShowDelete] = useState(false);
  const handleShowDelete = (ucesnikToDelete) => {
    setUcesnik(ucesnikToDelete); // Set the participant to be deleted
    setShowDelete(true); // Show the delete modal
  };
  const handleCloseDelete = () => setShowDelete(false);

  const [showEdit, setShowEdit] = useState(false);
  const handleShowEdit = (ucesnik) => {
    console.log("Id je: " + ucesnik.id); // Log `ucesnik` directly here
    console.log("Current ucesnik je: ", ucesnik); // Log `ucesnik` directly here

    setCurrentUcesnik(ucesnik); // Set the participant data you want to edit
    setShowEdit(true);
  };

  const handleCloseEdit = () => {
    setShowEdit(false);
    setCurrentUcesnik(null);
  };

  const [headerImageId, setHeaderImageId] = useState(null);
  const [footerImageId, setFooterImageId] = useState(null);

  const handleSelectHeader = (logoId) => {
    setHeaderImageId(logoId);
  };

  const handleSelectFooter = (logoId) => {
    setFooterImageId(logoId);
  };

  useEffect(() => {
    const fetchUcesnici = async () => {
      const fetchedUcesnici = await getUcesnici(id);
      setUcesnici(fetchedUcesnici); // Set the participants data after it's fetched
      let isMounted = true;
      const controller = new AbortController();

      const fetchData = async () => {
        try {
          const requests = [
            httpProtected.get("/logoi", { signal: controller.signal }),
          ];
          const [logoiData] = await Promise.all(requests);

          if (isMounted) {
            setLogos(logoiData.data);
          }
        } catch (error) {
          if (error.name !== "CanceledError") {
            console.error("Greška prilikom fetching podataka: ", error);
            navigate("/logovanje", {
              state: { from: location },
              replace: true,
            });
          }
        }
      };

      fetchData();

      return () => {
        isMounted = false;
        controller.abort();
      };
    };

    fetchUcesnici(); // Call the async function

    if (!showEdit) {
      console.log("Modal closed, Ucesnici updated:", ucesnici);
    }
  }, [id, showEdit]);

  const handleDodajUcesnika = (event) => {
    event.preventDefault();
    dodajUcesnika(ucesnik, currentDogadjaj.id);

    // Update the `ucesnici` state manually by adding the new participant
    setUcesnici((prevUcesnici) => [
      ...prevUcesnici,
      { ...ucesnik, id: prevUcesnici.length + 1 }, // Add a new id for the added participant (or get it from the response)
    ]);

    setUcesnik({
      ime: "",
      prezime: "",
      rod: "",
      godine: "",
      mestoBoravista: "",
      brojTelefona: "",
      email: "",
      organizacija: "",
    });

    // fetchUcesnici();
  };

  //   const handleUcesnikEdit = async () => {
  //     try {
  //         // Update the local state after edit
  //         setUcesnici((prevUcesnici) =>
  //             prevUcesnici.map((participant) =>
  //                 participant.id === currentUcesnik.id ? currentUcesnik : participant
  //             )
  //         );

  //         // Close the modal after editing
  //         setShowEdit(false);
  //     } catch (error) {
  //         console.error("Error updating participant: ", error);
  //     }
  // };

  const handleUcesnikEdit = async () => {
    try {
      console.log("Current participant before update:", currentUcesnik);

      // Update the local state after edit
      setUcesnici((prevUcesnici) =>
        prevUcesnici.map((participant) =>
          participant.id === currentUcesnik.id ? currentUcesnik : participant
        )
      );

      // Ensure the modal closes after the update
      setShowEdit(false); // You may need to handle async issues here
    } catch (error) {
      console.error("Error updating participant: ", error);
    }
  };

  // Handle the change in the limit select dropdown
  const onInputChange = (e) => {
    setLimit(e.target.value);
  };

  // Handle pagination (this could be implemented to fetch more participants)
  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  const handleExcel = (event) => {
    event.preventDefault();
    const response = kreirajExcelUcesnici(id, headerImageId, footerImageId);
  };

  const halfLength = Math.ceil(logos.length / 2);
  const firstHalf = logos.slice(0, halfLength);
  const secondHalf = logos.slice(halfLength);

  const handleNext = (e) => {
    e.preventDefault();
    handleCloseHeader();
    handleShowFooter();
  };

  const handleChoose = (event) => {
    event.preventDefault(); // Call preventDefault on the current event

    handleCloseFooter();

    // Pass the event object to handlePDF
    handlePDF(event);
  };

  const handlePDF = (event) => {
    event.preventDefault(); // Call preventDefault on the event

    // // Ensure valid inputs
    // if (!mesec || !godina || !vrsta || !ime || !prezime) {
    //   console.error("Please fill all required fields.");
    //   return;
    // }

    // Call kreirajPDF with validated parameters
    kreirajPdfUcesnici(id, headerImageId, footerImageId);
  };

  const handleUcesnikDelete = async () => {
    try {
      // First, delete the participant using the provided API method.
      await deleteUcesnik(ucesnik.id);

      // Now, remove the deleted participant from the local state
      setUcesnici((prevUcesnici) =>
        prevUcesnici.filter((participant) => participant.id !== ucesnik.id)
      );

      // Close the delete modal
      handleCloseDelete();
    } catch (error) {
      console.error("Error deleting participant: ", error);
    }
  };

  return (
    <div>
      <Row className="mb-4 align-items-end">
        <Col md={6}>
          <Row>
            <Col className="d-flex align-items-center">
              <Button
                className="mx-1"
                variant="danger"
                onClick={handleShowHeader}
              >
                <FaRegFilePdf size={20} /> PDF
              </Button>
              <Button className="mx-1" variant="success" onClick={handleExcel}>
                <RiFileExcel2Fill size={20} /> EXCEL
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
      <div className="table-title">
        <div className="row d-flex align-items-center mb-3">
          {/* Left aligned: Limit dropdown */}
          <div className="col-sm-6">
            <div className="row align-items-center">
              <div className="col-auto pe-0">
                <span>Prikaži</span>
              </div>
              <div className="col-auto">
                <Form.Select
                  name="limit"
                  value={limit}
                  onChange={onInputChange}
                  style={{ width: "100%" }}
                >
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

          {/* Right aligned: Učesnici događaja text */}
          <div className="col-sm-6 d-flex justify-content-end">
            <Button onClick={handleShowUcesnik} className="btn btn-success">
              <FaSquarePlus size={20} className="mx-1" />
              Dodaj novog učesnika
            </Button>
          </div>
        </div>
      </div>

      <div>
        <table className="image-table">
          <thead>
            <tr>
              <th>Redni broj</th>
              <th>Ime</th>
              <th>Prezime</th>
              <th>Godine</th>
              <th>Telefon</th>
              <th>Email</th>
              <th>Akcije</th>
            </tr>
          </thead>
          <tbody>
            {ucesnici
              .slice((currentPage - 1) * limit, currentPage * limit)
              .map((ucesnik, index) => (
                <tr key={ucesnik.id}>
                  <td>{(currentPage - 1) * limit + index + 1}</td>
                  <td>{ucesnik.ime}</td>
                  <td>{ucesnik.prezime}</td>
                  <td>{ucesnik.godine}</td>
                  <td>{ucesnik.brojTelefona}</td>
                  <td>{ucesnik.email}</td>
                  <td>
                    {/* <div className="button-row" title="Izmena"> */}
                    <button
                      className="btn text-warning btn-act"
                      title="Izmena"
                      onClick={() => handleShowEdit(ucesnik)}
                    >
                      <MdEdit />
                    </button>
                    <button
                      className="btn text-danger btn-act"
                      title="Brisanje"
                      onClick={() => handleShowDelete(ucesnik)} // Pass the selected ucesnik to delete
                    >
                      <MdDelete />
                    </button>
                    {/* </div> */}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <Pagination
        pages={Math.ceil(ucesnici.length / limit)} // Calculate number of pages
        setCurrentPage={onPageChange}
        array={ucesnici}
        limit={limit}
        maxVisibleButtons={3}
      />

      <Modal show={showHeader} onHide={handleCloseHeader} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Izaberite header logo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <>
            <Form>
              <Row>
                <Col>
                  {firstHalf.map((logo) => (
                    <Row key={logo.id} className="mb-2">
                      <Col className="mb-4">
                        <Form.Check
                          type="radio"
                          name="logoGroup"
                          id={`logo-${logo.id}`}
                          label={`${logo.name}`}
                          value={logo.id}
                          onChange={() => handleSelectHeader(logo.id)}
                        />
                        <Image
                          src={`data:image/${logo.type};base64,${logo.picByte}`}
                          alt={`Logo ${logo.id}`}
                          thumbnail
                        />
                      </Col>
                    </Row>
                  ))}
                </Col>
                <Col>
                  {secondHalf.map((logo) => (
                    <Row key={logo.id} className="mb-2">
                      <Col className="mb-4">
                        <Form.Check
                          type="radio"
                          name="logoGroup"
                          id={`logo-${logo.id}`}
                          label={`${logo.name}`}
                          value={logo.id}
                          onChange={() => handleSelectHeader(logo.id)}
                        />
                        <Image
                          src={`data:image/${logo.type};base64,${logo.picByte}`}
                          alt={`Logo ${logo.id}`}
                          thumbnail
                        />
                      </Col>
                    </Row>
                  ))}
                </Col>
              </Row>
            </Form>
          </>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleNext} variant="success">
            Dalje
          </Button>
          <Button onClick={handleCloseHeader} variant="danger">
            Zatvori
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showFooter} onHide={handleCloseFooter} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Izaberite footer logo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <>
            <Form>
              <Row>
                <Col>
                  {firstHalf.map((logo) => (
                    <Row key={logo.id} className="mb-2">
                      <Col className="mb-4">
                        <Form.Check
                          type="radio"
                          name="logoGroup"
                          id={`logo-${logo.id}`}
                          label={`${logo.name}`}
                          value={logo.id}
                          onChange={() => handleSelectFooter(logo.id)}
                        />
                        <Image
                          src={`data:image/${logo.type};base64,${logo.picByte}`}
                          alt={`Logo ${logo.id}`}
                          thumbnail
                        />
                      </Col>
                    </Row>
                  ))}
                </Col>
                <Col>
                  {secondHalf.map((logo) => (
                    <Row key={logo.id} className="mb-2">
                      <Col className="mb-4">
                        <Form.Check
                          type="radio"
                          name="logoGroup"
                          id={`logo-${logo.id}`}
                          label={`${logo.name}`}
                          value={logo.id}
                          onChange={() => handleSelectFooter(logo.id)}
                        />
                        <Image
                          src={`data:image/${logo.type};base64,${logo.picByte}`}
                          alt={`Logo ${logo.id}`}
                          thumbnail
                        />
                      </Col>
                    </Row>
                  ))}
                </Col>
              </Row>
            </Form>
          </>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleChoose} variant="success">
            Izaberi
          </Button>
          <Button onClick={handleCloseFooter} variant="danger">
            Zatvori
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showUcesnik}
        onHide={handleCloseUcesnik}
        centered
        backdrop="static"
      >
        <Modal.Header closeButton>
          <Modal.Title>Dodaj učesnika</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <Form>
              <Form.Group className="mb-3">
                <Form.Control
                  name="ime"
                  value={ucesnik.ime}
                  onChange={handleChangeUcesnik}
                  type="text"
                  placeholder="Ime *"
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control
                  name="prezime"
                  value={ucesnik.prezime}
                  onChange={handleChangeUcesnik}
                  type="text"
                  placeholder="Prezime *"
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control
                  as="select"
                  name="rod"
                  value={ucesnik.rod}
                  onChange={handleChangeUcesnik}
                  required
                >
                  <option value="">Izaberite rod *</option>
                  {Object.entries(rodMapping).map(([key, value]) => (
                    <option key={key} value={key}>
                      {value}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control
                  name="godine"
                  value={ucesnik.godine}
                  onChange={handleChangeUcesnik}
                  type="number"
                  placeholder="Godina rođenja *"
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control
                  name="mestoBoravista"
                  value={ucesnik.mestoBoravista}
                  onChange={handleChangeUcesnik}
                  type="text"
                  placeholder="Mesto boravišta *"
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control
                  name="brojTelefona"
                  value={ucesnik.brojTelefona}
                  onChange={handleChangeUcesnik}
                  type="text"
                  placeholder="Broj telefona"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control
                  name="email"
                  value={ucesnik.email}
                  onChange={handleChangeUcesnik}
                  type="text"
                  placeholder="E-mail"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control
                  name="organizacija"
                  value={ucesnik.organizacija}
                  onChange={handleChangeUcesnik}
                  type="text"
                  placeholder="Organizacija *"
                  required
                />
              </Form.Group>
            </Form>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleDodajUcesnika} variant="success">
            Dodaj učesnika
          </Button>
          <Button onClick={handleCloseUcesnik} variant="danger">
            Završi
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showEdit}
        onHide={handleCloseEdit}
        centered
        backdrop="static"
      >
        <Modal.Header closeButton>
          <Modal.Title>Izmeni učesnika</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {currentUcesnik && ( // Ensure currentUcesnik is not null before rendering the form
            <EditUcesnikForm
              currentUcesnik={currentUcesnik}
              onUcesnikEdited={handleUcesnikEdit}
            />
          )}
        </Modal.Body>
      </Modal>

      <Modal
        show={showDelete}
        onHide={handleCloseDelete}
        centered
        backdrop="static"
      >
        <Modal.Header closeButton>
          <Modal.Title>Obriši učesnika događaja</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <DeleteUcesnikForm deleteUcesnik={ucesnik} />
        </Modal.Body>
        <Modal.Footer>
          <Button className="btn btn-danger" onClick={handleUcesnikDelete}>
            Obriši
          </Button>
          <Button variant="secondary" onClick={handleCloseDelete}>
            Zatvori
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default DogadjajUcesniciForm;
