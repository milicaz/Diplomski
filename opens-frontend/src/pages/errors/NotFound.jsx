import React from "react";
import { Col, Container, Image, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { opensBojaImage } from "../../assets";

export const NotFound = () => {
  return (
    <>
      <Container className="text-center mt-5">
        <Row className="mb-5">
          <Col>
            <Image src={opensBojaImage} alt="404 Not Found" fluid />
          </Col>
        </Row>
        <Row className="my-5">
          <Col>
            <h1>Stranica nije pronađena</h1>
            <p className="text-muted mt-3">
              Oops! Stranica koju ste tražili nije mogla da se prikaže!
            </p>
            <Link to="/" className="btn btn-primary mt-3">
              Idite na početnu stranu
            </Link>
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default NotFound;
