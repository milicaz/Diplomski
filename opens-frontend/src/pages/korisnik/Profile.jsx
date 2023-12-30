import React from "react";
import { Card, Col, Image, Row } from "react-bootstrap";
import { profileImage, qrCodeImage } from "../../assets";

export const Profile = () => {
  return (
    <>
      <Card className="card-background">
        <Card.Body>
          <Card>
            <Card.Body>
              <Row className="justify-content-center">
                <Col>
                  <Image
                    src={profileImage}
                    alt="slika"
                    width="500"
                    height="500"
                  />
                </Col>
                <Col>
                  <p className="text-center h1 fw-bold mx-1 mx-md-4 mt-4">
                    Mila Milić
                  </p>
                  <p className="text-center mb-5 mx-1 mx-md-4">
                    mila.milic@mail.com
                  </p>
                  <div>
                    <h5>Informacije</h5>
                    <hr />
                    <Row>
                      <Col>
                        <h6>Mesto boravišta</h6>
                        <p className="text-muted">Novi Sad</p>
                      </Col>
                      <Col>
                        <h6>Broj telefona</h6>
                        <p className="text-muted">061 2345678</p>
                      </Col>
                    </Row>
                    <Row className="justify-content-center my-3">
                      <Col xs={6} md={4}>
                        <Image src={qrCodeImage} alt="slika" thumbnail />
                      </Col>
                    </Row>
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Card.Body>
      </Card>
    </>
  );
};
export default Profile;
