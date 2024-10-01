import { createContext, useEffect, useState } from "react";
import httpCommon from "../../../http-common";
import eventBus from "../../../utils/eventBus";

export const PrigradskaNaseljaContext = createContext();

const PrigradskaNaseljaContextProvider = (props) => {
  const [prigradskaNaselja, setPrigradskaNaselja] = useState([]);

  useEffect(() => {
    getNaselje();
  }, []);

  const sortedPrigradskaNaselja = prigradskaNaselja.sort((a, b) => a.id - b.id);

  const getNaselje = async () => {
    try {
      const { data } = await httpCommon.get("/prigradskaNaselja");
      setPrigradskaNaselja(data);
    } catch (error) {
      if (
        error.response &&
        (error.response.status === 401 || error.response.status === 400)
      ) {
        eventBus.dispatch("logout");
      } else {
        console.error("Greška prilikom fetching prigradska naselja: ", error);
      }
    }
  };

  const addNaselje = async (addNaselje) => {
    try {
      await httpCommon.post("/prigradskaNaselja", addNaselje);
      getNaselje();
    } catch (error) {
      if (
        error.response &&
        (error.response.status === 401 || error.response.status === 400)
      ) {
        eventBus.dispatch("logout");
      } else {
        console.error("Greška prilikom dodavanja prigradskog naselja: ", error);
      }
    }
  };

  const editNaselje = async (id, editNaselje) => {
    try {
      await httpCommon.put(`/prigradskaNaselja/${id}`, editNaselje);
      getNaselje();
    } catch (error) {
      if (
        error.response &&
        (error.response.status === 401 || error.response.status === 400)
      ) {
        eventBus.dispatch("logout");
      } else {
        console.error("Greška prilikom fetching prigradska naselja: ", error);
      }
    }
  };

  const deleteNaselje = async (id) => {
    try {
      await httpCommon.delete(`/prigradskaNaselja/${id}`);
      getNaselje();
    } catch (error) {
      if (
        error.response &&
        (error.response.status === 401 || error.response.status === 400)
      ) {
        eventBus.dispatch("logout");
      } else {
        console.error("Greška prilikom fetching prigradska naselja: ", error);
      }
    }
  };

  return (
    <PrigradskaNaseljaContext.Provider
      value={{
        sortedPrigradskaNaselja,
        addNaselje,
        editNaselje,
        deleteNaselje,
      }}
    >
      {props.children}
    </PrigradskaNaseljaContext.Provider>
  );
};

export default PrigradskaNaseljaContextProvider;
