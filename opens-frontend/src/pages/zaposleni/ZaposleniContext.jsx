import { createContext, useEffect, useState } from "react";
import { httpPublic } from "../../apis/http";
import useHttpProtected from "../../hooks/useHttpProtected";
import useToast from "../../hooks/useToast";
import axios from "axios";

export const ZaposleniContext = createContext();

const ZaposleniContextProvider = ({ children, navigate, location }) => {
  const [zap, setZap] = useState([]);
  const [uloga, setUloga] = useState([]);

  const httpProtected = useHttpProtected();
  const { handleShowToast } = useToast();

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

  const getUloge = async () => {
    const controller = new AbortController();
    try {
      const { data } = await httpProtected.get("/uloge", {
        signal: controller.signal,
      });
      setUloga(data);
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

  const registracija = async (zaposleni) => {
    const controller = new AbortController();
    try {
      const { data } = await httpPublic.post("/signup", zaposleni, {
        signal: controller.signal,
      });
      handleShowToast(
        "Registracija uspešna",
        "Uspešno ste se registrovali zaposlenog",
        "success"
      );
      console.log("DAta je: " + JSON.stringify(data))
      return data;
    } catch (error) {
      console.error("Greška tokom registracije:", error);  // Ispisivanje cele greške u konzolu
  
      if (error.response) {
        // Ako server odgovara sa greškom, proveravamo status
        const statusCode = error.response.status;
        const errorData = error.response.data;
        
        if (statusCode === 409) {
          // E-mail je već u upotrebi
          handleShowToast("Greška", "E-mail je već u upotrebi", "danger");
        } else {
          // Ostale greške sa servera
          handleShowToast("Greška", "Registracija zaposlenog nije uspela!", "danger");
        }
        console.log("Detalji greške sa servera:", errorData);  // Logovanje odgovora
      } else if (error.request) {
        // Ako nema odgovora od servera
        console.log("Nema odgovora sa servera:", error.request);
        handleShowToast("Greška", "Nema odgovora sa servera", "danger");
      } else {
        // Ako je greška u samom kodu (npr. greška u Axios-u)
        console.log("Došlo je do greške:", error.message);
        handleShowToast("Greška", "Došlo je do greške pri slanju zahteva", "danger");
      }
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
      if (error.response?.status === 400) {
        handleShowToast(
          "Greška",
          "Podaci o zaposlenom su neispravni. Molimo proverite zahtev i pokušajte ponovo.",
          "danger"
        );
      } else if (error.response?.status >= 500) {
        handleShowToast(
          "Greška",
          "Došlo je do greške na serveru prilikom izmene zaposlenog. Molimo pokušajte ponovo kasnije.",
          "danger"
        );
      } else if (error.name !== "CanceledError") {
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
      if (error.response?.status === 400) {
        handleShowToast(
          "Greška",
          "Nevalidan ID za brisanje zaposlenog. Molimo proverite zahtev i pokušajte ponovo.",
          "danger"
        );
      } else if (error.response?.status >= 500) {
        handleShowToast(
          "Greška",
          "Došlo je do greške na serveru prilikom brisanja zaposlenog. Molimo pokušajte ponovo kasnije.",
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
