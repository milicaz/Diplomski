import { createContext, useEffect, useState } from "react";
import useHttpProtected from "../../../hooks/useHttpProtected";

export const ObavestenjeContext = createContext();

const ObavestenjeContextProvider = ({ children, navigate, location }) => {
  const [obavestenja, setObavestenja] = useState([]);

  const httpProtected = useHttpProtected();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    fetchObavestenja(isMounted, controller);

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  const sortedObavestenja =
    obavestenja.length > 0
      ? obavestenja.sort((a, b) => (a.id < b.id ? -1 : 1))
      : [];

  const fetchObavestenja = async (isMounted, controller) => {
    try {
      const { data } = await httpProtected.get("/obavestenja/validna", {
        signal: controller.signal,
      });
      if (isMounted) {
        setObavestenja(data);
      }
    } catch (error) {
      if (error.name !== "CanceledError") {
        console.error("Greška prilikom fetching obaveštenja: ", error);
        navigate("/logovanje", { state: { from: location }, replace: true });
      }
    }
  };

  const addObavestenje = async (newObavestenje) => {
    const controller = new AbortController();
    try {
      await httpProtected.post("/obavestenja", newObavestenje, {
        signal: controller.signal,
      });
      fetchObavestenja(true, controller);
    } catch (error) {
      if (error.name !== "CanceledError") {
        console.error("Greška prilikom dodavanja obaveštenja: ", error);
        navigate("/logovanje", { state: { from: location }, replace: true });
      }
    }
  };

  const editObavestenje = async (id, updatedObavestenje) => {
    const controller = new AbortController();
    try {
      await httpProtected.put(`/obavestenja/${id}`, updatedObavestenje, {
        signal: controller.signal,
      });
      fetchObavestenja(true, controller);
    } catch (error) {
      if (error.name !== "CanceledError") {
        console.error("Greška prilikom izmene obaveštenja: ", error);
        navigate("/logovanje", { state: { from: location }, replace: true });
      }
    }
  };

  const deleteObavestenje = async (id) => {
    const controller = new AbortController();
    try {
      await httpProtected.delete(`/obavestenja/${id}`, {
        signal: controller.signal,
      });
      fetchObavestenja(true, controller);
    } catch (error) {
      if (error.name !== "CanceledError") {
        console.error("Greška prilikom brisanja obaveštenja: ", error);
        navigate("/logovanje", { state: { from: location }, replace: true });
      }
    }
  };

  return (
    <ObavestenjeContext.Provider
      value={{
        sortedObavestenja,
        fetchObavestenja,
        addObavestenje,
        editObavestenje,
        deleteObavestenje,
      }}
    >
      {children}
    </ObavestenjeContext.Provider>
  );
};
export default ObavestenjeContextProvider;
