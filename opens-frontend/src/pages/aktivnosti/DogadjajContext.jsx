import { createContext, useEffect, useState } from "react";
import httpCommon from "../../http-common";
import eventBus from "../../utils/eventBus";

export const DogadjajContext = createContext();

const DogadjajContextProvider = (props) => {
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

  useEffect(() => {
    getDogadjaji();
    getMesta();
    getTipovi();
    if (organizacijaId !== null) {
      console.log("Organizacija id je: " + organizacijaId);
    }
    if (dogadjajId !== null) {
      console.log("Dogadjaj id je: " + dogadjajId);
    }
  }, [organizacijaId, currentOrganizacija, dogadjajId]);

  const sortedDogadjaji = dogadjaji.sort((a, b) => a.id - b.id);

  const getDogadjaji = async () => {
    try {
      const { data } = await httpCommon.get("/dogadjaji");
      setDogadjaji(data);
    } catch (error) {
      if (
        error.response &&
        (error.response.status === 401 || error.response.status === 400)
      ) {
        eventBus.dispatch("logout");
      } else {
        console.error("Greška prilikom fetching događaja: ", error);
      }
    }
  };

  const addOrganizacija = async (addOrg) => {
    try {
      const response = await httpCommon.post("/organizacije", addOrg);
      setOrganizacijaId(response.data.id);
    } catch (error) {
      if (
        error.response &&
        (error.response.status === 401 || error.response.status === 400)
      ) {
        eventBus.dispatch("logout");
      } else {
        console.error("Greška prilikom dodavanja organizacije: ", error);
      }
    }
  };

  const addDogadjaj = async (addDog) => {
    try {
      const response = await httpCommon.post("/dogadjaji", addDog);
      setDogadjajId(response.data.id);
      getDogadjaji();
    } catch (error) {
      if (
        error.response &&
        (error.response.status === 401 || error.response.status === 400)
      ) {
        eventBus.dispatch("logout");
      } else {
        console.error("Greška prilikom dodavanja događaja: ", error);
      }
    }
  };

  const deleteDogadjaj = async (id) => {
    try {
      const response = await httpCommon.delete(`/dogadjaj/delete/${id}`);
      getDogadjaji();
    } catch (error) {
      if (
        error.response &&
        (error.response.status === 401 || error.response.status === 400)
      ) {
        eventBus.dispatch("logout");
      } else {
        console.error("Greška prilikom brisanja događaja: ", error);
      }
    }
  };

  const editOrganizacija = async (id, editOrg) => {
    try {
      await httpCommon.put(`/organizacije/${id}`, editOrg);
    } catch (error) {
      if (
        error.response &&
        (error.response.status === 401 || error.response.status === 400)
      ) {
        eventBus.dispatch("logout");
      } else {
        console.error("Greška prilikom izmene organizacije: ", error);
      }
    }
  };

  const getOrganizacijaById = async (id) => {
    try {
      const response = await httpCommon.get(`/organizacije/${id}`);
      setCurrentOrganizacija(response.data);
    } catch (error) {
      if (
        error.response &&
        (error.response.status === 401 || error.response.status === 400)
      ) {
        eventBus.dispatch("logout");
      } else {
        console.error("Greška prilikom fetching organizacije po id: ", error);
      }
    }
  };

  const getMesta = async () => {
    try {
      const { data } = await httpCommon.get("/mestaDogadjaja");
      setMestaDogadjaja(data);
    } catch (error) {
      if (
        error.response &&
        (error.response.status === 401 || error.response.status === 400)
      ) {
        eventBus.dispatch("logout");
      } else {
        console.error("Greška prilikom fetching mesta događaja: ", error);
      }
    }
  };

  const getTipovi = async () => {
    try {
      const { data } = await httpCommon.get("/tipoviDogadjaja");
      setTipoviDogadjaja(data);
    } catch (error) {
      if (
        error.response &&
        (error.response.status === 401 || error.response.status === 400)
      ) {
        eventBus.dispatch("logout");
      } else {
        console.error("Greška prilikom fetching tipova događaja: ", error);
      }
    }
  };

  const dodajUcesnika = async (ucesnik, id) => {
    try {
      await httpCommon.post(`/ucesniciDogadjaja/${id}`, ucesnik);
    } catch (error) {
      if (
        error.response &&
        (error.response.status === 401 || error.response.status === 400)
      ) {
        eventBus.dispatch("logout");
      } else {
        console.error("Greška prilikom dodavanja ucesnika na događaj: ", error);
      }
    }
  };

  const kreirajPDF = async (mesec, godina, id, ime, prezime) => {
    try {
      const response = await httpCommon.get(
        `/dogadjajiView/${mesec}/${godina}/${id}`,
        {
          params: {
            ime: ime,
            prezime: prezime,
          },
          responseType: "blob",
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
      if (
        error.response &&
        (error.response.status === 401 || error.response.status === 400)
      ) {
        eventBus.dispatch("logout");
      } else {
        console.error("Error downloading PDF:", error);
      }
    }
  };

  return (
    <DogadjajContext.Provider
      value={{
        sortedDogadjaji,
        addDogadjaj,
        addOrganizacija,
        editOrganizacija,
        organizacijaId,
        getOrganizacijaById,
        currentOrganizacija,
        mestaDogadjaja,
        tipoviDogadjaja,
        dogadjajId,
        dodajUcesnika,
        kreirajPDF,
        deleteDogadjaj,
      }}
    >
      {props.children}
    </DogadjajContext.Provider>
  );
};

export default DogadjajContextProvider;
