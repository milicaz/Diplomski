import { Col, Image, Row } from "react-bootstrap";
import { binImage } from "../../../assets";

const DeleteUcesnikForm = ({ deleteUcesnik }) => {

    return(
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
              Da li ste sigurni da želite da obrišete učesnika
              <br />
              <b>
                <i>{deleteUcesnik?.ime}</i>{" "}
                <i>{deleteUcesnik?.prezime}</i>
              </b>{" "}
            </p>
          </Col>
        </Row>
      </>
    )
}

export default DeleteUcesnikForm;