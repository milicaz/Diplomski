import "chart.js/auto";
import React, { useCallback, useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import httpCommon from "../../http-common";

export const AdminMesecnePoseteCoworking = ({ mestoPoseteId }) => {
  const [mesecnePosete, setMesecnePosete] = useState([]);

  const fetchMesecnePosete = useCallback(async () => {
    const { data } = await httpCommon.get(`/admin/${mestoPoseteId}`);
    setMesecnePosete(data);
  }, [mestoPoseteId, setMesecnePosete]);

  useEffect(() => {
    fetchMesecnePosete();
  }, [fetchMesecnePosete]);

  const monthNames = [
    "Januar",
    "Februar",
    "Mart",
    "April",
    "Maj",
    "Jun",
    "Jul",
    "Avgust",
    "Septembar",
    "Oktobar",
    "Novembar",
    "Decembar",
  ];

  const currentYear = new Date().getFullYear();
  const filteredData = mesecnePosete
    .filter((item) => item.godina === currentYear)
    .sort((a, b) => a.mesec - b.mesec);
  const latestMonthsData =
    filteredData.length > 5 ? filteredData.slice(-5) : filteredData;

  const getBackgroundColor = (mestoPoseteId) => {
    switch (mestoPoseteId) {
      case 1:
        return ["rgba(163, 197, 123, 0.5)"];
      case 2:
        return ["rgba(251, 181, 55, 0.5)"];
      default:
        return ["rgba(163, 197, 123, 0.5)"];
    }
  };

  const getBorderColor = (mestoPoseteId) => {
    switch (mestoPoseteId) {
      case 1:
        return ["rgba(163, 197, 123, 1)"];
      case 2:
        return ["rgba(251, 181, 55, 1)"];
      default:
        return ["rgba(163, 197, 123, 1)"];
    }
  };

  const modifyNazivMesta = (nazivMesta) => {
    if (nazivMesta === "Coworking prostor") {
      return "Coworking prostora";
    } else if (nazivMesta === "Omladinski klub") {
      return "Omladinskom klubu";
    }
    return nazivMesta;
  };

  const modifyNaziv = (nazivMesta) => {
    if (nazivMesta === "Coworking prostor") {
      return "Coworking prostoru";
    } else if (nazivMesta === "Omladinski klub") {
      return "Omladinskom klubu";
    }
    return nazivMesta;
  };

  const data = {
    labels: latestMonthsData.map((item) => monthNames[item.mesec - 1]),
    datasets: [
      {
        label: `Broj poseta ${
          mesecnePosete.length > 0
            ? modifyNazivMesta(mesecnePosete[0].nazivMesta)
            : ""
        } za ${currentYear}. godinu`,
        data: latestMonthsData.map((item) => item.mesecniBroj),
        backgroundColor: getBackgroundColor(mestoPoseteId),
        borderColor: getBorderColor(mestoPoseteId),
        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      title: {
        display: true,
        position: "top",
        text: `Mesečni broj poseta u ${
          mesecnePosete.length > 0
            ? modifyNaziv(mesecnePosete[0].nazivMesta)
            : ""
        }`,
        font: {
          size: 20,
        },
        padding: {
          top: 30,
          bottom: 10,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <>
      <Bar data={data} options={options} />
    </>
  );
};
export default AdminMesecnePoseteCoworking;
