import React, { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import httpCommon from "../../http-common";
import OmladinskiKlubTabelaItem from "./OmladinskiKlubTabelaItem";

export const OmladinskiKlubTabela = () => {
  const [posete, setPosete] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    fetchPosete();
  }, []);

  const fetchPosete = async () => {
    const { data } = await httpCommon.get("/posete/omladinski");
    setPosete(data);
  };

  const handleTextChange = (searchValue) => {
    setSearchInput(searchValue);
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
  const sortiranePoseteZaPrikaz = poseteZaPrikaz.sort(
    (a, b) =>
      b.posete.reduce((total, visit) => total + visit.godisnjiBrojPoseta, 0) -
      a.posete.reduce((total, visit) => total + visit.godisnjiBrojPoseta, 0)
  );

  const filtriranePosete = sortiranePoseteZaPrikaz.filter((item) => {
    return (
      item.ime.toLowerCase().includes(searchInput.toLowerCase()) ||
      item.prezime.toLowerCase().includes(searchInput.toLowerCase())
    );
  });
  return (
    <>
      <Row className="mb-4">
        <Form.Group as={Col}>
          {/* <Form.Label>Pretraga</Form.Label> */}
          <Form.Control
            type="text"
            placeholder="Pretraga..."
            onChange={(e) => handleTextChange(e.target.value)}
          />
        </Form.Group>
      </Row>
      {filtriranePosete.map((posetilac, index) => (
        <OmladinskiKlubTabelaItem key={index} posetilac={posetilac} />
      ))}
    </>
  );
};
export default OmladinskiKlubTabela;
