import { createContext, useEffect, useState } from "react";
import useHttpProtected from "../../../hooks/useHttpProtected";
import useToast from "../../../hooks/useToast";

export const TipDogadjajaContext = createContext();

const TipDogadjajaContextProvider = ({ children, navigate, location }) => {
  const [tipoviDogadjaja, setTipoviDogadjaja] = useState([]);

  const httpProtected = useHttpProtected();
  const { handleShowToast } = useToast();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    getTipovi(isMounted, controller);

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  const sortedTipoviDogadjaja =
    tipoviDogadjaja.length > 0
      ? tipoviDogadjaja.sort((a, b) => a.id - b.id)
      : [];

  const getTipovi = async (isMounted, controller) => {
    try {
      const { data } = await httpProtected.get("/tipoviDogadjaja", {
        signal: controller.signal,
      });
      if (isMounted) {
        setTipoviDogadjaja(data);
      }
    } catch (error) {
      if (error.response?.status >= 500) {
        handleShowToast(
          "Greška",
          "Greška pri učitavanju podataka. Došlo je do problema prilikom obrade zahteva. Molimo Vas da pokušate ponovo kasnije.",
          "danger"
        );
      } else if (error.name !== "CanceledError") {
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
      if (error.response?.status === 400) {
        handleShowToast(
          "Greška",
          "Podaci o tipu događaja su neispravni. Molimo proverite zahtev i pokušajte ponovo.",
          "danger"
        );
      } else if (error.response?.status >= 500) {
        handleShowToast(
          "Greška",
          "Došlo je do greške na serveru prilikom kreiranja tipa događaja. Molimo pokušajte ponovo kasnije.",
          "danger"
        );
      } else if (error.name !== "CanceledError") {
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
      if (error.response?.status === 400) {
        handleShowToast(
          "Greška",
          "Podaci o tipu događaja su neispravni. Molimo proverite zahtev i pokušajte ponovo.",
          "danger"
        );
      } else if (error.response?.status >= 500) {
        handleShowToast(
          "Greška",
          "Došlo je do greške na serveru prilikom izmene tipa događaja. Molimo pokušajte ponovo kasnije.",
          "danger"
        );
      } else if (error.name !== "CanceledError") {
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
      if (error.response?.status === 400) {
        handleShowToast(
          "Greška",
          "Nevalidan ID za brisanje tipa događaja. Molimo proverite zahtev i pokušajte ponovo.",
          "danger"
        );
      } else if (error.response?.status >= 500) {
        handleShowToast(
          "Greška",
          "Došlo je do greške na serveru prilikom brisanja tipa događaja. Molimo pokušajte ponovo kasnije.",
          "danger"
        );
      } else if (error.name !== "CanceledError") {
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
