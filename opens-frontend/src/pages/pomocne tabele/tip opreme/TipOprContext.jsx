import { createContext, useEffect, useState } from "react";
import httpCommon from "../../../http-common";

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

  //react axios get method
  const fetchTipoveOpreme = async () => {
    const { data } = await httpCommon.get("/tipoviOpreme");
    setTipoviOpreme(data);
  };

  //react axios post method
  const addTipOpreme = async (newTipOpreme) => {
    await httpCommon.post("/tipoviOpreme", newTipOpreme);
    fetchTipoveOpreme();
  };

  //react axios put method
  const editTipOpreme = async (id, updatedTipOpreme) => {
    await httpCommon.put(`/tipoviOpreme/${id}`, updatedTipOpreme);
    fetchTipoveOpreme();
  };

  // react axios delete method
  const deleteTipOpreme = async (id) => {
    await httpCommon.delete(`/tipoviOpreme/${id}`);
    fetchTipoveOpreme();
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
