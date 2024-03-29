import { createContext, useEffect, useState } from "react";
import httpCommon from "../../../http-common";

export const OpremaContext = createContext();

const OpremaContextProvider = (props) => {
  const [oprema, setOprema] = useState([]);

  useEffect(() => {
    fetchOpremu();
  }, []);

  const sortedOprema = oprema.length > 0 ? oprema.sort((a, b) => (a.id < b.id ? -1 : 1)) : [];

  //react axios get method
  const fetchOpremu = async () => {
    const { data } = await httpCommon.get("/oprema");
    setOprema(data);
  };

  //react axios post method
  const addOpremu = async (newOprema) => {
    await httpCommon.post("/oprema", newOprema);
    fetchOpremu();
  };

  //react axios put method
  const editOpremu = async (id, updatedOprema) => {
    await httpCommon.put(`/oprema/${id}`, updatedOprema);
    fetchOpremu();
  };

  // react axios delete method
  const deleteOpremu = async (id) => {
    await httpCommon.delete(`/oprema/${id}`);
    fetchOpremu();
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
