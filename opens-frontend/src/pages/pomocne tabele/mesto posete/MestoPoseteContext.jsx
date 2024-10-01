import { createContext, useEffect, useState } from "react";
import httpCommon from "../../../http-common";
import eventBus from "../../../utils/eventBus";

export const MestoPoseteContext = createContext();

const MestoPoseteContextProvider = (props) => {
  const [mestaPosete, setMestaPosete] = useState([]);

  useEffect(() => {
    fetchMestaPosete();
  }, []);

  const sortedMestaPosete =
    mestaPosete.length > 0
      ? mestaPosete.sort((a, b) => (a.id < b.id ? -1 : 1))
      : [];

  //react axios get method
  const fetchMestaPosete = async () => {
    try {
      const { data } = await httpCommon.get("/mestaPosete");
      setMestaPosete(data);
    } catch (error) {
      if (
        error.response &&
        (error.response.status === 401 || error.response.status === 400)
      ) {
        eventBus.dispatch("logout");
      } else {
        console.error("Greška prilikom fetching mesta posete: ", error);
      }
    }
  };

  const addMestoPosete = async (newMestoPosete) => {
    try {
      await httpCommon.post("/mestaPosete", newMestoPosete);
      fetchMestaPosete();
    } catch (error) {
      if (
        error.response &&
        (error.response.status === 401 || error.response.status === 400)
      ) {
        eventBus.dispatch("logout");
      } else {
        console.error("Greška prilikom dodavanja mesta posete: ", error);
      }
    }
  };

  const editMestoPosete = async (id, updatedMestoPosete) => {
    try {
      await httpCommon.put(`/mestaPosete/${id}`, updatedMestoPosete);
      fetchMestaPosete();
    } catch (error) {
      if (
        error.response &&
        (error.response.status === 401 || error.response.status === 400)
      ) {
        eventBus.dispatch("logout");
      } else {
        console.error("Greška prilikom izmene mesta posete: ", error);
      }
    }
  };

  const deleteMestoPosete = async (id) => {
    try {
      await httpCommon.delete(`/mestaPosete/${id}`);
      fetchMestaPosete();
    } catch (error) {
      if (
        error.response &&
        (error.response.status === 401 || error.response.status === 400)
      ) {
        eventBus.dispatch("logout");
      } else {
        console.error("Greška prilikom brisanja mesta posete: ", error);
      }
    }
  };

  return (
    <MestoPoseteContext.Provider
      value={{
        sortedMestaPosete,
        addMestoPosete,
        editMestoPosete,
        deleteMestoPosete,
      }}
    >
      {props.children}
    </MestoPoseteContext.Provider>
  );
};

export default MestoPoseteContextProvider;
