import { createContext, useEffect, useState } from "react";
import useHttpProtected from "../../../hooks/useHttpProtected";
import useToast from "../../../hooks/useToast";

export const ObavestenjeContext = createContext();

const ObavestenjeContextProvider = ({ children, navigate, location }) => {
  const [obavestenja, setObavestenja] = useState([]);

  const httpProtected = useHttpProtected();
  const { handleShowToast } = useToast();

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

  const addObavestenje = async (newObavestenje) => {
    const controller = new AbortController();
    try {
      await httpProtected.post("/obavestenja", newObavestenje, {
        signal: controller.signal,
      });
      handleShowToast("", `Obaveštenje "${newObavestenje.naziv}" je uspešno kreirano.`, "success");
      fetchObavestenja(true, controller);
    } catch (error) {
      if (error.response?.status === 400) {
        handleShowToast(
          "Greška",
          "Podaci o obaveštenju su neispravni. Molimo proverite zahtev i pokušajte ponovo.",
          "danger"
        );
      } else if (error.response?.status >= 500) {
        handleShowToast(
          "Greška",
          "Došlo je do greške na serveru prilikom kreiranja obaveštenja. Molimo pokušajte ponovo kasnije.",
          "danger"
        );
      } else if (error.name !== "CanceledError") {
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
      handleShowToast("", `Obaveštenje "${updatedObavestenje.naziv}" uspešno izmenjeno.`, "success");
      fetchObavestenja(true, controller);
    } catch (error) {
      if (error.response?.status === 400) {
        handleShowToast(
          "Greška",
          "Podaci o obaveštenju su neispravni. Molimo proverite zahtev i pokušajte ponovo.",
          "danger"
        );
      } else if (error.response?.status >= 500) {
        handleShowToast(
          "Greška",
          "Došlo je do greške na serveru prilikom izmene obaveštenja. Molimo pokušajte ponovo kasnije.",
          "danger"
        );
      } else if (error.name !== "CanceledError") {
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
      handleShowToast("", "Obaveštenje je uspešno obrisano.", "success");
      fetchObavestenja(true, controller);
    } catch (error) {
      if (error.response?.status === 400) {
        handleShowToast(
          "Greška",
          "Nevalidan ID za brisanje obaveštenja. Molimo proverite zahtev i pokušajte ponovo.",
          "danger"
        );
      } else if (error.response?.status >= 500) {
        handleShowToast(
          "Greška",
          "Došlo je do greške na serveru prilikom brisanja obaveštenja. Molimo pokušajte ponovo kasnije.",
          "danger"
        );
      } else if (error.name !== "CanceledError") {
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
