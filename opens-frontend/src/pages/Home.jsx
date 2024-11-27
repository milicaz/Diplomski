import "chart.js/auto";
import React, { useEffect, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import useHttpProtected from "../hooks/useHttpProtected";
import useToast from "../hooks/useToast";
import { AdminGodisnjeAktivnosti, AdminMesecnePosete } from "./admin dashboard";

export const Home = () => {
  const [posete, setPosete] = useState([]);
  const [ucesnici, setUcesnici] = useState([]);
  const [dogadjaji, setDogadjaji] = useState([]);
  const [mestaPosete, setMestaPosete] = useState([]);

  const httpProtected = useHttpProtected();
  const navigate = useNavigate();
  const location = useLocation();
  const { handleShowToast } = useToast();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const fetchData = async () => {
      try {
        const currentYear = new Date().getFullYear();
        const requests = [
          httpProtected.get("/admin/posete", { signal: controller.signal }),
          httpProtected.get("/admin/ucesnici", { signal: controller.signal }),
          httpProtected.get(`/admin/dogadjaji/${currentYear}`, {
            signal: controller.signal,
          }),
          httpProtected.get("/mestaPosete", { signal: controller.signal }),
        ];
        const [poseteData, ucesniciData, dogadjajiData, mestaPoseteData] =
          await Promise.all(requests);

        if (isMounted) {
          setPosete(poseteData.data);
          setUcesnici(ucesniciData.data);
          setDogadjaji(dogadjajiData.data);
          setMestaPosete(mestaPoseteData.data);
        }
      } catch (error) {
        if (error.response?.status >= 500) {
          handleShowToast(
            "Greška",
            "Došlo je do greške na serveru prilikom učitavanju podataka. Molimo pokušajte ponovo kasnije.",
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
  }, []);

  const sortedMestaPosete =
    mestaPosete.length > 0
      ? mestaPosete.sort((a, b) => (a.id < b.id ? -1 : 1))
      : [];

  const getCardColor = (tipDogadjaja) => {
    switch (tipDogadjaja.toLowerCase()) {
      case "interne aktivnosti":
        return "card-shadow bg-c-red";
      case "eksterne aktivnosti":
        return "card-shadow bg-c-blue";
      case "kulturna stanica":
        return "card-shadow bg-c-purple";
    }
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <>
      <Row>
        {posete.map((p) => (
          <Col key={p.mestoPoseteId}>
            <Card
              className={
                p.mestoPoseteId % 2 === 0
                  ? "card-shadow bg-c-yellow"
                  : "card-shadow bg-c-green"
              }
            >
              <Card.Body>
                <h6 className="card-naslov">{p.nazivMesta}</h6>
                <Row>
                  <Col>Ukupno poseta</Col>
                </Row>
                <Row>
                  <Col
                    className={
                      p.brojPoseta.toString().length >= 20
                        ? "card-smallest-text"
                        : p.brojPoseta.toString().length > 11
                        ? "card-smaller-text"
                        : "card-text"
                    }
                  >
                    {p.brojPoseta}
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        ))}

        {ucesnici.map((u) => (
          <Col key={u.tipDogadjajaId}>
            <Card className={getCardColor(u.tipDogadjaja)}>
              <Card.Body>
                <h6 className="card-naslov">
                  {capitalizeFirstLetter(u.tipDogadjaja)}
                </h6>
                <Row>
                  <Col>Ukupno učesnika</Col>
                </Row>
                <Row>
                  <Col
                    className={
                      u.brojUcesnika.toString().length >= 20
                        ? "card-smallest-text"
                        : u.brojUcesnika.toString().length > 11
                        ? "card-smaller-text"
                        : "card-text"
                    }
                  >
                    {u.brojUcesnika}
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <Container className="mt-3">
        <Row>
          <Col md={6}>
            {sortedMestaPosete.map((mestoPosete) => (
              <Row className="mb-3" key={mestoPosete.id}>
                <Col>
                  <Card className="card-shadow">
                    <Card.Body>
                      <AdminMesecnePosete mestoPoseteId={mestoPosete.id} />
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            ))}
          </Col>
          <Col md={6}>
            <Card className="card-shadow card-height">
              <Card.Body className="justify-content-center">
                <AdminGodisnjeAktivnosti aktivnosti={dogadjaji} />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default Home;
