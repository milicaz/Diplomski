import React, { useEffect, useState } from "react";
import { Alert, Form } from "react-bootstrap";
import httpCommon from "../../http-common";
import CoworkingTabelaItem from "./CoworkingTabelaItem";
import Pagination from "../Pagination";

export const CoworkingTabela = () => {
  const [posete, setPosete] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [sortOrder, setSortOrder] = useState("ascending");

  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);

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
        nazivMestaPosete: poseta.nazivMestaPosete,
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
        posetePoMesecima: [],
      };
      entry.posete.push(yearEntry);
    }

    yearEntry.posetePoMesecima.push({
      mesecPosete: poseta.mesecPosete,
      mesecniBrojPoseta: poseta.mesecniBrojPoseta,
    });

    return acc;
  }, []);

  // Sortiranje poseteZaPrikaz po celokupnom broju poseta u opadajućem redosledu
  const sortiranePoseteZaPrikaz = (items) => {
    return items.slice().sort((a, b) => {
      if (sortOrder === "ascending") {
        return (
          a.posete.reduce(
            (total, visit) => total + visit.godisnjiBrojPoseta,
            0
          ) -
          b.posete.reduce((total, visit) => total + visit.godisnjiBrojPoseta, 0)
        );
      } else {
        return (
          b.posete.reduce(
            (total, visit) => total + visit.godisnjiBrojPoseta,
            0
          ) -
          a.posete.reduce((total, visit) => total + visit.godisnjiBrojPoseta, 0)
        );
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

  return (
    <>
      <div>
        <Form.Control
          type="text"
          placeholder="Pretraga po imenu ili prezimenu"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="mb-4"
        />
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
