import { createContext, useEffect, useState } from "react";
import useHttpProtected from "../../../hooks/useHttpProtected";
import useToast from "../../../hooks/useToast";

export const PrigradskaNaseljaContext = createContext();

const PrigradskaNaseljaContextProvider = ({ children, navigate, location }) => {
  const [prigradskaNaselja, setPrigradskaNaselja] = useState([]);

  const httpProtected = useHttpProtected();
  const { handleShowToast } = useToast();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    getNaselje(isMounted, controller);

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  const sortedPrigradskaNaselja =
    prigradskaNaselja.length > 0
      ? prigradskaNaselja.sort((a, b) => a.id - b.id)
      : [];

  const getNaselje = async (isMounted, controller) => {
    try {
      const { data } = await httpProtected.get("/prigradskaNaselja", {
        signal: controller.signal,
      });
      if (isMounted) {
        setPrigradskaNaselja(data);
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

  const addNaselje = async (addNaselje) => {
    const controller = new AbortController();
    try {
      await httpProtected.post("/prigradskaNaselja", addNaselje, {
        signal: controller.signal,
      });
      getNaselje(true, controller);
    } catch (error) {
      if (error.response?.status === 400) {
        handleShowToast(
          "Greška",
          "Podaci o prigradskom naselju su neispravni. Molimo proverite zahtev i pokušajte ponovo.",
          "danger"
        );
      } else if (error.response?.status >= 500) {
        handleShowToast(
          "Greška",
          "Došlo je do greške na serveru prilikom kreiranja prigradskog naselja. Molimo pokušajte ponovo kasnije.",
          "danger"
        );
      } else if (error.name !== "CanceledError") {
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
      if (error.response?.status === 400) {
        handleShowToast(
          "Greška",
          "Podaci o prigradskom naselju su neispravni. Molimo proverite zahtev i pokušajte ponovo.",
          "danger"
        );
      } else if (error.response?.status >= 500) {
        handleShowToast(
          "Greška",
          "Došlo je do greške na serveru prilikom izmene prigradskog naselja. Molimo pokušajte ponovo kasnije.",
          "danger"
        );
      } else if (error.name !== "CanceledError") {
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
      if (error.response?.status === 400) {
        handleShowToast(
          "Greška",
          "Nevalidan ID za brisanje prigradskog naselja. Molimo proverite zahtev i pokušajte ponovo.",
          "danger"
        );
      } else if (error.response?.status >= 500) {
        handleShowToast(
          "Greška",
          "Došlo je do greške na serveru prilikom brisanja prigradskog naselja. Molimo pokušajte ponovo kasnije.",
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
