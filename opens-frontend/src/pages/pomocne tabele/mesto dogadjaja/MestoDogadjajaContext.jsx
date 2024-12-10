import { createContext, useEffect, useState } from "react";
import useHttpProtected from "../../../hooks/useHttpProtected";
import useToast from "../../../hooks/useToast";

export const MestoDogadjajaContext = createContext();

const MestoDogadjajaContextProvider = ({ children, navigate, location }) => {
  const [mestaDogadjaja, setMestaDogadjaja] = useState([]);

  const httpProtected = useHttpProtected();
  const { handleShowToast } = useToast();

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

  const addMestoDogadjaja = async (addMesto) => {
    const controller = new AbortController();
    try {
      await httpProtected.post("/mestaDogadjaja", addMesto, {
        signal: controller.signal,
      });
      getMesta(true, controller);
    } catch (error) {
      if (error.response?.status === 400) {
        handleShowToast(
          "Greška",
          "Podaci o mestu događaja su neispravni. Molimo proverite zahtev i pokušajte ponovo.",
          "danger"
        );
      } else if (error.response?.status >= 500) {
        handleShowToast(
          "Greška",
          "Došlo je do greške na serveru prilikom kreiranja mesta događaja. Molimo pokušajte ponovo kasnije.",
          "danger"
        );
      } else if (error.name !== "CanceledError") {
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
      if (error.response?.status === 400) {
        handleShowToast(
          "Greška",
          "Podaci o mestu događaja su neispravni. Molimo proverite zahtev i pokušajte ponovo.",
          "danger"
        );
      } else if (error.response?.status >= 500) {
        handleShowToast(
          "Greška",
          "Došlo je do greške na serveru prilikom izmene mesta događaja. Molimo pokušajte ponovo kasnije.",
          "danger"
        );
      } else if (error.name !== "CanceledError") {
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
      if (error.response?.status === 400) {
        handleShowToast(
          "Greška",
          "Nevalidan ID za brisanje mesta događaja. Molimo proverite zahtev i pokušajte ponovo.",
          "danger"
        );
      } else if (error.response?.status >= 500) {
        handleShowToast(
          "Greška",
          "Došlo je do greške na serveru prilikom brisanja mesta događaja. Molimo pokušajte ponovo kasnije.",
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
