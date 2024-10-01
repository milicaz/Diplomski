import { createContext, useEffect, useState } from "react";
import httpCommon from "../../../http-common";
import eventBus from "../../../utils/eventBus";

export const MestoDogadjajaContext = createContext();

const MestoDogadjajaContextProvider = (props) => {
  const [mestaDogadjaja, setMestaDogadjaja] = useState([]);

  useEffect(() => {
    getMesta();
  }, []);

  const sortedMestaDogadjaja = mestaDogadjaja.sort((a, b) => a.id - b.id);

  const getMesta = async () => {
    try {
      const { data } = await httpCommon.get("/mestaDogadjaja");
      setMestaDogadjaja(data);
    } catch (error) {
      if (
        error.response &&
        (error.response.status === 401 || error.response.status === 400)
      ) {
        eventBus.dispatch("logout");
      } else {
        console.error("Greška prilikom fetching mesta događaja: ", error);
      }
    }
  };

  const addMestoDogadjaja = async (addMesto) => {
    try {
      await httpCommon.post("/mestaDogadjaja", addMesto);
      getMesta();
    } catch (error) {
      if (
        error.response &&
        (error.response.status === 401 || error.response.status === 400)
      ) {
        eventBus.dispatch("logout");
      } else {
        console.error("Greška prilikom dodavanja mesta događaja: ", error);
      }
    }
  };

  const editMestoDogadjaja = async (id, editMesto) => {
    try {
      await httpCommon.put(`/mestaDogadjaja/${id}`, editMesto);
      getMesta();
    } catch (error) {
      if (
        error.response &&
        (error.response.status === 401 || error.response.status === 400)
      ) {
        eventBus.dispatch("logout");
      } else {
        console.error("Greška prilikom izmene mesta događaja: ", error);
      }
    }
  };

  const deleteMestoDogadjaja = async (id) => {
    try {
      await httpCommon.delete(`/mestaDogadjaja/${id}`);
      getMesta();
    } catch (error) {
      if (
        error.response &&
        (error.response.status === 401 || error.response.status === 400)
      ) {
        eventBus.dispatch("logout");
      } else {
        console.error("Greška prilikom brisanja mesta događaja: ", error);
      }
    }
  };

  return (
    <MestoDogadjajaContext.Provider
      value={{
        sortedMestaDogadjaja,
        addMestoDogadjaja,
        editMestoDogadjaja,
        deleteMestoDogadjaja,
      }}
    >
      {props.children}
    </MestoDogadjajaContext.Provider>
  );
};

export default MestoDogadjajaContextProvider;
