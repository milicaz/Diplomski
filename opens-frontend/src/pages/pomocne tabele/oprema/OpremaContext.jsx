import { createContext, useEffect, useState } from "react";
import httpCommon from "../../../http-common";
import eventBus from "../../../utils/eventBus";

export const OpremaContext = createContext();

const OpremaContextProvider = (props) => {
  const [oprema, setOprema] = useState([]);

  useEffect(() => {
    fetchOpremu();
  }, []);

  const sortedOprema =
    oprema.length > 0 ? oprema.sort((a, b) => (a.id < b.id ? -1 : 1)) : [];

  const fetchOpremu = async () => {
    try {
      const { data } = await httpCommon.get("/oprema");
      setOprema(data);
    } catch (error) {
      if (
        error.response &&
        (error.response.status === 401 || error.response.status === 400)
      ) {
        eventBus.dispatch("logout");
      } else {
        console.error("Greška prilikom fetching opreme: ", error);
      }
    }
  };

  const addOpremu = async (newOprema) => {
    try {
      await httpCommon.post("/oprema", newOprema);
      fetchOpremu();
    } catch (error) {
      if (
        error.response &&
        (error.response.status === 401 || error.response.status === 400)
      ) {
        eventBus.dispatch("logout");
      } else {
        console.error("Greška prilikom dodavanja opreme: ", error);
      }
    }
  };

  const editOpremu = async (id, updatedOprema) => {
    try {
      await httpCommon.put(`/oprema/${id}`, updatedOprema);
      fetchOpremu();
    } catch (error) {
      if (
        error.response &&
        (error.response.status === 401 || error.response.status === 400)
      ) {
        eventBus.dispatch("logout");
      } else {
        console.error("Greška prilikom izmene opreme: ", error);
      }
    }
  };

  const deleteOpremu = async (id) => {
    try {
      await httpCommon.delete(`/oprema/${id}`);
      fetchOpremu();
    } catch (error) {
      if (
        error.response &&
        (error.response.status === 401 || error.response.status === 400)
      ) {
        eventBus.dispatch("logout");
      } else {
        console.error("Greška prilikom brisanja opreme: ", error);
      }
    }
  };

  return (
    <OpremaContext.Provider
      value={{ sortedOprema, addOpremu, editOpremu, deleteOpremu }}
    >
      {props.children}
    </OpremaContext.Provider>
  );
};

export default OpremaContextProvider;
