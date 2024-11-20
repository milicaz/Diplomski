import React, { useContext, useEffect, useState } from "react";
import { Button, Col, Form, Image, Modal, Row } from "react-bootstrap";
import { MdDelete, MdEdit } from "react-icons/md";
import Pagination from "../../Pagination";
import { DogadjajContext } from "../DogadjajContext";
import { FaRegFilePdf } from "react-icons/fa";
import { RiFileExcel2Fill } from "react-icons/ri";
import { httpProtected } from "../../../apis/http";
import { useLocation, useNavigate } from "react-router-dom";

const DogadjajUcesniciForm = ({ currentDogadjaj }) => {
  const { getUcesnici } = useContext(DogadjajContext);
  const { kreirajExcelUcesnici } = useContext(DogadjajContext);
  const { kreirajPdfUcesnici } = useContext(DogadjajContext)

  const navigate = useNavigate();
  const location = useLocation();

  const [ucesnici, setUcesnici] = useState([]);

  const id = currentDogadjaj.id;

  const naziv = currentDogadjaj.naziv;

  const [limit, setLimit] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const [logos, setLogos] = useState([]);

  const [showHeader, setShowHeader] = useState(false);
  const [showFooter, setShowFooter] = useState(false);

  const handleShowHeader = () => setShowHeader(true);
  const handleCloseHeader = () => setShowHeader(false);

  const handleShowFooter = () => setShowFooter(true);
  const handleCloseFooter = () => setShowFooter(false);

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
        const [ logoiData] = await Promise.all(requests);

        if (isMounted) {
          setLogos(logoiData.data);
        }
      } catch (error) {
        if (error.name !== "CanceledError") {
          console.error("Greška prilikom fetching podataka: ", error);
          navigate("/logovanje", { state: { from: location }, replace: true });
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
  }, [id]);

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
  }

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

  return (
    <div>
      <Row className="mb-4 align-items-end">
        <Col md={6}>
          <Row>
            <Col className="d-flex align-items-center">
              <Button className="mx-1" variant="danger" onClick={handleShowHeader}>
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
            {/* <p>
              <b>Učesnici događaja: {naziv}</b>
            </p> */}
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
                    <div className="button-row" title="Izmena">
                      <button className="btn text-warning btn-act">
                        <MdEdit />
                      </button>
                      <button
                        className="btn text-danger btn-act"
                        title="Brisanje"
                      >
                        <MdDelete />
                      </button>
                    </div>
                  </td>
                  <td>{/* Add actions here, like Edit or Delete */}</td>
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

      <Modal show={showFooter} onHide={handleCloseFooter} centered>
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
    </div>
  );
};

export default DogadjajUcesniciForm;
