import { createContext, useEffect, useState } from "react";
import httpCommon from "../../../http-common";
import eventBus from "../../../utils/eventBus";

export const ObavestenjeContext = createContext();

const ObavestenjeContextProvider = (props) => {
  const [obavestenja, setObavestenja] = useState([]);

  useEffect(() => {
    fetchObavestenja();
  }, []);

  const sortedObavestenja =
    obavestenja.length > 0
      ? obavestenja.sort((a, b) => (a.id < b.id ? -1 : 1))
      : [];

  const fetchObavestenja = async () => {
    try {
      const { data } = await httpCommon.get("/obavestenja/validna");
      setObavestenja(data);
    } catch (error) {
      if (
        error.response &&
        (error.response.status === 401 || error.response.status === 400)
      ) {
        eventBus.dispatch("logout");
      } else {
        console.error("Greška prilikom fetching obaveštenja: ", error);
      }
    }
  };

  const addObavestenje = async (newObavestenje) => {
    try {
      await httpCommon.post("/obavestenja", newObavestenje);
      fetchObavestenja();
    } catch (error) {
      if (
        error.response &&
        (error.response.status === 401 || error.response.status === 400)
      ) {
        eventBus.dispatch("logout");
      } else {
        console.error("Greška prilikom dodavanja obaveštenja: ", error);
      }
    }
  };

  const editObavestenje = async (id, updatedObavestenje) => {
    try {
      await httpCommon.put(`/obavestenja/${id}`, updatedObavestenje);
      fetchObavestenja();
    } catch (error) {
      if (
        error.response &&
        (error.response.status === 401 || error.response.status === 400)
      ) {
        eventBus.dispatch("logout");
      } else {
        console.error("Greška prilikom izmene obaveštenja: ", error);
      }
    }
  };

  const deleteObavestenje = async (id) => {
    try {
      await httpCommon.delete(`/obavestenja/${id}`);
      fetchObavestenja();
    } catch (error) {
      if (
        error.response &&
        (error.response.status === 401 || error.response.status === 400)
      ) {
        eventBus.dispatch("logout");
      } else {
        console.error("Greška prilikom brisanja obaveštenja: ", error);
      }
    }
  };

  return (
    <ObavestenjeContext.Provider
      value={{
        sortedObavestenja,
        addObavestenje,
        editObavestenje,
        deleteObavestenje,
      }}
    >
      {props.children}
    </ObavestenjeContext.Provider>
  );
};

export default ObavestenjeContextProvider;
