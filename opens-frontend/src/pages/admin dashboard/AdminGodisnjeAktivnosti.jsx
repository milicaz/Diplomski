import React from "react";
import { Pie } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";

export const AdminGodisnjeAktivnosti = ({ aktivnosti }) => {
  const currentYear = new Date().getFullYear();

  const data = {
    labels: ["Interne aktivnosti", "Eksterne aktivnosti", "Kulturna stanica"],
    datasets: [
      {
        label: `Broj događaja u ${currentYear}. godinu`,
        data: aktivnosti.map((a) => a.brojDogadjaja),
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

  const options = {
    plugins: {
      datalabels: {
        formatter: (value) => {
          return value + " aktivnosti";
        },
        color: "#000", // Color of the data labels
        display: true,
      },
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
  };

  return (
    <>
      <Pie data={data} options={options} plugins={[ChartDataLabels]} />
    </>
  );
};

export default AdminGodisnjeAktivnosti;
