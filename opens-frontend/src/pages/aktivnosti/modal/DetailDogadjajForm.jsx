import React from 'react'
import { Col, Form, Row } from 'react-bootstrap'

const DetailDogadjajForm = ({currentDogadjaj}) => {
  return (
    <Form>
            <Row>
                {/* First column for id and naziv */}
                <Col md={6}>
                <Form.Group>
                    <Form.Label style={{ textAlign: 'center', width: '100%' }}><b><i>Podaci o događaju</i></b></Form.Label>
                    <p><b>Naziv:</b> {currentDogadjaj.naziv}</p>
                    <p><b>Datum:</b> {currentDogadjaj.datum}</p>
                    <p><b>Vreme:</b> {currentDogadjaj.pocetakDogadjaja} - {currentDogadjaj.krajDogadjaja}</p>
                    <p><b>Mesto:</b> {currentDogadjaj.mesto.nazivSale}</p>
                    <p><b>Vrsta:</b> {currentDogadjaj.vrsta.naziv}</p>
                    <p><b>Opis događaja:</b> {currentDogadjaj.opisDogadjaja}</p>
                </Form.Group>
                </Col>

                {/* Second column for organizacija.naziv */}
                <Col md={6}>
                <Form.Group>
                    <Form.Label style={{ textAlign: 'center', width: '100%' }}><b><i>Podaci o organizatoru događaja</i></b></Form.Label>
                    <p><b>Naziv organizacije:</b> {currentDogadjaj.organizacija.naziv}</p>
                    <p><b>Odgovorna osoba:</b> {currentDogadjaj.organizacija.odgovornaOsoba}</p>
                    <p><b>Broj telefona:</b> {currentDogadjaj.organizacija.brojTelefona}</p>
                    <p><b>Email:</b> {currentDogadjaj.organizacija.email}</p>
                    <p><b>Delatnost:</b> {currentDogadjaj.organizacija.delatnost}</p>
                    <p><b>Opis:</b> {currentDogadjaj.organizacija.opis}</p>
                    <p><b>Link:</b> {currentDogadjaj.organizacija.link}</p>
                </Form.Group>
                </Col>
            </Row>
    </Form>
  )
}

export default DetailDogadjajForm
