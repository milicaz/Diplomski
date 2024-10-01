import { createContext, useEffect, useState } from "react";
import httpCommon from "../../../http-common";
import eventBus from "../../../utils/eventBus";

export const TipDogadjajaContext = createContext();

const TipDogadjajaContextProvider = (props) => {
  const [tipoviDogadjaja, setTipoviDogadjaja] = useState([]);

  useEffect(() => {
    getTipovi();
  }, []);

  const sortedTipoviDogadjaja = tipoviDogadjaja.sort((a, b) => a.id - b.id);

  const getTipovi = async () => {
    try {
      const { data } = await httpCommon.get("/tipoviDogadjaja");
      setTipoviDogadjaja(data);
    } catch (error) {
      if (
        error.response &&
        (error.response.status === 401 || error.response.status === 400)
      ) {
        eventBus.dispatch("logout");
      } else {
        console.error("Greška prilikom fetching tipova događaja: ", error);
      }
    }
  };

  const addTip = async (addTip) => {
    try {
      await httpCommon.post("/tipoviDogadjaja", addTip);
      getTipovi();
    } catch (error) {
      if (
        error.response &&
        (error.response.status === 401 || error.response.status === 400)
      ) {
        eventBus.dispatch("logout");
      } else {
        console.error("Greška prilikom dodavanja tipa događaja: ", error);
      }
    }
  };

  const editTip = async (id, editTip) => {
    try {
      await httpCommon.put(`/tipoviDogadjaja/${id}`, editTip);
      getTipovi();
    } catch (error) {
      if (
        error.response &&
        (error.response.status === 401 || error.response.status === 400)
      ) {
        eventBus.dispatch("logout");
      } else {
        console.error("Greška prilikom izmene tipa događaja: ", error);
      }
    }
  };

  const deleteTip = async (id) => {
    try {
      await httpCommon.delete(`/tipoviDogadjaja/${id}`);
      getTipovi();
    } catch (error) {
      if (
        error.response &&
        (error.response.status === 401 || error.response.status === 400)
      ) {
        eventBus.dispatch("logout");
      } else {
        console.error("Greška prilikom brisanja tipova događaja: ", error);
      }
    }
  };

  return (
    <TipDogadjajaContext.Provider
      value={{ sortedTipoviDogadjaja, addTip, editTip, deleteTip }}
    >
      {props.children}
    </TipDogadjajaContext.Provider>
  );
};

export default TipDogadjajaContextProvider;
