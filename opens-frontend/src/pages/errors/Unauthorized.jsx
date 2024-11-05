import React from "react";
import { Button, Col, Container, Image, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { opensBojaImage } from "../../assets";

export const Unauthorized = () => {
  const navigate = useNavigate();

  const goBack = () => navigate(-1);
  return (
    <Container className="text-center mt-5">
      <Row className="mb-5">
        <Col>
          <Image src={opensBojaImage} alt="403 Unauthorized" fluid />
        </Col>
      </Row>
      <Row className="my-5">
        <Col>
          <h1>Pristup zabranjen</h1>
          <p className="text-muted mt-3">
            Pokušali ste da pristupite stranici za koju niste imali prethodnu
            dozvolu.
          </p>
          <Button onClick={goBack} className="btn btn-primary mt-3">
            Idite na prethodnu stranu
          </Button>
        </Col>
      </Row>
    </Container>
  );
};
export default Unauthorized;
