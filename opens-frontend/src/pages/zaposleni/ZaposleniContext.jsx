import { createContext, useEffect, useState } from "react";
import { httpPublic } from "../../apis/http";
import useHttpProtected from "../../hooks/useHttpProtected";

export const ZaposleniContext = createContext();

const ZaposleniContextProvider = ({ children, navigate, location }) => {
  const [zap, setZap] = useState([]);
  const [uloga, setUloga] = useState([]);

  const httpProtected = useHttpProtected();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    getZaposleni(isMounted, controller);

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  const sortedZaposleni = zap.sort((a, b) => a.id - b.id);

  const getZaposleni = async (isMounted, controller) => {
    try {
      const { data } = await httpProtected.get("/zaposleni", {
        signal: controller.signal,
      });
      if (isMounted) {
        setZap(data);
      }
    } catch (error) {
      if (error.name !== "CanceledError") {
        console.error("Greška prilikom fetching zaposlene: ", error);
        navigate("/logovanje", { state: { from: location }, replace: true });
      }
    }
  };

  const getUloge = async () => {
    const controller = new AbortController();
    try {
      const { data } = await httpProtected.get("/uloge", {
        signal: controller.signal,
      });
      setUloga(data);
    } catch (error) {
      if (error.name !== "CanceledError") {
        console.error("Greška prilikom fetching uloge: ", error);
        navigate("/logovanje", { state: { from: location }, replace: true });
      }
    }
  };

  const registracija = async (zaposleni) => {
    const controller = new AbortController();
    try {
      const { data } = await httpPublic.post("/signup", zaposleni, {
        signal: controller.signal,
      });
      return data;
    } catch (error) {
      if (error.name !== "CanceledError") {
        console.error("Greška prilikom dodavanja zaposlenog: ", error);
        navigate("/logovanje", { state: { from: location }, replace: true });
      }
      throw error; // Rethrow the error for handling in the calling function
      // }
    }
  };

  const editZaposleni = async (id, zaposleni) => {
    const controller = new AbortController();
    try {
      await httpProtected.put(
        `/zaposleni/${id}`,
        {
          email: zaposleni.email,
          ime: zaposleni.ime,
          prezime: zaposleni.prezime,
          rod: zaposleni.rod,
          godine: zaposleni.godine,
          mestoBoravista: zaposleni.mestoBoravista,
          brojTelefona: zaposleni.brojTelefona,
          uloge: zaposleni.uloge.map((role) => ({ naziv: role })), // Format uloge correctly
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          signal: controller.signal,
        }
      );
      getZaposleni(true, controller); // Refresh or fetch data after successful update
    } catch (error) {
      if (error.name !== "CanceledError") {
        console.error("Error updating zaposleni:", error.response || error);
        navigate("/logovanje", { state: { from: location }, replace: true });
      }
    } finally {
      controller.abort();
    }
  };

  const deleteZaposleni = async (id) => {
    const controller = new AbortController();
    try {
      await httpProtected.delete(`/zaposleni/delete/${id}`, {
        signal: controller.signal,
      });
      getZaposleni(true, controller);
    } catch (error) {
      if (error.name !== "CanceledError") {
        console.error("Greška prilikom brisanja zaposlenog: ", error);
        navigate("/logovanje", { state: { from: location }, replace: true });
      }
    } finally {
      controller.abort();
    }
  };

  return (
    <ZaposleniContext.Provider
      value={{
        sortedZaposleni,
        uloga,
        getZaposleni,
        registracija,
        editZaposleni,
        deleteZaposleni,
      }}
    >
      {children}
    </ZaposleniContext.Provider>
  );
};
export default ZaposleniContextProvider;
