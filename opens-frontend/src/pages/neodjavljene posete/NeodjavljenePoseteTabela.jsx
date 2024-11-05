import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem,
  Button,
  Col,
  Container,
  Row,
} from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import useHttpProtected from "../../hooks/useHttpProtected";

export const NeodjavljenePoseteTabela = () => {
  const [neodjavljene, setNeodjavljene] = useState([]);

  const httpProtected = useHttpProtected();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const fetchNeodjavljenePosete = async () => {
      try {
        const { data } = await httpProtected.get("/posete/neodjavljene", {
          signal: controller.signal,
        });
        if (isMounted) {
          setNeodjavljene(data);
        }
      } catch (error) {
        if (error.name !== "CanceledError") {
          console.error(
            "Greška prilikom fetching neodjavljane posete: ",
            error
          );
          navigate("/logovanje", { state: { from: location }, replace: true });
        }
      }
    };

    fetchNeodjavljenePosete();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  const handleVracenaOprema = async (id) => {
    const controller = new AbortController();
    try {
      await httpProtected.put(`/posete/${id}/nevracene`, {
        signal: controller.signal,
      });
      setNeodjavljene((prevNeodjavljene) =>
        prevNeodjavljene.filter((poseta) => poseta.id !== id)
      );
    } catch (error) {
      if (error.name !== "CanceledError") {
        console.error("Error:", error);
        navigate("/logovanje", { state: { from: location }, replace: true });
      }
    } finally {
      controller.abort();
    }
  };

  return (
    <>
      {neodjavljene.length === 0 && (
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
      {neodjavljene.map((poseta, index) => (
        <Accordion key={poseta.id || index}>
          <AccordionItem key={poseta.id || index} eventKey={poseta.id || index}>
            <AccordionHeader>
              <b className="mx-2">Datum i vreme poseta: </b>
              {new Date(poseta.datumPosete).toLocaleDateString("sr-SR")} u{" "}
              {poseta.vremePosete.substring(0, 5)}h
            </AccordionHeader>
            <AccordionBody>
              <div className="nedojavljene mx-2">
                <h5 className="my-2">Informacije o posetiocu</h5>
                <ul style={{ listStyleType: "none" }}>
                  <li>
                    <b>Ime i prezime:</b> {poseta.posetilac.ime}{" "}
                    {poseta.posetilac.prezime}
                  </li>
                  <li>
                    <b>Broj telefona:</b> {poseta.posetilac.brojTelefona}
                  </li>
                  <li>
                    <b>Email:</b> {poseta.posetilac.email}
                  </li>
                </ul>
                <h5>Informacije o poseti</h5>
                <ul style={{ listStyleType: "none" }}>
                  <li>
                    <b>Mesto posete:</b> {poseta.mestoPosete.nazivMesta}
                  </li>
                  <li>
                    <b>Oprema:</b>
                    <ul>
                      {poseta.oprema &&
                        poseta.oprema.length > 0 &&
                        poseta.oprema.map((oprema) => (
                          <li key={oprema.id}>
                            {oprema.tipOpreme?.naziv} ({oprema.serijskiBroj})
                          </li>
                        ))}
                    </ul>
                  </li>
                </ul>
                <div className="dugme">
                  <Button
                    onClick={() => {
                      handleVracenaOprema(poseta.id);
                    }}
                  >
                    Oprema je vraćena
                  </Button>
                </div>
              </div>
            </AccordionBody>
          </AccordionItem>
        </Accordion>
      ))}
    </>
  );
};
export default NeodjavljenePoseteTabela;
