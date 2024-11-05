import { createContext, useEffect, useState } from "react";
import useHttpProtected from "../../../hooks/useHttpProtected";

export const TipOprContext = createContext();

const TipOprContextProvider = ({ children, navigate, location }) => {
  const [tipoviOpreme, setTipoviOpreme] = useState([]);

  const httpProtected = useHttpProtected();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    fetchTipoveOpreme(isMounted, controller);

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  const sortedTipoviOpreme =
    tipoviOpreme.length > 0
      ? tipoviOpreme.sort((a, b) => (a.id < b.id ? -1 : 1))
      : [];

  const fetchTipoveOpreme = async (isMounted, controller) => {
    try {
      const { data } = await httpProtected.get("/tipoviOpreme", {
        signal: controller.signal,
      });
      if (isMounted) {
        setTipoviOpreme(data);
      }
    } catch (error) {
      if (error.name !== "CanceledError") {
        console.error("Greška prilikom fetching tipova opreme: ", error);
        navigate("/logovanje", { state: { from: location }, replace: true });
      }
    }
  };

  const addTipOpreme = async (newTipOpreme) => {
    const controller = new AbortController();
    try {
      await httpProtected.post("/tipoviOpreme", newTipOpreme, {
        signal: controller.signal,
      });
      fetchTipoveOpreme(true, controller);
    } catch (error) {
      if (error.name !== "CanceledError") {
        console.error("Greška prilikom dodavanja tipa opreme: ", error);
        navigate("/logovanje", { state: { from: location }, replace: true });
      }
    } finally {
      controller.abort();
    }
  };

  const editTipOpreme = async (id, updatedTipOpreme) => {
    const controller = new AbortController();
    try {
      await httpProtected.put(`/tipoviOpreme/${id}`, updatedTipOpreme, {
        signal: controller.signal,
      });
      fetchTipoveOpreme(true, controller);
    } catch (error) {
      if (error.name !== "CanceledError") {
        console.error("Greška prilikom izmene tipa opreme: ", error);
        navigate("/logovanje", { state: { from: location }, replace: true });
      }
    } finally {
      controller.abort();
    }
  };

  const deleteTipOpreme = async (id) => {
    const controller = new AbortController();
    try {
      await httpProtected.delete(`/tipoviOpreme/${id}`, {
        signal: controller.signal,
      });
      fetchTipoveOpreme(true, controller);
    } catch (error) {
      if (error.name !== "CanceledError") {
        console.error("Greška prilikom brisanja tipa opreme: ", error);
        navigate("/logovanje", { state: { from: location }, replace: true });
      }
    } finally {
      controller.abort();
    }
  };

  return (
    <TipOprContext.Provider
      value={{
        sortedTipoviOpreme,
        fetchTipoveOpreme,
        addTipOpreme,
        editTipOpreme,
        deleteTipOpreme,
      }}
    >
      {children}
    </TipOprContext.Provider>
  );
};

export default TipOprContextProvider;
