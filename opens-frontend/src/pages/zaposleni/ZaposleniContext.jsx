import { createContext, useEffect, useState } from "react";
import httpCommon from "../../http-common";
import eventBus from "../../utils/eventBus";

export const ZaposleniContext = createContext();

const ZaposleniContextProvider = (props) => {
  const [zap, setZap] = useState([]);
  const [uloga, setUloga] = useState([]);

  useEffect(() => {
    getZaposleni();
  }, []);

  const sortedZaposleni = zap.sort((a, b) => a.id - b.id);

  const getZaposleni = async () => {
    try {
      const { data } = await httpCommon.get("/zaposleni");
      setZap(data);
    } catch (error) {
      if (
        error.response &&
        (error.response.status === 401 || error.response.status === 400)
      ) {
        eventBus.dispatch("logout");
      } else {
        console.error("Greška prilikom fetching zaposlene: ", error);
      }
    }
  };

  const getUloge = async () => {
    try {
      const { data } = await httpCommon.get("/uloge");
      setUloga(data);
    } catch (error) {
      if (
        error.response &&
        (error.response.status === 401 || error.response.status === 400)
      ) {
        eventBus.dispatch("logout");
      } else {
        console.error("Greška prilikom fetching uloge: ", error);
      }
    }
  };

  const registracija = async (zaposleni) => {
    try {
      const { data } = await httpCommon.post("/auth/signup", zaposleni);
      getZaposleni();
    } catch (error) {
      if (
        error.response &&
        (error.response.status === 401 || error.response.status === 400)
      ) {
        eventBus.dispatch("logout");
      } else {
        console.error("Greška prilikom dodavanja zaposlenog: ", error);
      }
    }
  };

  const deleteZaposleni = async (id) => {
    try {
      await httpCommon.delete(`/zaposleni/delete/${id}`);
      getZaposleni();
    } catch (error) {
      if (
        error.response &&
        (error.response.status === 401 || error.response.status === 400)
      ) {
        eventBus.dispatch("logout");
      } else {
        console.error("Greška prilikom brisanja zaposlenog: ", error);
      }
    }
  };

  const editZaposleni = async (id, zaposleni) => {
    try {
      await httpCommon.put(
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
        }
      );
      getZaposleni(); // Refresh or fetch data after successful update
    } catch (error) {
      if (
        error.response &&
        (error.response.status === 401 || error.response.status === 400)
      ) {
        eventBus.dispatch("logout");
      } else {
        console.error("Error updating zaposleni:", error.response || error);
      }
    }
  };

  return (
    <ZaposleniContext.Provider
      value={{
        sortedZaposleni,
        uloga,
        registracija,
        deleteZaposleni,
        editZaposleni,
      }}
    >
      {props.children}
    </ZaposleniContext.Provider>
  );
};

export default ZaposleniContextProvider;
