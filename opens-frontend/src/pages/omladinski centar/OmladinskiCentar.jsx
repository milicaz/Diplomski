import React, { useEffect, useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import useHttpProtected from "../../hooks/useHttpProtected";
import OmladinskiCentarTabela from "./OmladinskiCentarTabela";
import OmladinskiCentarTrenutno from "./OmladinskiCentarTrenutno";

export const OmladinskiCentar = () => {
  const [mestaPosete, setMestaPosete] = useState([]);

  const httpProtected = useHttpProtected();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const fetchMestaPosete = async () => {
      try {
        const { data } = await httpProtected.get("/mestaPosete", {
          signal: controller.signal,
        });
        if (isMounted) {
          setMestaPosete(data);
        }
      } catch (error) {
        if (error.name !== "CanceledError") {
          console.error("Greška prilikom fetching mesta posete: ", error);
          navigate("/logovanje", { state: { from: location }, replace: true });
        }
      }
    };

    fetchMestaPosete();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  const getTabColorClass = (index) => {
    const colorClasses = [
      "first-tab",
      "second-tab",
      "third-tab",
      "fourth-tab",
      "fifth-tab",
    ];
    const colorIndex = index % colorClasses.length; // Use modulo to cycle through colors
    return colorClasses[colorIndex];
  };

  return (
    <>
      <Tabs defaultActiveKey={1} fill>
        {mestaPosete.map((mestoPosete, index) => (
          <Tab
            eventKey={mestoPosete.id}
            title={mestoPosete.nazivMesta}
            key={mestoPosete.id}
            className={getTabColorClass(index)}
          >
            <Tabs defaultActiveKey={1} fill>
              <Tab
                eventKey="1"
                title={`${mestoPosete.nazivMesta} - trenutno`}
                key="1"
              >
                <OmladinskiCentarTrenutno
                  mestoPoseteId={mestoPosete.id}
                  mestoPoseteNaziv={mestoPosete.nazivMesta}
                />
              </Tab>
              <Tab
                eventKey="2"
                title={`${mestoPosete.nazivMesta} - tabela poseta`}
                key="2"
              >
                <OmladinskiCentarTabela
                  mestoPoseteId={mestoPosete.id}
                  mestoPoseteNaziv={mestoPosete.nazivMesta}
                />
              </Tab>
            </Tabs>
          </Tab>
        ))}
      </Tabs>
    </>
  );
};
export default OmladinskiCentar;
