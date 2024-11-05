import { createContext, useEffect, useState } from "react";
import useHttpProtected from "../../../hooks/useHttpProtected";

export const TipDogadjajaContext = createContext();

const TipDogadjajaContextProvider = ({ children, navigate, location }) => {
  const [tipoviDogadjaja, setTipoviDogadjaja] = useState([]);

  const httpProtected = useHttpProtected();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    getTipovi(isMounted, controller);

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  const sortedTipoviDogadjaja = tipoviDogadjaja.sort((a, b) => a.id - b.id);

  const getTipovi = async (isMounted, controller) => {
    try {
      const { data } = await httpProtected.get("/tipoviDogadjaja", {
        signal: controller.signal,
      });
      if (isMounted) {
        setTipoviDogadjaja(data);
      }
    } catch (error) {
      if (error.name !== "CanceledError") {
        console.error("Greška prilikom fetching tipova događaja: ", error);
        navigate("/logovanje", { state: { from: location }, replace: true });
      }
    }
  };

  const addTip = async (addTip) => {
    const controller = new AbortController();
    try {
      await httpProtected.post("/tipoviDogadjaja", addTip, {
        signal: controller.signal,
      });
      getTipovi(true, controller);
    } catch (error) {
      if (error.name !== "CanceledError") {
        console.error("Greška prilikom dodavanja tipa događaja: ", error);
        navigate("/logovanje", { state: { from: location }, replace: true });
      }
    } finally {
      controller.abort();
    }
  };

  const editTip = async (id, editTip) => {
    const controller = new AbortController();
    try {
      await httpProtected.put(`/tipoviDogadjaja/${id}`, editTip, {
        signal: controller.signal,
      });
      getTipovi(true, controller);
    } catch (error) {
      if (error.name !== "CanceledError") {
        console.error("Greška prilikom izmene tipa događaja: ", error);
        navigate("/logovanje", { state: { from: location }, replace: true });
      }
    } finally {
      controller.abort();
    }
  };

  const deleteTip = async (id) => {
    const controller = new AbortController();
    try {
      await httpProtected.delete(`/tipoviDogadjaja/${id}`, {
        signal: controller.signal,
      });
      getTipovi(true, controller);
    } catch (error) {
      if (error.name !== "CanceledError") {
        console.error("Greška prilikom brisanja tipova događaja: ", error);
        navigate("/logovanje", { state: { from: location }, replace: true });
      }
    } finally {
      controller.abort();
    }
  };

  return (
    <TipDogadjajaContext.Provider
      value={{ sortedTipoviDogadjaja, getTipovi, addTip, editTip, deleteTip }}
    >
      {children}
    </TipDogadjajaContext.Provider>
  );
};

export default TipDogadjajaContextProvider;
