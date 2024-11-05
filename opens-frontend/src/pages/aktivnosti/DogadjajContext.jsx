import { createContext, useEffect, useState } from "react";
import useHttpProtected from "../../hooks/useHttpProtected";

export const DogadjajContext = createContext();

const DogadjajContextProvider = ({ children, navigate, location }) => {
  const [dogadjaji, setDogadjaji] = useState([]);
  const [organizacijaId, setOrganizacijaId] = useState(null);
  const [currentOrganizacija, setCurrentOrganizacija] = useState({
    naziv: "",
    odgovornaOsoba: "",
    brojTelefona: "",
    email: "",
    delatnost: "",
    opis: "",
    link: "",
  });
  const [mestaDogadjaja, setMestaDogadjaja] = useState([]);
  const [tipoviDogadjaja, setTipoviDogadjaja] = useState([]);
  const [dogadjajId, setDogadjajId] = useState(null);

  const httpProtected = useHttpProtected();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const fetchData = async () => {
      await getDogadjaji(isMounted, controller);
      await getMesta(isMounted, controller);
      await getTipovi(isMounted, controller);
    };

    fetchData();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [organizacijaId, currentOrganizacija, dogadjajId]);

  const sortedDogadjaji = dogadjaji.sort((a, b) => a.id - b.id);

  /*
   * METODE ZA DOGADJAJ
   */
  const getDogadjaji = async (isMounted, controller) => {
    try {
      const { data } = await httpProtected.get("/dogadjaji", {
        signal: controller.signal,
      });
      if (isMounted) {
        setDogadjaji(data);
      }
    } catch (error) {
      if (error.name !== "CanceledError") {
        console.error("Greška prilikom fetching događaja: ", error);
        navigate("/logovanje", { state: { from: location }, replace: true });
      }
    }
  };

  const addDogadjaj = async (addDog) => {
    const controller = new AbortController();
    try {
      const response = await httpProtected.post("/dogadjaji", addDog, {
        signal: controller.signal,
      });
      setDogadjajId(response.data.id);
      getDogadjaji(true, controller);
    } catch (error) {
      if (error.name !== "CanceledError") {
        console.error("Greška prilikom dodavanja događaja: ", error);
        navigate("/logovanje", { state: { from: location }, replace: true });
      }
    } finally {
      controller.abort();
    }
  };

  const deleteDogadjaj = async (id) => {
    const controller = new AbortController();
    try {
      await httpProtected.delete(`/dogadjaj/delete/${id}`, {
        signal: controller.signal,
      });
      getDogadjaji(true, controller);
    } catch (error) {
      if (error.name !== "CanceledError") {
        console.error("Greška prilikom brisanja događaja: ", error);
        navigate("/logovanje", { state: { from: location }, replace: true });
      }
    } finally {
      controller.abort();
    }
  };

  /*
   * METODE ZA ORGANIZACIJU
   */

  const getOrganizacijaById = async (id) => {
    const controller = new AbortController();
    try {
      const response = await httpProtected.get(`/organizacije/${id}`, {
        signal: controller.signal,
      });
      setCurrentOrganizacija(response.data);
    } catch (error) {
      if (error.name !== "CanceledError") {
        console.error("Greška prilikom fetching organizacije po id: ", error);
        navigate("/logovanje", { state: { from: location }, replace: true });
      }
    } finally {
      controller.abort();
    }
  };

  const addOrganizacija = async (addOrg) => {
    const controller = new AbortController();
    try {
      const response = await httpProtected.post("/organizacije", addOrg, {
        signal: controller.signal,
      });
      setOrganizacijaId(response.data.id);
      return response.data;
    } catch (error) {
      if (error.name !== "CanceledError") {
        console.error("Greška prilikom dodavanja organizacije: ", error);
        navigate("/logovanje", { state: { from: location }, replace: true });
      }
    } finally {
      controller.abort();
    }
  };

  const editOrganizacija = async (id, editOrg) => {
    const controller = new AbortController();
    try {
      await httpProtected.put(`/organizacije/${id}`, editOrg, {
        signal: controller.signal,
      });
    } catch (error) {
      if (error.name !== "CanceledError") {
        console.error("Greška prilikom izmene organizacije: ", error);
        navigate("/logovanje", { state: { from: location }, replace: true });
      }
    } finally {
      controller.abort();
    }
  };

  const getMesta = async (isMounted, controller) => {
    try {
      const { data } = await httpProtected.get("/mestaDogadjaja", {
        signal: controller.signal,
      });
      if (isMounted) {
        setMestaDogadjaja(data);
      }
    } catch (error) {
      if (error.name !== "CanceledError") {
        console.error("Greška prilikom fetching mesta događaja: ", error);
        navigate("/logovanje", { state: { from: location }, replace: true });
      }
    }
  };

  const getTipovi = async (isMounted, controller) => {
    try {
      const { data } = await httpProtected.get("/tipoviDogadjaja", {
        signal: controller.signal,
      });
      if (isMounted) {
        setTipoviDogadjaja(data);
      }
    } catch (error) {
      if (error.name !== "CanceledError") {
        console.error("Greška prilikom fetching tipova događaja: ", error);
        navigate("/logovanje", { state: { from: location }, replace: true });
      }
    }
  };

  const dodajUcesnika = async (ucesnik, id) => {
    const controller = new AbortController();
    try {
      await httpProtected.post(`/ucesniciDogadjaja/${id}`, ucesnik, {
        signal: controller.signal,
      });
      getDogadjaji(true, controller);
    } catch (error) {
      if (error.name !== "CanceledError") {
        console.error("Greška prilikom dodavanja ucesnika na događaj: ", error);
        navigate("/logovanje", { state: { from: location }, replace: true });
      }
    } finally {
      controller.abort();
    }
  };

  const kreirajPDF = async (mesec, godina, id, ime, prezime) => {
    const controller = new AbortController();
    try {
      const response = await httpProtected.get(
        `/dogadjajiView/${mesec}/${godina}/${id}`,
        {
          params: {
            ime: ime,
            prezime: prezime,
          },
          responseType: "blob",
          signal: controller.signal,
        }
      );
      const blob = new Blob([response.data], { type: "application/pdf" });

      const url = window.URL.createObjectURL(blob);

      // Create an anchor element
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "dogadjajireport.pdf");

      // Append the link to the body
      document.body.appendChild(link);

      // Trigger the download
      link.click();

      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      if (error.name !== "CanceledError") {
        console.error("Error downloading PDF:", error);
        navigate("/logovanje", { state: { from: location }, replace: true });
      }
    } finally {
      controller.abort();
    }
  };

  return (
    <DogadjajContext.Provider
      value={{
        sortedDogadjaji,
        organizacijaId,
        currentOrganizacija,
        mestaDogadjaja,
        tipoviDogadjaja,
        dogadjajId,
        addDogadjaj,
        deleteDogadjaj,
        getOrganizacijaById,
        addOrganizacija,
        editOrganizacija,
        dodajUcesnika,
        kreirajPDF,
      }}
    >
      {children}
    </DogadjajContext.Provider>
  );
};

export default DogadjajContextProvider;
