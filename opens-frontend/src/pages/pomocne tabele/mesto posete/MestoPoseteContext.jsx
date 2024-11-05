import { createContext, useEffect, useState } from "react";
import useHttpProtected from "../../../hooks/useHttpProtected";

export const MestoPoseteContext = createContext();

const MestoPoseteContextProvider = ({ children, navigate, location }) => {
  const [mestaPosete, setMestaPosete] = useState([]);

  const httpProtected = useHttpProtected();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    fetchMestaPosete(isMounted, controller);

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  const sortedMestaPosete =
    mestaPosete.length > 0
      ? mestaPosete.sort((a, b) => (a.id < b.id ? -1 : 1))
      : [];

  const fetchMestaPosete = async (isMounted, controller) => {
    try {
      const { data } = await httpProtected.get("/mestaPosete", {
        signal: controller.signal,
      });
      if (isMounted) {
        setMestaPosete(data);
      }
    } catch (error) {
      if (error.name !== "CanceledError") {
        console.error("Greška prilikom fetching mesta posete: ", error);
        navigate("/logovanje", { state: { from: location }, replace: true });
      }
    }
  };

  const addMestoPosete = async (newMestoPosete) => {
    const controller = new AbortController();
    try {
      await httpProtected.post("/mestaPosete", newMestoPosete, {
        signal: controller.signal,
      });
      fetchMestaPosete(true, controller);
    } catch (error) {
      if (error.name !== "CanceledError") {
        console.error("Greška prilikom dodavanja mesta posete: ", error);
        navigate("/logovanje", { state: { from: location }, replace: true });
      }
    } finally {
      controller.abort();
    }
  };

  const editMestoPosete = async (id, updatedMestoPosete) => {
    const controller = new AbortController();
    try {
      await httpProtected.put(`/mestaPosete/${id}`, updatedMestoPosete, {
        signal: controller.signal,
      });
      fetchMestaPosete(true, controller);
    } catch (error) {
      if (error.name !== "CanceledError") {
        console.error("Greška prilikom izmene mesta posete: ", error);
        navigate("/logovanje", { state: { from: location }, replace: true });
      }
    } finally {
      controller.abort();
    }
  };

  const deleteMestoPosete = async (id) => {
    const controller = new AbortController();
    try {
      await httpProtected.delete(`/mestaPosete/${id}`, {
        signal: controller.signal,
      });
      fetchMestaPosete(true, controller);
    } catch (error) {
      if (error.name !== "CanceledError") {
        console.error("Greška prilikom brisanja mesta posete: ", error);
        navigate("/logovanje", { state: { from: location }, replace: true });
      }
    } finally {
      controller.abort();
    }
  };

  return (
    <MestoPoseteContext.Provider
      value={{
        sortedMestaPosete,
        fetchMestaPosete,
        addMestoPosete,
        editMestoPosete,
        deleteMestoPosete,
      }}
    >
      {children}
    </MestoPoseteContext.Provider>
  );
};

export default MestoPoseteContextProvider;
