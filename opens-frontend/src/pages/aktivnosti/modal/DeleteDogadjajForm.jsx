import { Col, Image, Row } from "react-bootstrap";
import { binImage } from "../../../assets";

const DeleteDogadjajForm = ({ deleteDogadjaj }) => {
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
            Da li ste sigurni da želite da obrišete događaj
            <br />
            <b>
              <i>{deleteDogadjaj.naziv}</i>
            </b>{" "}
            sa njegovim učesnicima?
          </p>
        </Col>
      </Row>
    </>
  );
};

export default DeleteDogadjajForm;
