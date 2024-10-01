import React, { useEffect, useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
import httpCommon from "../../http-common";
import eventBus from "../../utils/eventBus";
import OmladinskiCentarTabela from "./OmladinskiCentarTabela";
import OmladinskiCentarTrenutno from "./OmladinskiCentarTrenutno";

export const OmladinskiCentar = () => {
  const [mestaPosete, setMestaPosete] = useState([]);

  useEffect(() => {
    fetchMestaPosete();
  }, []);

  const fetchMestaPosete = async () => {
    try {
      const { data } = await httpCommon.get("/mestaPosete");
      setMestaPosete(data);
    } catch (error) {
      if (error.response && (error.response.status === 401 || error.response.status === 400)) {
        eventBus.dispatch("logout");
    } else {
        console.error("Greška prilikom fetching mesta posete: ", error);
    }
    }
  };

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
