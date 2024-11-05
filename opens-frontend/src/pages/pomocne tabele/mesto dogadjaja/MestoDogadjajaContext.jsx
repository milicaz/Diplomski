import { createContext, useEffect, useState } from "react";
import useHttpProtected from "../../../hooks/useHttpProtected";

export const MestoDogadjajaContext = createContext();

const MestoDogadjajaContextProvider = ({ children, navigate, location }) => {
  const [mestaDogadjaja, setMestaDogadjaja] = useState([]);

  const httpProtected = useHttpProtected();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    getMesta(isMounted, controller);

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  const sortedMestaDogadjaja = mestaDogadjaja.sort((a, b) => a.id - b.id);

  const getMesta = async (isMounted, controller) => {
    try {
      const { data } = await httpProtected.get("/mestaDogadjaja", {
        signal: controller.signal,
      });
      if (isMounted) {
        setMestaDogadjaja(data);
      }
    } catch (error) {
      if (error.name !== "CanceledError") {
        console.error("Greška prilikom fetching mesta događaja: ", error);
        navigate("/logovanje", { state: { from: location }, replace: true });
      }
    }
  };

  const addMestoDogadjaja = async (addMesto) => {
    const controller = new AbortController();
    try {
      await httpProtected.post("/mestaDogadjaja", addMesto, {
        signal: controller.signal,
      });
      getMesta(true, controller);
    } catch (error) {
      if (error.name !== "CanceledError") {
        console.error("Greška prilikom dodavanja mesta događaja: ", error);
        navigate("/logovanje", { state: { from: location }, replace: true });
      }
    } finally {
      controller.abort();
    }
  };

  const editMestoDogadjaja = async (id, editMesto) => {
    const controller = new AbortController();
    try {
      await httpProtected.put(`/mestaDogadjaja/${id}`, editMesto, {
        signal: controller.signal,
      });
      getMesta(true, controller);
    } catch (error) {
      if (error.name !== "CanceledError") {
        console.error("Greška prilikom izmene mesta događaja: ", error);
        navigate("/logovanje", { state: { from: location }, replace: true });
      }
    } finally {
      controller.abort();
    }
  };

  const deleteMestoDogadjaja = async (id) => {
    const controller = new AbortController();
    try {
      await httpProtected.delete(`/mestaDogadjaja/${id}`, {
        signal: controller.signal,
      });
      getMesta(true, controller);
    } catch (error) {
      if (error.name !== "CanceledError") {
        console.error("Greška prilikom brisanja mesta događaja: ", error);
        navigate("/logovanje", { state: { from: location }, replace: true });
      }
    } finally {
      controller.abort();
    }
  };

  return (
    <MestoDogadjajaContext.Provider
      value={{
        sortedMestaDogadjaja,
        getMesta,
        addMestoDogadjaja,
        editMestoDogadjaja,
        deleteMestoDogadjaja,
      }}
    >
      {children}
    </MestoDogadjajaContext.Provider>
  );
};

export default MestoDogadjajaContextProvider;
