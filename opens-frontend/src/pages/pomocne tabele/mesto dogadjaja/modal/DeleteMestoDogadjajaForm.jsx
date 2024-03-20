import { Col, Image, Row } from "react-bootstrap";
import { binImage } from "../../../../assets";

const DeleteMestoDogadjajaForm = ({ deleteMestoDogadjaja }) => {
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
            Da li ste sigurni da želite da obrišete <br />
            <b>
              <i>{deleteMestoDogadjaja.nazivSale}</i>
            </b>{" "}
            ?
          </p>
        </Col>
      </Row>
    </>
  );
};

export default DeleteMestoDogadjajaForm;
