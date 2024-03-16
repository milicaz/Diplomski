import React from "react";
import { Card, Col, Row } from "react-bootstrap";
import { Bar, Pie } from "react-chartjs-2";
import "chart.js/auto";

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Mesečne posete Coworking prostora za 2023. godinu',
    },
  },
};

const labels = ['Januar', 'Februar', 'Mart', 'April', 'Maj', 'Jun', 'Jul'];

export const coworking = {
  labels,
  datasets: [
    {
      label: 'Mesecni broj poseta za 2023. godinu',
      data: labels.map(() => ([10, 12, 20, 22, 12, 20, 4 ])),
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
  ],
};

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
                za coworking
                <Bar options={options} data={coworking} />
              </Card.Body>
            </Card>
          </Row>
          <Row>
            <Card className="card-shadow">
              <Card.Body>
                za omladinski
              </Card.Body>
            </Card>
          </Row>
        </Col>
        <Col>
          <Card className="card-shadow card-height">
            <Card.Body className="justify-content-center">
              za aktivnosti
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
                        bottom: 10
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
