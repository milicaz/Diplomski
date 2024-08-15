import React from "react";

export const OmladinskiCentarPrvePoseteTabelaItem = ({ prvaPoseta }) => {
  const rodText = (rod) => {
    switch (rod) {
      case "MUSKO":
        return "muško";
      case "ZENSKO":
        return "žensko";
      case "DRUGO":
        return "drugo";
      default:
        return "";
    }
  };

  const mesecText = (mesec) => {
    switch (mesec) {
      case 1:
        return "januar";
      case 2:
        return "februar";
      case 3:
        return "mart";
      case 4:
        return "april";
      case 5:
        return "maj";
      case 6:
        return "jun";
      case 7:
        return "jul";
      case 8:
        return "avgust";
      case 9:
        return "septembar";
      case 10:
        return "oktobar";
      case 11:
        return "novembar";
      case 12:
        return "decembar";
    }
  };
  
  return (
    <>
      <td>
        {prvaPoseta.ime} {prvaPoseta.prezime}
      </td>
      <td>{prvaPoseta.godine}</td>
      <td>{rodText(prvaPoseta.rod)}</td>
      <td>{prvaPoseta.nazivMesta}</td>
      <td>
        {mesecText(prvaPoseta.mesecPosete)} {prvaPoseta.godinaPosete}.
      </td>
    </>
  );
};
export default OmladinskiCentarPrvePoseteTabelaItem;
