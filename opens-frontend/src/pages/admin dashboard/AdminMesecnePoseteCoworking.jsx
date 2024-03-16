import "chart.js/auto";
import React from "react";
import { Bar } from "react-chartjs-2";

export const AdminMesecnePoseteCoworking = ({ mesecnePosete }) => {
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

  const data = {
    labels: latestMonthsData.map((item) => monthNames[item.mesec - 1]),
    datasets: [
      {
        label: `Broj poseta Coworking prostora za ${currentYear}. godinu`,
        data: latestMonthsData.map((item) => item.mesecniBroj),
        backgroundColor: ["rgba(163, 197, 123, 0.5)"],
        borderColor: ["rgba(163, 197, 123, 1)"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      title: {
        display: true,
        position: "top",
        text: "Mesečni broj poseta u Coworking prostoru",
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
