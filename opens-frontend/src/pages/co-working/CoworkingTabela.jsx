import React, { useEffect, useState } from "react";
import { Alert, Button, Form, Spinner } from "react-bootstrap";
import { FaRegFilePdf } from "react-icons/fa";
import { RiFileExcel2Fill } from "react-icons/ri";
import httpCommon from "../../http-common";
import Pagination from "../Pagination";
import CoworkingTabelaItem from "./CoworkingTabelaItem";

export const CoworkingTabela = () => {
  const [posete, setPosete] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [dateInput, setDateInput] = useState(null);
  const [sortOrder, setSortOrder] = useState("ascending");

  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    fetchPosete();
  }, []);

  const fetchPosete = async () => {
    const { data } = await httpCommon.get("/posete/coworking");
    setPosete(data);
  };

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

  // Sortiranje poseteZaPrikaz po celokupnom broju poseta u opadajućem redosledu
  const sortiranePoseteZaPrikaz = (items) => {
    return items.slice().sort((a, b) => {
      if (sortOrder === "ascending") {
        return a.totalPosete - b.totalPosete;
      } else {
        return b.totalPosete - a.totalPosete;
      }
    });
  };

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

  const shouldShowPagination =
    searchInput.trim() === "" && poseteZaPrikaz.length >= 10;

  const onInputChange = (e) => {
    setLimit(e.target.value);
  };

  // Reset current page to 1 kad je search obrisan
  useEffect(() => {
    if (searchInput.trim() === "") {
      setCurrentPage(1);
    }
  }, [searchInput]);

  const date = new Date();
  const formattedDate = `${date.getDate()}-${
    date.getMonth() + 1
  }-${date.getFullYear()}`;

  const handlePDFDownload = async () => {
    if (!dateInput) {
      alert("Izaberite mesec i godinu prvo");
      return;
    }

    setDownloading(true);

    const mesec = new Date(dateInput).getMonth() + 1;
    const godina = new Date(dateInput).getFullYear();

    setTimeout(async () => {
      setDownloading(false);

      try {
        const response = await httpCommon.get(
          `/coworking/pdf/${mesec}/godina/${godina}`,
          {
            responseType: "blob",
          }
        );

        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;

        link.setAttribute(
          "download",
          "Evidencija direktnih posetioca Coworkinga-" + formattedDate + ".pdf"
        );
        document.body.appendChild(link);
        link.click();

        link.parentNode.removeChild(link);
        window.URL.revokeObjectURL(url);
      } catch (error) {
        console.error("Error downloading PDF:", error);
      }
    }, 2000);
  };

  return (
    <>
      <div className="row align-items-center mb-4">
        <div className="col">
          <Form.Control
            type="text"
            placeholder="Pretraga po imenu ili prezimenu"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
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
            onClick={handlePDFDownload}
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
                />
                PDF
              </>
            ) : (
              <>
                <FaRegFilePdf size={20} /> PDF
              </>
            )}
          </Button>
          <Button className="mx-1" variant="success">
            <RiFileExcel2Fill size={20} /> EXCEL
          </Button>
        </div>
      </div>

      <div className="row my-2">
        <div className="col-sm-8">
          {poseteZaPrikaz && shouldShowPagination && (
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
              </Form.Select>
            </div>
          </div>
        </div>
      </div>

      {currentItems.length === 0 && (
        <Alert variant="secondary" className="mb-4 text-center">
          Nema stavki za prikazivanje.
        </Alert>
      )}

      {currentItems.map((posetilac, index) => (
        <CoworkingTabelaItem key={index} posetilac={posetilac} />
      ))}

      {poseteZaPrikaz && shouldShowPagination && (
        <Pagination
          pages={totalPages}
          setCurrentPage={setCurrentPage}
          array={filteredPosete}
          limit={limit}
        />
      )}
    </>
  );
};
export default CoworkingTabela;
