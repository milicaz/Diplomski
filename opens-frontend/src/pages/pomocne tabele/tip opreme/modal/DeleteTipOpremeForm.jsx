import React from "react";
import { Col, Image, Row } from "react-bootstrap";
import { binImage } from "../../../../assets";

export const DeleteTipOpremeForm = ({ tipOpreme }) => {
  return (
    <>
      <Row className="align-items-center">
        <Col className="col-sm-3">
          <Image
            src={binImage}
            alt="slika"
            width="45"
            height="45"
            className="text-center mx-1 mx-md-4"
          />
        </Col>
        <Col className="col-sm-9">
          <p>
            Da li ste sigurni da želite da obrišete tip opreme
            <br />
            <b>
              <i>{tipOpreme.naziv}*</i>
            </b>{" "}
            ?
          </p>
          <small className="text-muted">
            * Uklanjanjem ovog tipa opreme, sva povezana oprema će takođe biti
            obrisana.
          </small>
        </Col>
      </Row>
    </>
  );
};
export default DeleteTipOpremeForm;
