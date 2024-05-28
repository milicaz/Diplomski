import React from 'react'
import { Tab, Tabs } from 'react-bootstrap';
import QRCheckIn from './QRCheckIn';
import Login from './Login';

export const MainCheckIn = () => {
  return (
    <>
      <Tabs
        defaultActiveKey="qrScanner"
        className="mb-5"
        fill
        justify
      >
        <Tab eventKey="qrScanner" title="Check-in putem Qr koda">
          <QRCheckIn />
        </Tab>
        <Tab eventKey="emailFinder" title="Check-in putem pretrage">
          <Login />
        </Tab>
      </Tabs>
    </>
  )
}
export default MainCheckIn;