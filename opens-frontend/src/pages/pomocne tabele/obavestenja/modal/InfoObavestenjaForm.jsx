import React from "react";
import { Card } from "react-bootstrap";
import ReactMarkdown from "react-markdown";

export const InfoObavestenjaForm = ({ infoObavestenje }) => {
  return (
    <Card>
      <Card.Body>
        <Card.Title className="mb-3">{infoObavestenje.naziv}</Card.Title>
        <Card.Subtitle className="mb-3 text-muted fst-italic">
          Početak prikazivanja:{" "}
          {new Date(infoObavestenje.pocetakPrikazivanja).toLocaleDateString(
            "sr-SR"
          )}{" "}
          <br />
          Kraj prikazivanja:{" "}
          {new Date(infoObavestenje.krajPrikazivanja).toLocaleDateString(
            "sr-SR"
          )}
        </Card.Subtitle>
        <div
          style={{
            maxHeight: "700px", // You can adjust this value as needed
            overflowY: "auto", // Adds vertical scroll
            paddingRight: "10px", // Optional, adds some space to the right if needed for scrollbars
          }}
        >
          <ReactMarkdown>{infoObavestenje.tekst}</ReactMarkdown>
        </div>
      </Card.Body>
    </Card>
  );
};

