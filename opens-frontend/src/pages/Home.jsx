import "chart.js/auto";
import React, { useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { Pie } from "react-chartjs-2";
import httpCommon from "../http-common";
import {
  AdminMesecnePoseteCoworking,
  AdminMesecnePoseteOmladinski,
} from "./admin dashboard";

const data = {
  labels: ["Interne aktivnosti", "Eksterne aktivnosti", "Kulturna stanica"],
  datasets: [
    {
      label: "broj događaja",
      data: [17, 21, 6],
      backgroundColor: [
        "rgba(245, 111, 102, 0.5)",
        "rgba(97, 205, 220, 0.5)",
        "rgba(161, 139, 189, 0.5)",
      ],
      borderColor: [
        "rgba(245, 111, 102, 1)",
        "rgba(97, 205, 220, 1)",
        "rgba(161, 139, 189, 1)",
      ],
      borderWidth: 1,
    },
  ],
};

export const Home = () => {
  const [coworking, setCoworking] = useState([]);
  const [omladinski, setOmladinski] = useState([]);

  useEffect(() => {
    fetchCoworking();
    fetchOmladinski();
  }, []);

  const fetchCoworking = async () => {
    const { data } = await httpCommon.get("/admin/coworking");
    setCoworking(data);
  };

  const fetchOmladinski = async () => {
    const { data } = await httpCommon.get("/admin/omladinski");
    setOmladinski(data);
  };

  return (
    <>
      <Row>
        <Col>
          <Card className="card-shadow bg-c-green">
            <Card.Body>
              <h6>Coworking prostor</h6>
              <Row>
                <Col>Ukupno poseta</Col>
                <Col className="card-text">100</Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card className="card-shadow bg-c-yellow">
            <Card.Body>
              <h6>Omladinski centar</h6>
              <Row>
                <Col>Ukupno poseta</Col>
                <Col className="card-text">20</Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card className="card-shadow bg-c-red">
            <Card.Body>
              <h6>Interne aktivnosti</h6>
              <Row>
                <Col>Ukupno učesnika</Col>
                <Col className="card-text">150</Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card className="card-shadow bg-c-blue">
            <Card.Body>
              <h6>Eksterne aktivnosti</h6>
              <Row>
                <Col>Ukupno učesnika</Col>
                <Col className="card-text">123</Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card className="card-shadow bg-c-purple">
            <Card.Body>
              <h6>Kulturna stanica</h6>
              <Row>
                <Col>Ukupno učesnika</Col>
                <Col className="card-text">52</Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="my-4">
        <Col>
          <Row className="mb-2">
            <Card className="card-shadow">
              <Card.Body>
                <AdminMesecnePoseteCoworking mesecnePosete={coworking} />
              </Card.Body>
            </Card>
          </Row>
          <Row>
            <Card className="card-shadow">
              <Card.Body>
                <AdminMesecnePoseteOmladinski mesecnePosete={omladinski} />
              </Card.Body>
            </Card>
          </Row>
        </Col>
        <Col>
          <Card className="card-shadow card-height">
            <Card.Body className="justify-content-center">
              <Pie
                data={data}
                options={{
                  plugins: {
                    title: {
                      display: true,
                      position: "top",
                      text: "Godišnji broj aktivnosti",
                      font: {
                        size: 20,
                      },
                      padding: {
                        top: 30,
                        bottom: 10,
                      },
                    },
                  },
                }}
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};
export default Home;
