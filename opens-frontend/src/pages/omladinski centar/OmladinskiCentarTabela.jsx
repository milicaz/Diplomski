import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  Image,
  Modal,
  Row,
  Spinner,
} from "react-bootstrap";
import { FaRegFilePdf } from "react-icons/fa";
import { RiFileExcel2Fill } from "react-icons/ri";
import { useLocation, useNavigate } from "react-router-dom";
import useHttpProtected from "../../hooks/useHttpProtected";
import useToast from "../../hooks/useToast";
import Pagination from "../Pagination";
import OmladinskiCentarTabelaItem from "./OmladinskiCentarTabelaItem";
export const OmladinskiCentarTabela = ({ mestoPoseteId, mestoPoseteNaziv }) => {
  const [posete, setPosete] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [dateInput, setDateInput] = useState(null);
  const [sortOrder, setSortOrder] = useState("ascending");

  const httpProtected = useHttpProtected();
  const navigate = useNavigate();
  const location = useLocation();
  const { handleShowToast } = useToast();

  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const [downloading, setDownloading] = useState(false);
  const [downloadingXlsx, setDownloadingXlsx] = useState(false);
  const [downloadType, setDownloadType] = useState(null);

  /* ZA SELEKTOVANJE LOGOA */
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
    let isMounted = true;
    const controller = new AbortController();

    const fetchData = async () => {
      try {
        const requests = [
          httpProtected.get(`/posete/${mestoPoseteId}`, {
            signal: controller.signal,
          }),
          httpProtected.get("/logoi", { signal: controller.signal }),
        ];
        const [poseteData, logoiData] = await Promise.all(requests);

        if (isMounted) {
          setPosete(poseteData.data);
          setLogos(logoiData.data);
        }
      } catch (error) {
        if (error.response?.status >= 500) {
          handleShowToast(
            "Greška",
            "Greška pri učitavanju podataka. Došlo je do problema prilikom obrade zahteva. Molimo Vas da pokušate ponovo kasnije.",
            "danger"
          );
        } else if (error.name !== "CanceledError") {
          navigate("/logovanje", { state: { from: location }, replace: true });
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [mestoPoseteId]);

  if (posete.length === 0) {
    return (
      <Container
        className="d-flex justify-content-center align-items-center mt-5"
        style={{ height: "100v" }}
      >
        <Row>
          <Col>
            <h4>Nema poseta za prikazivanje.</h4>
          </Col>
        </Row>
      </Container>
    );
  }

  const poseteZaPrikaz = posete.reduce((acc, poseta) => {
    //Pretraga da li je unet posetilac ili se kreira novi
    let entry = acc.find((item) => item.posetilacId === poseta.posetilacId);
    if (!entry) {
      entry = {
        posetilacId: poseta.posetilacId,
        ime: poseta.ime,
        prezime: poseta.prezime,
        godine: poseta.godine,
        totalPosete: poseta.totalPosete,
        totalnoProvedenoVreme: poseta.totalnoProvedenoVreme,
        posete: [],
      };
      acc.push(entry);
    }

    //Pretraga da li je uneta godina ili kreirati novu
    let yearEntry = entry.posete.find(
      (year) => year.godinaPosete === poseta.godinaPosete
    );
    if (!yearEntry) {
      yearEntry = {
        godinaPosete: poseta.godinaPosete,
        godisnjiBrojPoseta: poseta.godisnjiBrojPoseta,
        godisnjeProvedenoVreme: poseta.godisnjeProvedenoVreme,
        posetePoMesecima: [],
      };
      entry.posete.push(yearEntry);
    }

    yearEntry.posetePoMesecima.push({
      mesecPosete: poseta.mesecPosete,
      mesecniBrojPoseta: poseta.mesecniBrojPoseta,
      mesecnoProvedenoVreme: poseta.mesecnoProvedenoVreme,
    });

    return acc;
  }, []);

  // Sortiranje poseteZaPrikaz po celokupnom broju poseta i provedenom vremenu u opadajućem redosledu
  const sortiranePoseteZaPrikaz = (items) => {
    return items.slice().sort((a, b) => {
      if (sortOrder === "ascending") {
        return a.totalPosete - b.totalPosete;
      } else if (sortOrder === "descending") {
        return b.totalPosete - a.totalPosete;
      } else if (sortOrder === "ascendingVreme") {
        const aTotalMinutes = getTotalMinutes(a.totalnoProvedenoVreme);
        const bTotalMinutes = getTotalMinutes(b.totalnoProvedenoVreme);
        return aTotalMinutes - bTotalMinutes;
      } else if (sortOrder === "descendingVreme") {
        const aTotalMinutes = getTotalMinutes(a.totalnoProvedenoVreme);
        const bTotalMinutes = getTotalMinutes(b.totalnoProvedenoVreme);
        return bTotalMinutes - aTotalMinutes;
      }
    });
  };

  function getTotalMinutes(timeString) {
    const timeParts = timeString.split(" ");

    if (timeParts.length === 4) {
      const hours = parseInt(timeParts[0]);
      const minutes = parseInt(timeParts[2]);
      return hours * 60 + minutes;
    } else if (timeParts.length === 2 && timeParts[1] === "min") {
      return parseInt(timeParts[0]);
    }
    return 0;
  }

  const filtriranePosete = (items) => {
    if (searchInput.trim() === "") {
      return items; //Vraca sve ukoliko je searcInput prazan
    } else {
      return items.filter((item) => {
        const fullName = `${item.ime} ${item.prezime}`;
        return fullName.toLowerCase().includes(searchInput.toLowerCase());
      });
    }
  };

  const sortedPosete = sortiranePoseteZaPrikaz(poseteZaPrikaz);
  const filteredPosete = filtriranePosete(sortedPosete);

  const indexOfLastItem = currentPage * limit;
  const indexOfFirstItem = indexOfLastItem - limit;
  const currentItems = filteredPosete.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredPosete.length / limit);

  const shouldShowPagination = filteredPosete.length >= 10 && totalPages > 1;

  const onInputChange = (e) => {
    setLimit(e.target.value);
  };

  const date = new Date();
  const formattedDate = `${date.getDate()}-${
    date.getMonth() + 1
  }-${date.getFullYear()}`;

  const handleNext = (e) => {
    e.preventDefault();
    handleCloseHeader();
    handleShowFooter();
  };

  const handleChoose = (e) => {
    e.preventDefault();
    handleCloseFooter();
    if (downloadType === "pdf") {
      handlePDFDownload();
      // } else if (downloadType === "excel") {
      //   handleXLSXDownload();
    }
  };

  const halfLength = Math.ceil(logos.length / 2);
  const firstHalf = logos.slice(0, halfLength);
  const secondHalf = logos.slice(halfLength);

  const handlePDFDownload = async () => {
    if (!headerImageId || !footerImageId) {
      handleShowToast(
        "Greška",
        "Molimo izaberite logoe za header i footer.",
        "danger"
      );
      return;
    }

    setDownloading(true);

    const mesec = new Date(dateInput).getMonth() + 1;
    const godina = new Date(dateInput).getFullYear();
    const controller = new AbortController();

    try {
      const response = await httpProtected.get(
        `/${mestoPoseteId}/pdf/${mesec}/godina/${godina}`,
        {
          params: { headerImageId, footerImageId },
          responseType: "blob",
          signal: controller.signal,
        }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;

      // Mapa meseci
      const meseci = [
        "januar",
        "februar",
        "mart",
        "april",
        "maj",
        "jun",
        "jul",
        "avgust",
        "septembar",
        "oktobar",
        "novembar",
        "decembar",
      ];

      const mesecIme = meseci[mesec - 1];
      const nazivFajla = `${mestoPoseteNaziv} - evidencija direktnih posetilaca za ${mesecIme} ${godina}.pdf`;

      link.setAttribute("download", nazivFajla);
      document.body.appendChild(link);
      link.click();

      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);

      setDownloading(false);
    } catch (error) {
      if (error.response?.status >= 500) {
        handleShowToast(
          "Greška",
          "Greška pri kreiranju PDF-a. Došlo je do problema prilikom obrade zahteva. Molimo Vas da pokušate ponovo kasnije.",
          "danger"
        );
      } else if (error.name !== "CanceledError") {
        setDownloading(false);
        navigate("/logovanje", { state: { from: location }, replace: true });
      }
    } finally {
      controller.abort();
    }
  };

  const handleXLSXDownload = async () => {
    // if (!headerImageId || !footerImageId) {
    //   handleShowToast(
    //     "Greška",
    //     "Molimo izaberite logoe za header i footer.",
    //     "danger"
    //   );
    //   return;
    // }
    if (!dateInput) {
      handleShowToast(
        "Greška",
        "Prvo morate izabrati mesec i godinu za koju želite da generišete EXCEL izveštaj.",
        "danger"
      );
      return;
    }

    setDownloadingXlsx(true);

    const mesec = new Date(dateInput).getMonth() + 1;
    const godina = new Date(dateInput).getFullYear();

    setTimeout(async () => {
      setDownloadingXlsx(false);
      const controller = new AbortController();
      try {
        const response = await httpProtected.get(
          `/${mestoPoseteId}/xlsx/${mesec}/godina/${godina}`,
          {
            responseType: "blob",
            signal: controller.signal,
          }
        );

        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;

        // Mapa meseci
        const meseci = [
          "januar",
          "februar",
          "mart",
          "april",
          "maj",
          "jun",
          "jul",
          "avgust",
          "septembar",
          "oktobar",
          "novembar",
          "decembar",
        ];

        const mesecIme = meseci[mesec - 1];
        const nazivFajla = `${mestoPoseteNaziv} - evidencija direktnih posetilaca za ${mesecIme} ${godina}.xlsx`;

        link.setAttribute("download", nazivFajla);

        document.body.appendChild(link);
        link.click();

        link.parentNode.removeChild(link);
        window.URL.revokeObjectURL(url);
      } catch (error) {
        if (error.response?.status >= 500) {
          handleShowToast(
            "Greška",
            "Greška pri kreiranju Excel-a. Došlo je do problema prilikom obrade zahteva. Molimo Vas da pokušate ponovo kasnije.",
            "danger"
          );
        } else if (error.name !== "CanceledError") {
          navigate("/logovanje", { state: { from: location }, replace: true });
        }
      } finally {
        controller.abort();
      }
    }, 2000);
  };

  return (
    <>
      <div className="row align-items-center my-4">
        <div className="col">
          <Form.Control
            type="text"
            placeholder="Pretraga po imenu ili prezimenu"
            value={searchInput}
            onChange={(e) => {
              setSearchInput(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>

        <div className="col-auto pe-0">
          <span>Period za koji hoćete da generišete izveštaj: </span>
        </div>
        <div className="col">
          <Form.Control
            type="month"
            onChange={(e) => setDateInput(e.target.value)}
          />
        </div>
        <div className="col-auto ps-0">
          <Button
            className="mx-1"
            variant="danger"
            onClick={() => {
              if (!dateInput) {
                handleShowToast(
                  "Greška",
                  "Prvo morate izabrati mesec i godinu za koju želite da generišete PDF izveštaj.",
                  "danger"
                );
              } else {
                handleShowHeader();
                setDownloadType("pdf");
              }
            }}
            disabled={downloading}
          >
            {downloading ? (
              <>
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                  className="mx-1"
                />
                PDF
              </>
            ) : (
              <>
                <FaRegFilePdf size={20} /> PDF
              </>
            )}
          </Button>
          <Button
            className="mx-1"
            variant="success"
            onClick={handleXLSXDownload}
            // onClick={() => {
            //   if (!dateInput) {
            //     handleShowToast(
            //       "Greška",
            //       "Prvo morate izabrati mesec i godinu za koju želite da generišete EXCEL izveštaj.",
            //       "danger"
            //     );
            //   } else {
            //     handleShowHeader();
            //     setDownloadType("excel");
            //   }
            // }}
            disabled={downloadingXlsx}
          >
            {downloadingXlsx ? (
              <>
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                  className="mx-1"
                />
                EXCEL
              </>
            ) : (
              <>
                <RiFileExcel2Fill size={20} /> EXCEL
              </>
            )}
          </Button>
        </div>
      </div>

      <div className="row my-2">
        <div className="col-sm-8">
          {poseteZaPrikaz && totalPages > 0 && shouldShowPagination && (
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
                  <option value="10">10</option>
                  <option value="15">15</option>
                  <option value="20">20</option>
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
              <span>Sortiranje prema: </span>
            </div>
            <div className="col">
              <Form.Select
                onChange={(e) => setSortOrder(e.target.value)}
                value={sortOrder}
              >
                <option value="ascending">Najmanje poseta</option>
                <option value="descending">Najviše poseta</option>
                <option value="ascendingVreme">Najmanje vremena</option>
                <option value="descendingVreme">Najviše vremena</option>
              </Form.Select>
            </div>
          </div>
        </div>
      </div>

      {currentItems.length === 0 && (
        <Container
          className="d-flex justify-content-center align-items-center mt-3"
          style={{ height: "100v" }}
        >
          <Row>
            <Col>
              <h4>Nema poseta za prikazivanje.</h4>
            </Col>
          </Row>
        </Container>
      )}

      {currentItems.map((posetilac, index) => (
        <OmladinskiCentarTabelaItem key={index} posetilac={posetilac} />
      ))}

      {shouldShowPagination && (
        <Pagination
          pages={totalPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          array={filteredPosete}
          limit={limit}
          maxVisibleButtons={3}
        />
      )}

      <Modal show={showHeader} onHide={handleCloseHeader} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Izaberite header logo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <>
            <Form>
              <Row>
                {firstHalf.length > 0 || secondHalf.length > 0 ? (
                  <>
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
                  </>
                ) : (
                  <Container
                    className="d-flex justify-content-center align-items-center mt-3"
                    style={{ height: "100v" }}
                  >
                    <Row>
                      <Col>
                        <h6>
                          Nema logoa za prikazivanje. Možete dodati logoe u
                          okviru Šifrarnik/Logoi.
                        </h6>
                      </Col>
                    </Row>
                  </Container>
                )}
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
                {firstHalf.length > 0 || secondHalf.length > 0 ? (
                  <>
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
                  </>
                ) : (
                  <Container
                    className="d-flex justify-content-center align-items-center mt-3"
                    style={{ height: "100v" }}
                  >
                    <Row>
                      <Col>
                        <h6>
                          Nema logoa za prikazivanje. Možete dodati logoe u
                          okviru Šifrarnik/Logoi.
                        </h6>
                      </Col>
                    </Row>
                  </Container>
                )}
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
    </>
  );
};
export default OmladinskiCentarTabela;
