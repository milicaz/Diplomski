import { createContext, useEffect, useState } from "react";
import useHttpProtected from "../../../hooks/useHttpProtected";
import useToast from "../../../hooks/useToast";

export const MestoPoseteContext = createContext();

const MestoPoseteContextProvider = ({ children, navigate, location }) => {
  const [mestaPosete, setMestaPosete] = useState([]);

  const httpProtected = useHttpProtected();
  const { handleShowToast } = useToast();

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

  const addMestoPosete = async (newMestoPosete) => {
    const controller = new AbortController();
    try {
      await httpProtected.post("/mestaPosete", newMestoPosete, {
        signal: controller.signal,
      });
      handleShowToast("", `Mesto posete ${newMestoPosete.nazivMesta} je uspešno kreirano.`, "success");
      fetchMestaPosete(true, controller);
    } catch (error) {
      if (error.response?.status === 400) {
        handleShowToast(
          "Greška",
          "Podaci o mestu posete su neispravni. Molimo proverite zahtev i pokušajte ponovo.",
          "danger"
        );
      } else if (error.response?.status >= 500) {
        handleShowToast(
          "Greška",
          "Došlo je do greške na serveru prilikom kreiranja mesta posete. Molimo pokušajte ponovo kasnije.",
          "danger"
        );
      } else if (error.name !== "CanceledError") {
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
      handleShowToast("", `Mesto posete ${updatedMestoPosete.nazivMesta} je uspešno izmenjeno.`, "success");
      fetchMestaPosete(true, controller);
    } catch (error) {
      if (error.response?.status === 400) {
        handleShowToast(
          "Greška",
          "Podaci o mestu posete su neispravni. Molimo proverite zahtev i pokušajte ponovo.",
          "danger"
        );
      } else if (error.response?.status >= 500) {
        handleShowToast(
          "Greška",
          "Došlo je do greške na serveru prilikom izmene mesta posete. Molimo pokušajte ponovo kasnije.",
          "danger"
        );
      } else if (error.name !== "CanceledError") {
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
      handleShowToast("", "Mesto posete je uspešno obrisano.", "success");
      fetchMestaPosete(true, controller);
    } catch (error) {
      if (error.response?.status === 400) {
        handleShowToast(
          "Greška",
          "Nevalidan ID za brisanje mesta posete. Molimo proverite zahtev i pokušajte ponovo.",
          "danger"
        );
      } else if (error.response?.status >= 500) {
        handleShowToast(
          "Greška",
          "Došlo je do greške na serveru prilikom brisanja mesta posete. Molimo pokušajte ponovo kasnije.",
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
