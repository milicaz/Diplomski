import { createContext, useEffect, useState } from "react";
import httpCommon from "../../../http-common";

export const MestoPoseteContext = createContext();

const MestoPoseteContextProvider = (props) => {
  const [mestaPosete, setMestaPosete] = useState([]);

  useEffect(() => {
    fetchMestaPosete();
  }, []);

  const sortedMestaPosete = mestaPosete.sort((a, b) => (a.id < b.id ? -1 : 1));

  //react axios get method
  const fetchMestaPosete = async () => {
    const { data } = await httpCommon.get("/mestaPosete");
    setMestaPosete(data);
  };

  //react axios post method
  const addMestoPosete = async (newMestoPosete) => {
    await httpCommon.post("/mestaPosete", newMestoPosete);
    fetchMestaPosete();
  };

  //react axios put method
  const editMestoPosete = async (id, updatedMestoPosete) => {
    await httpCommon.put(`/mestaPosete/${id}`, updatedMestoPosete);
    fetchMestaPosete();
  };

  // react axios delete method
  const deleteMestoPosete = async (id) => {
    await httpCommon.delete(`/mestaPosete/${id}`);
    fetchMestaPosete();
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
