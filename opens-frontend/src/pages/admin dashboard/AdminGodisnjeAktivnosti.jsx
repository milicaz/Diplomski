import ChartDataLabels from "chartjs-plugin-datalabels";
import React from "react";
import { Pie } from "react-chartjs-2";

export const AdminGodisnjeAktivnosti = ({ aktivnosti }) => {
  const currentYear = new Date().getFullYear();

  const baseColors = [
    [
      "rgba(245, 111, 102, 0.5)", // Light red
      "rgba(97, 205, 220, 0.5)", // Light blue
      "rgba(161, 139, 189, 0.5)", // Light purple
    ],
    [
      "rgba(245, 111, 102, 0.7)", // Darker red
      "rgba(97, 205, 220, 0.7)", // Darker blue
      "rgba(161, 139, 189, 0.7)", // Darker purple
    ],
    [
      "rgba(245, 111, 102, 0.9)", // Almost solid red
      "rgba(97, 205, 220, 0.9)", // Almost solid blue
      "rgba(161, 139, 189, 0.9)", // Almost solid purple
    ],
  ];

  // Funkcija za generisanje boja
  const generateColors = (brojAktivnosti) => {
    const backgroundColors = [];
    const borderColors = [];

    // Prolazimo kroz aktivnosti i dodajemo boje na osnovu indeksa
    for (let i = 0; i < brojAktivnosti; i++) {
      const cycleIndex = Math.floor(i / 3) % baseColors.length;
      const colorSet = baseColors[cycleIndex];

      backgroundColors.push(colorSet[i % 3]);
      borderColors.push(
        colorSet[i % 3]
          .replace("0.5", "1")
          .replace("0.7", "1")
          .replace("0.9", "1")
      );
    }

    return { backgroundColors, borderColors };
  };

  if (aktivnosti.length === 0) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        <h5
          style={{
            fontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
            fontSize: "20px",
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          Nema podataka za aktivnosti u {currentYear}. godini
        </h5>
      </div>
    );
  }

  const { backgroundColors, borderColors } = generateColors(aktivnosti.length);

  const data = {
    labels: aktivnosti.map((a) => a.vrstaNaziv),
    datasets: [
      {
        label: `Broj događaja u ${currentYear}. godinu`,
        data: aktivnosti.map((a) => a.brojDogadjaja),
        backgroundColor: backgroundColors,
        borderColor: borderColors,
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