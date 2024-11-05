import { createContext, useEffect, useState } from "react";
import useHttpProtected from "../../../hooks/useHttpProtected";

export const OpremaContext = createContext();

const OpremaContextProvider = ({ children, navigate, location }) => {
  const [oprema, setOprema] = useState([]);

  const httpProtected = useHttpProtected();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    fetchOpremu(isMounted, controller);

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  const sortedOprema =
    oprema.length > 0 ? oprema.sort((a, b) => (a.id < b.id ? -1 : 1)) : [];

  const fetchOpremu = async (isMounted, controller) => {
    try {
      const { data } = await httpProtected.get("/oprema", {
        signal: controller.signal,
      });
      if (isMounted) {
        setOprema(data);
      }
    } catch (error) {
      if (error.name !== "CanceledError") {
        console.error("Greška prilikom fetching opreme: ", error);
        navigate("/logovanje", { state: { from: location }, replace: true });
      }
    }
  };

  const addOpremu = async (newOprema) => {
    const controller = new AbortController();
    try {
      await httpProtected.post("/oprema", newOprema, {
        signal: controller.signal,
      });
      fetchOpremu(true, controller);
    } catch (error) {
      if (error.name !== "CanceledError") {
        console.error("Greška prilikom dodavanja opreme: ", error);
        navigate("/logovanje", { state: { from: location }, replace: true });
      }
    } finally {
      controller.abort();
    }
  };

  const editOpremu = async (id, updatedOprema) => {
    const controller = new AbortController();
    try {
      await httpProtected.put(`/oprema/${id}`, updatedOprema, {
        signal: controller.signal,
      });
      fetchOpremu(true, controller);
    } catch (error) {
      if (error.name !== "CanceledError") {
        console.error("Greška prilikom izmene opreme: ", error);
        navigate("/logovanje", { state: { from: location }, replace: true });
      }
    } finally {
      controller.abort();
    }
  };

  const deleteOpremu = async (id) => {
    const controller = new AbortController();
    try {
      await httpProtected.delete(`/oprema/${id}`, {
        signal: controller.signal,
      });
      fetchOpremu(true, controller);
    } catch (error) {
      if (error.name !== "CanceledError") {
        console.error("Greška prilikom brisanja opreme: ", error);
        navigate("/logovanje", { state: { from: location }, replace: true });
      }
    } finally {
      controller.abort();
    }
  };

  return (
    <OpremaContext.Provider
      value={{ sortedOprema, fetchOpremu, addOpremu, editOpremu, deleteOpremu }}
    >
      {children}
    </OpremaContext.Provider>
  );
};

export default OpremaContextProvider;
