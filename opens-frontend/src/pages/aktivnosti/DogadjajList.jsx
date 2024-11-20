import { LocalDate, LocalTime } from "@js-joda/core";
import { useContext, useEffect, useState } from "react";
import { Button, Col, Form, Image, Modal, Row } from "react-bootstrap";
import { FaRegFilePdf } from "react-icons/fa";
import { FaSquarePlus } from "react-icons/fa6";
import { RiFileExcel2Fill } from "react-icons/ri";
import { ucesniciImage } from "../../assets";
import useHttpProtected from "../../hooks/useHttpProtected";
import Pagination from "../Pagination";
import Dogadjaj from "./Dogadjaj";
import { DogadjajContext } from "./DogadjajContext";
import { useLocation, useNavigate } from "react-router-dom";

const DogadjajList = () => {
  const { sortedDogadjaji } = useContext(DogadjajContext);
  const { addOrganizacija } = useContext(DogadjajContext);
  const { organizacijaId, setOrganizacijaId } = useContext(DogadjajContext);
  const { addDogadjaj } = useContext(DogadjajContext);
  const { getOrganizacijaById } = useContext(DogadjajContext);
  const { currentOrganizacija } = useContext(DogadjajContext);
  const { editOrganizacija } = useContext(DogadjajContext);
  const { mestaDogadjaja } = useContext(DogadjajContext);
  const { tipoviDogadjaja } = useContext(DogadjajContext);
  const { dogadjajId } = useContext(DogadjajContext);
  const { dodajUcesnika } = useContext(DogadjajContext);
  const { kreirajPDF } = useContext(DogadjajContext);
  const {organizacije} = useContext(DogadjajContext);
  const {kreirajExcel} = useContext(DogadjajContext);

  const httpProtected = useHttpProtected();

  const navigate = useNavigate();
  const location = useLocation();

  const [organizacija, setOrganizacija] = useState({
    naziv: "",
    odgovornaOsoba: "",
    brojTelefona: "",
    email: "",
    delatnost: "",
    opis: "",
    link: "",
  });

  // //DODATO ZA DROPDOWN ORGANIZACIJA
  const [existingOrganizacije, setExistingOrganizacije] = useState([]);
  const [isExisting, setIsExisting] = useState(false); // New state to track if the organization is existing
  // //

  const [dogadjaj, setDogadjaj] = useState({
    naziv: "",
    datum: LocalDate.now(),
    pocetakDogadjaja: LocalTime.MIDNIGHT,
    krajDogadjaja: LocalTime.MIDNIGHT,
    organizacijaId: organizacijaId,
    mestoDogadjajaId: "",
    vrstaDogadjajaId: "",
  });

  const [organizacijaEdit, setOrganizacijaEdit] = useState({
    naziv: "",
    odgovornaOsoba: "",
    brojTelefona: "",
    email: "",
    delatnost: "",
    opis: "",
    link: "",
  });

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

  const [id, setId] = useState();

  const [idDogadjaja, setIdDogadjaja] = useState();
  const [datum, setDatum] = useState("");
  const [mesec, setMesec] = useState("");
  const [godina, setGodina] = useState("");
  const [vrsta, setVrsta] = useState("");
  const [ime, setIme] = useState("");
  const [prezime, setPrezime] = useState("");

  //search organizacija by name
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
    setOrganizacijaEdit(currentOrganizacija);
    setId(organizacijaId);
    setIdDogadjaja(dogadjajId);
    setAllDogadjaji(sortedDogadjaji);
    setExistingOrganizacije(organizacije)

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
  }, [organizacijaId, currentOrganizacija, dogadjajId, organizacija.naziv, sortedDogadjaji, organizacije]);

  //DODATU ZA PRETRAGU
  const [allDogadjaji, setAllDogadjaji] = useState([]); // Store all events
  const [searchQuery, setSearchQuery] = useState('');
  //

  // DODATO ZA SEARCH BAR
  const filteredDogadjaji = allDogadjaji.filter(dogadjaj => {
    const { naziv, organizacija } = dogadjaj;
    const organizacijaNaziv = organizacija.naziv.toLowerCase();
    const odgovornaOsoba = organizacija.odgovornaOsoba.toLowerCase();
    const dogadjajNaziv = naziv.toLowerCase();
  
    return (
      dogadjajNaziv.includes(searchQuery.toLowerCase()) ||
      organizacijaNaziv.includes(searchQuery.toLowerCase()) ||
      odgovornaOsoba.includes(searchQuery.toLowerCase())
    );
  });
  //

  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const indexOfLastDogadjaj = currentPage * limit;
  const indexOfFirstDogadjaj = indexOfLastDogadjaj - limit;
  const currentDogadjaji = sortedDogadjaji.slice(
    indexOfFirstDogadjaj,
    indexOfLastDogadjaj
  );
  // const totalPagesNumber = Math.ceil(sortedDogadjaji.length / limit);

  //IZMENJONO ZBOG SEARCH BAR-A
  // Use filtered results for pagination when searchQuery is not empty
  const resultsToPaginate = searchQuery ? filteredDogadjaji : allDogadjaji;

  // Calculate pagination based on results to paginate
  const totalPagesNumber = Math.ceil(resultsToPaginate.length / limit);
  // const indexOfLastDogadjaj = currentPage * dogadjajiPerPage;
  // const indexOfFirstDogadjaj = indexOfLastDogadjaj - dogadjajiPerPage;
  const currentPageDogadjaji = resultsToPaginate.slice(indexOfFirstDogadjaj, indexOfLastDogadjaj);
  //

  const onInputChange = (e) => {
    setLimit(e.target.value);
  };

  const [showDogadjaj, setShowDogadjaj] = useState(false);
  const handleShowDogadjaj = () => {
    setShowDogadjaj(true);
  };
  const handleCloseDogadjaj = () => {
    setShowDogadjaj(false);
    setOrganizacija({
      naziv: "",
      odgovornaOsoba: "",
      brojTelefona: "",
      email: "",
      delatnost: "",
      opis: "",
      link: "",
    });
    setDogadjaj({
      naziv: "",
      datum: LocalDate.now(),
      pocetakDogadjaja: LocalTime.MIDNIGHT,
      krajDogadjaja: LocalTime.MIDNIGHT,
      organizacijaId: organizacijaId,
      mestoDogadjajaId: "",
      vrstaDogadjajaId: "",
    });
  };

  const [showOrganizacija, setShowOrganizacija] = useState(false);
  const handleShowOrganizacija = () => {
    setShowOrganizacija(true);
  };

  const handleCloseOrganizacija = () => {
    setShowOrganizacija(false);
    setOrganizacija({
      naziv: "",
      odgovornaOsoba: "",
      brojTelefona: "",
      email: "",
      delatnost: "",
      opis: "",
      link: "",
    });
    setDogadjaj({
      naziv: "",
      datum: LocalDate.now(),
      pocetakDogadjaja: LocalTime.MIDNIGHT,
      krajDogadjaja: LocalTime.MIDNIGHT,
      organizacijaId: organizacijaId,
      mestoDogadjajaId: "",
      vrstaDogadjajaId: "",
    });

    setIsExisting(false); // Reset the flag when closing the modal
  };

  const [showEditOrganizacija, setShowEditOrganizacija] = useState(false);
  const handleShowEditOrganizacija = () => {
    setShowEditOrganizacija(true);
  };

  const handleCloseEditOrganizacija = () => {
    setShowEditOrganizacija(false);
  };

  const [showUcesnik, setShowUcesnik] = useState(false);
  const handleShowUcesnici = () => {
    setShowUcesnik(true);
    setShowDogadjaj(false);
    setShowDialogUcesnik(false);
  };

  const handleCloseUcesnik = () => {
    setShowUcesnik(false);
  };

  const [showDialogUcesnik, setShowDialogUcesnik] = useState(false);
  const handleShowDialogUcesnik = () => {
    setShowDialogUcesnik(true);
  };
  const handleCloseDialogUcesnik = () => {
    setShowDialogUcesnik(false);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setOrganizacija({ ...organizacija, [name]: value });
  };

  const handleSelectChange = (selectedOption) => {
    if (selectedOption) {
      const selectedNaziv = selectedOption.value;
      
      // Check if it's a pre-existing organization
      const selectedOrg = existingOrganizacije.find((org) => org.naziv === selectedNaziv);
  
      if (selectedOrg) {
        // If it's an existing organization, update the form fields with its details
        setOrganizacija({
          naziv: selectedOrg.naziv,
          odgovornaOsoba: selectedOrg.odgovornaOsoba,
          brojTelefona: selectedOrg.brojTelefona,
          email: selectedOrg.email,
          delatnost: selectedOrg.delatnost,
          opis: selectedOrg.opis,
          link: selectedOrg.link,
        });
  
        // Set the organizacijaId from the context
        setOrganizacijaId(selectedOrg.id);
        setIsExisting(true);
      } else {
        // If it's a new organization, update only the naziv field
        setOrganizacija({
          ...organizacija,
          naziv: selectedNaziv,  // Set the new naziv
        });
        setOrganizacijaId(null); // Reset organizacijaId because it's a new one
        setIsExisting(false);
      }
    } else {
      // If no option is selected, reset the form fields
      setOrganizacija({
        naziv: '',
        odgovornaOsoba: '',
        brojTelefona: '',
        email: '',
        delatnost: '',
        opis: '',
        link: '',
      });
      setOrganizacijaId(null);
      setIsExisting(false);
    }
  };

   // Create options for the Creatable dropdown
   const options = existingOrganizacije.map((org) => ({
    value: org.naziv,
    label: org.naziv
  }));
  //

  // const handleDalje = (event) => {
  //   event.preventDefault();
  //   addOrganizacija(organizacija);
  //   handleCloseOrganizacija();
  //   handleShowDogadjaj();
  // };

  const handleDalje = (event) => {
    event.preventDefault();
  
    if (isExisting) {
      // If the organization is already existing, just proceed with the existing organization
      console.log('Using existing organization:', organizacija);
      handleCloseOrganizacija();  // Close modal
      handleShowDogadjaj();       // Proceed to the next modal/step
    } else {
      // If it's a new organization, add it to the database
      addOrganizacija(organizacija); // Replace with your actual add organization function
      handleCloseOrganizacija();     // Close modal
      handleShowDogadjaj();          // Proceed to the next modal/step
    }
  };

  const handleChangeDogadjaj = (event) => {
    const { name, value } = event.target;
    setDogadjaj((prevDogadjaj) => ({ ...prevDogadjaj, [name]: value }));
  };

  const handleDodaj = (event) => {
    event.preventDefault();
    // dogadjaj.organizacijaId = organizacijaId;
    // addDogadjaj(dogadjaj);
    // handleCloseDogadjaj();
    // setOrganizacija({
    //   naziv: "",
    //   odgovornaOsoba: "",
    //   brojTelefona: "",
    //   email: "",
    //   delatnost: "",
    //   opis: "",
    //   link: "",
    // });
    // setDogadjaj({
    //   naziv: "",
    //   datum: LocalDate.now(),
    //   pocetakDogadjaja: LocalTime.MIDNIGHT,
    //   krajDogadjaja: LocalTime.MIDNIGHT,
    //   organizacijaId: organizacijaId,
    //   mestoDogadjajaId: "",
    //   vrstaDogadjajaId: "",
    // });
    // handleShowDialogUcesnik();
    // Use organizacijaId from existing or newly created organization
    const currentOrganizacijaId = organizacijaId;

    if (!currentOrganizacijaId) {
      // If there's no organizacijaId, we need to create a new organizacija first
      addOrganizacija(organizacija).then(() => {
        // After adding the organization, create the dogadjaj
        dogadjaj.organizacijaId = organizacijaId; // Use the organizacijaId from the response
        addDogadjaj(dogadjaj);
        handleCloseDogadjaj();
        resetForms();
      });
    } else {
      // If there's an organizacijaId already (existing organization), use it directly
      dogadjaj.organizacijaId = currentOrganizacijaId;
      addDogadjaj(dogadjaj);
      handleCloseDogadjaj();
      resetForms();
    }
  };

  const resetForms = () => {
    setOrganizacija({
      naziv: "",
      odgovornaOsoba: "",
      brojTelefona: "",
      email: "",
      delatnost: "",
      opis: "",
      link: "",
    });
    setDogadjaj({
      naziv: "",
      datum: LocalDate.now(),
      pocetakDogadjaja: LocalTime.MIDNIGHT,
      krajDogadjaja: LocalTime.MIDNIGHT,
      organizacijaId: organizacijaId,
      mestoDogadjajaId: "",
      vrstaDogadjajaId: "",
    });
    handleShowDialogUcesnik(); // Show the next dialog (if necessary)
  };

  const handleChangeEditOrganziacija = (event) => {
    const { name, value } = event.target;
    setOrganizacijaEdit({ ...organizacijaEdit, [name]: value });
  };

  const handleNazad = () => {
    getOrganizacijaById(organizacijaId);
    handleShowEditOrganizacija();
    handleCloseDogadjaj();
  };

  const handleEditOrganizacija = (event) => {
    event.preventDefault();
    editOrganizacija(id, organizacijaEdit);
    handleCloseEditOrganizacija();
    handleShowDogadjaj();
  };

  const handleChangeUcesnik = (event) => {
    const { name, value } = event.target;
    setUcesnik({ ...ucesnik, [name]: value });
  };

  const handleDodajUcesnika = (event) => {
    event.preventDefault();
    dodajUcesnika(ucesnik, idDogadjaja);
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
  };

  const handleChangeDatum = (event) => {
    event.preventDefault();
    const selectedDatum = event.target.value;
    setDatum(selectedDatum);

    const [godinaPart, mesecPart] = selectedDatum.split("-");
    setGodina(godinaPart);

    const cleanMesecPart = mesecPart.startsWith("0")
      ? mesecPart.substring(1)
      : mesecPart;
    setMesec(cleanMesecPart);
  };

  const handleChangeVrsta = (event) => {
    setVrsta(event.target.value);
  };

  const handleChangeOsoba = (event) => {
    const { name, value } = event.target;

    if (name === "ime") {
      setIme(value);
    } else if (name === "prezime") {
      setPrezime(value);
    }
  };

  const halfLength = Math.ceil(logos.length / 2);
  const firstHalf = logos.slice(0, halfLength);
  const secondHalf = logos.slice(halfLength);

  const handleNext = (e) => {
    e.preventDefault();
    handleCloseHeader();
    handleShowFooter();
  };

  // const handleChoose = (event) => {
  //   event.preventDefault();
  //   handleCloseFooter();
  //     handlePDF();
  // };

  // const handlePDF = (event) => {
  //   event.preventDefault();
  //   const response = kreirajPDF(mesec, godina, vrsta, ime, prezime, headerImageId, footerImageId);
  // };

  // const handlePDF = (event) => {
  //   event.preventDefault();
  //   // Ensure valid inputs
  //   if (!mesec || !godina || !vrsta || !ime || !prezime) {
  //     console.error("Please fill all required fields.");
  //     return;
  //   }
  
  //   // Call kreirajPDF with validated parameters
  //   kreirajPDF(mesec, godina, vrsta, ime, prezime, headerImageId, footerImageId);
  // };

  const handleChoose = (event) => {
    event.preventDefault(); // Call preventDefault on the current event
    
    handleCloseFooter();
    
    // Pass the event object to handlePDF
    handlePDF(event);
  };
  
  const handlePDF = (event) => {
    event.preventDefault(); // Call preventDefault on the event
    
    // Ensure valid inputs
    if (!mesec || !godina || !vrsta || !ime || !prezime) {
      console.error("Please fill all required fields.");
      return;
    }
    
    // Call kreirajPDF with validated parameters
    kreirajPDF(mesec, godina, vrsta, ime, prezime, headerImageId, footerImageId);
  };

  const handleExcel = (event) => {
    event.preventDefault();
    const response = kreirajExcel(mesec, godina, vrsta, ime, prezime, headerImageId, footerImageId);
  }

  const formatTimeRange = (start, end) => {
    const startTime = new Date(`1970-01-01T${start}`).toLocaleTimeString(
      "en-GB",
      { hour: "2-digit", minute: "2-digit" }
    );
    const endTime = new Date(`1970-01-01T${end}`).toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
    });
    return `${startTime} - ${endTime}`;
  };



  return (
    <>
      <Row className="mb-4 align-items-end">
        <Col md={3}>
          <Form.Label>Period za koji se generiše izveštaj:</Form.Label>
          <Form.Control type="month" onChange={handleChangeDatum} />
        </Col>
        <Col md={3}>
          <Form.Label>Tip događaja za koji se generiše izveštaj:</Form.Label>
          <Form.Control as="select" name="vrsta" onChange={handleChangeVrsta}>
            <option value="">Izaberite vrstu događaja</option>
            {tipoviDogadjaja.map((item, index) => (
              <option key={item.id} value={item.id}>
                {item.naziv}
              </option>
            ))}
          </Form.Control>
        </Col>
        <Col md={6}>
          <Form.Label>Osoba koja generiše izveštaj:</Form.Label>
          <Row>
            <Col>
              <Form.Control
                name="ime"
                type="text"
                placeholder="Ime"
                onChange={handleChangeOsoba}
              />
            </Col>
            <Col>
              <Form.Control
                name="prezime"
                type="text"
                placeholder="Prezime"
                onChange={handleChangeOsoba}
              />
            </Col>
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
        <div className="row align-items-center mb-3">
          <div className="col-sm-4">
            <div className="row align-items-center">
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
          </div>
          {/* SEARCH BAR */}
          <div className="col-sm-4">
            {/* <Form.Control
              type="text"
              placeholder="Pretraži događaje..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            /> */}
            <Form.Control
              type="text"
              placeholder="Pretraži događaje..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1); // Reset to first page on search
              }}
            />
          </div>
          
          {/* BUTTON FOR ADDING NEW EVENT */}
          <div className="col-sm-4 text-end">
            <Button
              onClick={handleShowOrganizacija}
              className="btn btn-success"
              data-toggle="modal"
            >
              <i className="material-icons">&#xE147;</i>
              <span>Dodaj novi događaj</span>
            </Button>
          </div>
          {/* <div className="col-sm-6">
            <Button
              onClick={handleShowOrganizacija}
              className="btn btn-success"
            >
              <FaSquarePlus size={20} className="mx-1" />
              Dodaj novi događaj
            </Button>
          </div> */}
        </div>
      </div>
      <table className="table table-striped table-hover image-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Naziv</th>
            <th>Datum</th>
            <th>Vreme događaja</th>
            <th>Mesto</th>
            <th>Vrsta</th>
            <th>Organizacija</th>
            {/* DODATO NOVO POLJE */}
            <th>Odgovorna osoba</th>
            {/*  */}
            <th>Akcije</th>
          </tr>
        </thead>
        <tbody>
          {/* {currentDogadjaji.map((dogadjaj) => (
            <tr key={dogadjaj.id}>
              <Dogadjaj dogadjaj={dogadjaj} />
            </tr>
          ))} */}
          {/* IZMENJENO ZBOG SEARCHBAR */}
          {currentPageDogadjaji.map((dogadjaj) => (
            <tr key={dogadjaj.id}>
              <Dogadjaj dogadjaj={dogadjaj} />
            </tr>
          ))}
          {/*  */}
        </tbody>
      </table>

      <Pagination
        pages={totalPagesNumber}
        setCurrentPage={setCurrentPage}
        array={resultsToPaginate}
        limit={limit}
        maxVisibleButtons={3}
      />

      <Modal show={showOrganizacija} onHide={handleCloseOrganizacija}>
        <Modal.Header closeButton>
          <Modal.Title>Dodaj organizaciju</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <Form>
              <Form.Group>
                <Form.Control
                  name="naziv"
                  value={organizacija.naziv}
                  onChange={handleChange}
                  style={{ width: "80%", maxWidth: "90%" }}
                  type="text"
                  placeholder="Naziv"
                  required
                />
              </Form.Group>
              <br />
              <Form.Group>
                <Form.Control
                  name="odgovornaOsoba"
                  value={organizacija.odgovornaOsoba}
                  onChange={handleChange}
                  style={{ width: "80%", maxWidth: "90%" }}
                  type="text"
                  placeholder="Odgovorna osoba"
                  required
                />
              </Form.Group>
              <br />
              <Form.Group>
                <Form.Control
                  name="brojTelefona"
                  value={organizacija.brojTelefona}
                  onChange={handleChange}
                  style={{ width: "80%", maxWidth: "90%" }}
                  type="text"
                  placeholder="Broj telefon"
                  required
                />
              </Form.Group>
              <br />
              <Form.Group>
                <Form.Control
                  name="email"
                  value={organizacija.email}
                  onChange={handleChange}
                  style={{ width: "80%", maxWidth: "90%" }}
                  type="text"
                  placeholder="E-mail"
                  required
                />
              </Form.Group>
              <br />
              <Form.Group>
                <Form.Control
                  name="delatnost"
                  value={organizacija.delatnost}
                  onChange={handleChange}
                  style={{ width: "80%", maxWidth: "90%" }}
                  type="text"
                  placeholder="Delatnost"
                  required
                />
              </Form.Group>
              <br />
              <Form.Group>
                <Form.Control
                  name="opis"
                  value={organizacija.opis}
                  onChange={handleChange}
                  style={{ width: "80%", maxWidth: "90%" }}
                  type="text"
                  placeholder="Opis"
                  required
                />
              </Form.Group>
              <br />
              <Form.Group>
                <Form.Control
                  name="link"
                  value={organizacija.link}
                  onChange={handleChange}
                  style={{ width: "80%", maxWidth: "90%" }}
                  type="text"
                  placeholder="Link"
                  required
                />
              </Form.Group>
              <br />
            </Form>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleDalje} variant="success">
            Dalje
          </Button>
          &nbsp;
        </Modal.Footer>
      </Modal>

      <Modal show={showDogadjaj} onHide={handleCloseDogadjaj}>
        <Modal.Header closeButton>
          <Modal.Title>Dodaj događaj</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Control
                name="naziv"
                value={dogadjaj.naziv}
                onChange={handleChangeDogadjaj}
                style={{ width: "80%", maxWidth: "90%" }}
                type="text"
                placeholder="Naziv"
                required
              />
            </Form.Group>
            <br />
            <Form.Group>
              <Form.Control
                name="datum"
                value={dogadjaj.datum}
                onChange={handleChangeDogadjaj}
                style={{ width: "80%", maxWidth: "90%" }}
                type="date"
                placeholder="Datum"
                required
              />
            </Form.Group>
            <br />
            <Form.Group>
              <Form.Control
                name="pocetakDogadjaja"
                value={dogadjaj.pocetakDogadjaja}
                onChange={handleChangeDogadjaj}
                style={{ width: "80%", maxWidth: "90%" }}
                type="time"
                placeholder="Početak događaja"
                required
              />
            </Form.Group>
            <br />
            <Form.Group>
              <Form.Control
                name="krajDogadjaja"
                value={dogadjaj.krajDogadjaja}
                onChange={handleChangeDogadjaj}
                style={{ width: "80%", maxWidth: "90%" }}
                type="time"
                placeholder="Kraj događaja"
                required
              />
            </Form.Group>
            <br />
            <Form.Group controlId="dropdown">
              <Form.Control
                as="select"
                name="mestoDogadjajaId"
                value={dogadjaj.mestoDogadjajaId}
                onChange={handleChangeDogadjaj}
                style={{ width: "80%", maxWidth: "90%" }}
              >
                <option value="">Izaberite salu</option>
                {mestaDogadjaja.map((item, index) => (
                  <option key={item.id} value={item.id}>
                    {item.nazivSale}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <br />
            <Form.Group controlId="dropdown">
              <Form.Control
                as="select"
                name="vrstaDogadjajaId"
                value={dogadjaj.vrstaDogadjajaId}
                onChange={handleChangeDogadjaj}
                style={{ width: "80%", maxWidth: "90%" }}
              >
                <option value="">Izaberite vrstu događaja</option>
                {tipoviDogadjaja.map((item, index) => (
                  <option key={item.id} value={item.id}>
                    {item.naziv}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <br />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={handleDodaj}>
            Dodaj
          </Button>
          <Button variant="danger" onClick={handleNazad}>
            Nazad
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showEditOrganizacija} onHide={handleCloseEditOrganizacija}>
        <Modal.Header closeButton>
          <Modal.Title>Dodaj organizaciju</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <Form>
              <Form.Group>
                <Form.Control
                  name="naziv"
                  value={organizacijaEdit.naziv}
                  onChange={handleChangeEditOrganziacija}
                  style={{ width: "80%", maxWidth: "90%" }}
                  type="text"
                  placeholder="Naziv"
                  required
                />
              </Form.Group>
              <br />
              <Form.Group>
                <Form.Control
                  name="odgovornaOsoba"
                  value={organizacijaEdit.odgovornaOsoba}
                  onChange={handleChangeEditOrganziacija}
                  style={{ width: "80%", maxWidth: "90%" }}
                  type="text"
                  placeholder="Odgovorna osoba"
                  required
                />
              </Form.Group>
              <br />
              <Form.Group>
                <Form.Control
                  name="brojTelefona"
                  value={organizacijaEdit.brojTelefona}
                  onChange={handleChangeEditOrganziacija}
                  style={{ width: "80%", maxWidth: "90%" }}
                  type="text"
                  placeholder="Broj telefon"
                  required
                />
              </Form.Group>
              <br />
              <Form.Group>
                <Form.Control
                  name="email"
                  value={organizacijaEdit.email}
                  onChange={handleChangeEditOrganziacija}
                  style={{ width: "80%", maxWidth: "90%" }}
                  type="text"
                  placeholder="E-mail"
                  required
                />
              </Form.Group>
              <br />
              <Form.Group>
                <Form.Control
                  name="delatnost"
                  value={organizacijaEdit.delatnost}
                  onChange={handleChangeEditOrganziacija}
                  style={{ width: "80%", maxWidth: "90%" }}
                  type="text"
                  placeholder="Delatnost"
                  required
                />
              </Form.Group>
              <br />
              <Form.Group>
                <Form.Control
                  name="opis"
                  value={organizacijaEdit.opis}
                  onChange={handleChangeEditOrganziacija}
                  style={{ width: "80%", maxWidth: "90%" }}
                  type="text"
                  placeholder="Opis"
                  required
                />
              </Form.Group>
              <br />
              <Form.Group>
                <Form.Control
                  name="link"
                  value={organizacijaEdit.link}
                  onChange={handleChangeEditOrganziacija}
                  style={{ width: "80%", maxWidth: "90%" }}
                  type="text"
                  placeholder="Link"
                  required
                />
              </Form.Group>
              <br />
            </Form>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleEditOrganizacija} variant="success">
            Dalje
          </Button>
          &nbsp;
        </Modal.Footer>
      </Modal>

      <Modal show={showUcesnik} onHide={handleCloseUcesnik}>
        <Modal.Header closeButton>
          <Modal.Title>Dodaj učesnika</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <Form>
              <Form.Group>
                <Form.Control
                  name="ime"
                  value={ucesnik.ime}
                  onChange={handleChangeUcesnik}
                  style={{ width: "80%", maxWidth: "90%" }}
                  type="text"
                  placeholder="Ime"
                  required
                />
              </Form.Group>
              <br />
              <Form.Group>
                <Form.Control
                  name="prezime"
                  value={ucesnik.prezime}
                  onChange={handleChangeUcesnik}
                  style={{ width: "80%", maxWidth: "90%" }}
                  type="text"
                  placeholder="Prezime"
                  required
                />
              </Form.Group>
              <br />
              <Form.Group>
                <Form.Control
                  style={{ width: "80%", maxWidth: "90%" }}
                  as="select"
                  name="rod"
                  value={ucesnik.rod}
                  onChange={handleChangeUcesnik}
                  required
                >
                  <option value="">Izaberite rod</option>
                  {Object.entries(rodMapping).map(([key, value]) => (
                    <option key={key} value={key}>
                      {value}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
              <br />
              <Form.Group>
                <Form.Control
                  name="godine"
                  value={ucesnik.godine}
                  onChange={handleChangeUcesnik}
                  style={{ width: "80%", maxWidth: "90%" }}
                  type="number"
                  placeholder="Godina rođenja"
                  required
                />
              </Form.Group>
              <br />
              <Form.Group>
                <Form.Control
                  name="mestoBoravista"
                  value={ucesnik.mestoBoravista}
                  onChange={handleChangeUcesnik}
                  style={{ width: "80%", maxWidth: "90%" }}
                  type="text"
                  placeholder="Mesto boravišta"
                  required
                />
              </Form.Group>
              <br />
              <Form.Group>
                <Form.Control
                  name="brojTelefona"
                  value={ucesnik.brojTelefona}
                  onChange={handleChangeUcesnik}
                  style={{ width: "80%", maxWidth: "90%" }}
                  type="text"
                  placeholder="Broj telefona"
                  required
                />
              </Form.Group>
              <br />
              <Form.Group>
                <Form.Control
                  name="email"
                  value={ucesnik.email}
                  onChange={handleChangeUcesnik}
                  style={{ width: "80%", maxWidth: "90%" }}
                  type="text"
                  placeholder="E-mail"
                  required
                />
              </Form.Group>
              <br />
              <Form.Group>
                <Form.Control
                  name="organizacija"
                  value={ucesnik.organizacija}
                  onChange={handleChangeUcesnik}
                  style={{ width: "80%", maxWidth: "90%" }}
                  type="text"
                  placeholder="Organizacija"
                  required
                />
              </Form.Group>
              <br />
            </Form>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleDodajUcesnika} variant="success">
            Dodaj učesnika
          </Button>
          &nbsp;
          <Button onClick={handleCloseUcesnik} variant="danger">
            Završi
          </Button>
          &nbsp;
        </Modal.Footer>
      </Modal>

      <Modal
        show={showDialogUcesnik}
        onHide={handleCloseDialogUcesnik}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Dodavanje učesnika</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row className="align-items-center">
            <Col className="col-sm-3">
              <Image
                src={ucesniciImage}
                alt="slika"
                width="45"
                height="45"
                className="text-center mx-1 mx-md-4"
              />
            </Col>
            <Col className="col-sm-9">
              <p>
                Da li želite da dodate učesnike? <br />
              </p>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={handleShowUcesnici}>
            Dodaj učesnike
          </Button>
          <Button variant="danger" onClick={handleCloseDialogUcesnik}>
            Zatvori
          </Button>
        </Modal.Footer>
      </Modal>

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
    </>
  );
};

export default DogadjajList;
