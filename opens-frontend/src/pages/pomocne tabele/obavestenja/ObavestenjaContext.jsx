import { createContext, useEffect, useState } from "react";
import httpCommon from "../../../http-common";

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
    const { data } = await httpCommon.get("/obavestenja/validna");
    setObavestenja(data);
  };

  const addObavestenje = async (newObavestenje) => {
    await httpCommon.post("/obavestenja", newObavestenje);
    fetchObavestenja();
  };

  const editObavestenje = async (id, updatedObavestenje) => {
    await httpCommon.put(`/obavestenja/${id}`, updatedObavestenje);
    fetchObavestenja();
  };

  const deleteObavestenje = async (id) => {
    await httpCommon.delete(`/obavestenja/${id}`);
    fetchObavestenja();
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
