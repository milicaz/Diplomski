import { createContext, useEffect, useState } from "react";
import httpCommon from "../../../http-common";
import eventBus from "../../../utils/eventBus";

export const TipOprContext = createContext();

const TipOprContextProvider = (props) => {
  const [tipoviOpreme, setTipoviOpreme] = useState([]);

  useEffect(() => {
    fetchTipoveOpreme();
  }, []);

  const sortedTipoviOpreme =
    tipoviOpreme.length > 0
      ? tipoviOpreme.sort((a, b) => (a.id < b.id ? -1 : 1))
      : [];

  const fetchTipoveOpreme = async () => {
    try {
      const { data } = await httpCommon.get("/tipoviOpreme");
      setTipoviOpreme(data);
    } catch (error) {
      if (
        error.response &&
        (error.response.status === 401 || error.response.status === 400)
      ) {
        eventBus.dispatch("logout");
      } else {
        console.error("Greška prilikom fetching tipova opreme: ", error);
      }
    }
  };

  const addTipOpreme = async (newTipOpreme) => {
    try {
      await httpCommon.post("/tipoviOpreme", newTipOpreme);
      fetchTipoveOpreme();
    } catch (error) {
      if (
        error.response &&
        (error.response.status === 401 || error.response.status === 400)
      ) {
        eventBus.dispatch("logout");
      } else {
        console.error("Greška prilikom dodavanja tipa opreme: ", error);
      }
    }
  };

  const editTipOpreme = async (id, updatedTipOpreme) => {
    try {
      await httpCommon.put(`/tipoviOpreme/${id}`, updatedTipOpreme);
      fetchTipoveOpreme();
    } catch (error) {
      if (
        error.response &&
        (error.response.status === 401 || error.response.status === 400)
      ) {
        eventBus.dispatch("logout");
      } else {
        console.error("Greška prilikom izmene tipa opreme: ", error);
      }
    }
  };

  const deleteTipOpreme = async (id) => {
    try {
      await httpCommon.delete(`/tipoviOpreme/${id}`);
      fetchTipoveOpreme();
    } catch (error) {
      if (
        error.response &&
        (error.response.status === 401 || error.response.status === 400)
      ) {
        eventBus.dispatch("logout");
      } else {
        console.error("Greška prilikom brisanja tipa opreme: ", error);
      }
    }
  };

  return (
    <TipOprContext.Provider
      value={{
        sortedTipoviOpreme,
        addTipOpreme,
        editTipOpreme,
        deleteTipOpreme,
      }}
    >
      {props.children}
    </TipOprContext.Provider>
  );
};

export default TipOprContextProvider;
