import { createContext, useEffect, useState } from "react";
import useHttpProtected from "../../../hooks/useHttpProtected";

export const PrigradskaNaseljaContext = createContext();

const PrigradskaNaseljaContextProvider = ({ children, navigate, location }) => {
  const [prigradskaNaselja, setPrigradskaNaselja] = useState([]);

  const httpProtected = useHttpProtected();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    getNaselje(isMounted, controller);

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  const sortedPrigradskaNaselja = prigradskaNaselja.sort((a, b) => a.id - b.id);

  const getNaselje = async (isMounted, controller) => {
    try {
      const { data } = await httpProtected.get("/prigradskaNaselja", {
        signal: controller.signal,
      });
      if (isMounted) {
        setPrigradskaNaselja(data);
      }
    } catch (error) {
      if (error.name !== "CanceledError") {
        console.error("Greška prilikom fetching prigradska naselja: ", error);
        navigate("/logovanje", { state: { from: location }, replace: true });
      }
    }
  };

  const addNaselje = async (addNaselje) => {
    const controller = new AbortController();
    try {
      await httpProtected.post("/prigradskaNaselja", addNaselje, {
        signal: controller.signal,
      });
      getNaselje(true, controller);
    } catch (error) {
      if (error.name !== "CanceledError") {
        console.error("Greška prilikom dodavanja prigradskog naselja: ", error);
        navigate("/logovanje", { state: { from: location }, replace: true });
      }
    } finally {
      controller.abort();
    }
  };

  const editNaselje = async (id, editNaselje) => {
    const controller = new AbortController();
    try {
      await httpProtected.put(`/prigradskaNaselja/${id}`, editNaselje, {
        signal: controller.signal,
      });
      getNaselje(true, controller);
    } catch (error) {
      if (error.name !== "CanceledError") {
        console.error("Greška prilikom fetching prigradska naselja: ", error);
        navigate("/logovanje", { state: { from: location }, replace: true });
      }
    } finally {
      controller.abort();
    }
  };

  const deleteNaselje = async (id) => {
    const controller = new AbortController();
    try {
      await httpProtected.delete(`/prigradskaNaselja/${id}`, {
        signal: controller.signal,
      });
      getNaselje(true, controller);
    } catch (error) {
      if (error.name !== "CanceledError") {
        console.error("Greška prilikom fetching prigradska naselja: ", error);
        navigate("/logovanje", { state: { from: location }, replace: true });
      }
    } finally {
      controller.abort();
    }
  };

  return (
    <PrigradskaNaseljaContext.Provider
      value={{
        sortedPrigradskaNaselja,
        getNaselje,
        addNaselje,
        editNaselje,
        deleteNaselje,
      }}
    >
      {children}
    </PrigradskaNaseljaContext.Provider>
  );
};

export default PrigradskaNaseljaContextProvider;
