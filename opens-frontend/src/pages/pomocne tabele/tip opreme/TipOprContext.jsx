import { createContext, useEffect, useState } from "react";
import useHttpProtected from "../../../hooks/useHttpProtected";
import useToast from "../../../hooks/useToast";

export const TipOprContext = createContext();

const TipOprContextProvider = ({ children, navigate, location }) => {
  const [tipoviOpreme, setTipoviOpreme] = useState([]);

  const httpProtected = useHttpProtected();
  const { handleShowToast } = useToast();

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

  const addTipOpreme = async (newTipOpreme) => {
    const controller = new AbortController();
    try {
      await httpProtected.post("/tipoviOpreme", newTipOpreme, {
        signal: controller.signal,
      });
      handleShowToast(
        "",
        `Tip opreme ${newTipOpreme.naziv} je uspešno kreiran.`,
        "success"
      );
      fetchTipoveOpreme(true, controller);
    } catch (error) {
      if (error.response?.status === 400) {
        handleShowToast(
          "Greška",
          "Podaci o tipu opreme su neispravni. Molimo proverite zahtev i pokušajte ponovo.",
          "danger"
        );
      } else if (error.response?.status >= 500) {
        handleShowToast(
          "Greška",
          "Došlo je do greške na serveru prilikom kreiranja tipa opreme. Molimo pokušajte ponovo kasnije.",
          "danger"
        );
      } else if (error.name !== "CanceledError") {
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
      handleShowToast(
        "",
        `Tip opreme ${updatedTipOpreme.naziv} je uspešno izmenjen.`,
        "success"
      );
      fetchTipoveOpreme(true, controller);
    } catch (error) {
      if (error.response?.status === 400) {
        handleShowToast(
          "Greška",
          "Podaci o tipu opreme su neispravni. Molimo proverite zahtev i pokušajte ponovo.",
          "danger"
        );
      } else if (error.response?.status >= 500) {
        handleShowToast(
          "Greška",
          "Došlo je do greške na serveru prilikom izmene tipa opreme. Molimo pokušajte ponovo kasnije.",
          "danger"
        );
      } else if (error.name !== "CanceledError") {
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
      handleShowToast("", "Tip opreme je uspešno obrisan.", "success");
      fetchTipoveOpreme(true, controller);
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
