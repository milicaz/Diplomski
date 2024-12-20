import "chart.js/auto";
import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { useLocation, useNavigate } from "react-router-dom";
import useHttpProtected from "../../hooks/useHttpProtected";
import useToast from "../../hooks/useToast";
import { Card } from "react-bootstrap";

export const AdminMesecnePoseteCoworking = ({ mestoPoseteId, backgroundColor, borderColor }) => {
  const [mesecnePosete, setMesecnePosete] = useState([]);
  console.log("Posete: ", mesecnePosete);

  const httpProtected = useHttpProtected();
  const navigate = useNavigate();
  const location = useLocation();
  const { handleShowToast } = useToast();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const fetchMesecnePosete = async () => {
      try {
        const { data } = await httpProtected.get(`/admin/${mestoPoseteId}`, {
          signal: controller.signal,
        });
        if (isMounted) {
          setMesecnePosete(data);
        }
      } catch (error) {
        if (error.response?.status === 404) {
          handleShowToast("Greška", "", "danger");
        } else if (error.response?.status >= 500) {
          handleShowToast("Greška", "", "danger");
        } else if (error.name !== "CanceledError") {
          console.error(
            "An error occurred while fetching mesecne posete: ",
            error
          );
          navigate("/logovanje", { state: { from: location }, replace: true });
        }
      }
    };

    fetchMesecnePosete();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [mestoPoseteId]);

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

  const data = {
    labels: latestMonthsData.map((item) => monthNames[item.mesec - 1]),
    datasets: [
      {
        label: `Mesečni broj poseta u ${currentYear}. godinu`,
        data: latestMonthsData.map((item) => item.mesecniBroj),
        backgroundColor: backgroundColor,
        borderColor: borderColor,
        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      title: {
        display: true,
        position: "top",
        text: `${mesecnePosete.length > 0 ? mesecnePosete[0].nazivMesta : ""}`,
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

  // If there is no data, don't render anything
  if (mesecnePosete.length === 0) {
    return null; // This will prevent rendering the Bar chart component entirely
  }

  return (
    <>
      <Card className="card-shadow">
        <Card.Body>
          <Bar data={data} options={options} />
        </Card.Body>
      </Card>
    </>
  );
};
export default AdminMesecnePoseteCoworking;
