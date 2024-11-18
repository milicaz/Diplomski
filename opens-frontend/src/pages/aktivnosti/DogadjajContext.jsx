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
  const [organizacije, setOrganizacije] = useState([]);
  const [dogadjaj, setDogadjaj] = useState([]);


  const httpProtected = useHttpProtected();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const fetchData = async () => {
      await getDogadjaji(isMounted, controller);
      await getMesta(isMounted, controller);
      await getTipovi(isMounted, controller);
      await getOrganizacije(isMounted, controller);
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

  const getDogadjaj = async (id) => {
    const controller = new AbortController();
    try {
      const { data } = await httpProtected.get(`/dogadjaji/${id}`, {signal: controller.signal});
      setDogadjaj(data);
    } catch (error) {
      if (error.name !== "CanceledError") {
        console.error("Greška prilikom fetching događaja: ", error);
        navigate("/logovanje", { state: { from: location }, replace: true });
      }
    } finally {
      controller.abort();
    }
  }

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

  const getOrganizacije = async (isMounted, controller) => {
    try {
      const { data } = await httpProtected.get("/organizacije", {signal: controller.signal});
      if(isMounted) {
        setOrganizacije(data);
      }
    } catch (error) {
      if (error.name !== "CanceledError") {
        console.error("Greška prilikom fetching organizacije: ", error);
        navigate("/logovanje", { state: { from: location }, replace: true });
      }
    }
  }

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

  const getUcesnici = async (id) => {
    const controller = new AbortController();
    try {
      const { data } = await httpProtected.get(`/sviUcesniciDogadjaja/${id}`, {signal: controller.signal});
      return data; // Return the data directly
    } catch (error) {
      if (error.name !== "CanceledError") {
        console.error("Greška prilikom fetching učesnici događaja: ", error);
        navigate("/logovanje", { state: { from: location }, replace: true });
      }
      return []; // Return an empty array if there was an error
    } finally {
      controller.abort();
    }
}

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

  // const kreirajPDF = async (mesec, godina, id, ime, prezime, headerImageId, footerImageId) => {
  //   const controller = new AbortController();
  //   try {
  //     const response = await httpProtected.get(
  //       `/dogadjajiView/${mesec}/${godina}/${id}`,
  //       {
  //         params: {
  //           ime: ime,
  //           prezime: prezime,
  //           headerImageId: headerImageId,
  //           footerImageId: footerImageId 
  //         },
  //         responseType: "blob",
  //         signal: controller.signal,
  //       }
  //     );
  //     const blob = new Blob([response.data], { type: "application/pdf" });

  //     const url = window.URL.createObjectURL(blob);

  //     // Create an anchor element
  //     const link = document.createElement("a");
  //     link.href = url;
  //     link.setAttribute("download", "dogadjajireport.pdf");

  //     // Append the link to the body
  //     document.body.appendChild(link);

  //     // Trigger the download
  //     link.click();

  //     link.parentNode.removeChild(link);
  //     window.URL.revokeObjectURL(url);
  //   } catch (error) {
  //     if (error.name !== "CanceledError") {
  //       console.error("Error downloading PDF:", error);
  //       navigate("/logovanje", { state: { from: location }, replace: true });
  //     }
  //   } finally {
  //     controller.abort();
  //   }
  // };

  const kreirajPDF = async (mesec, godina, id, ime, prezime, headerImageId, footerImageId) => {
    const controller = new AbortController();
    try {
      const response = await httpProtected.get(
        `/dogadjajiView/${mesec}/${godina}/${id}`,
        {
          params: {
            ime: ime,
            prezime: prezime,
            headerImageId: headerImageId, // Can be null or undefined
            footerImageId: footerImageId   // Can be null or undefined
          },
          responseType: "blob", // Expecting PDF in the response
          signal: controller.signal,
        }
      );
  
      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);
  
      // Create an anchor element and download the PDF
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "dogadjajireport.pdf");
  
      // Append the link to the document and trigger the click
      document.body.appendChild(link);
      link.click();
  
      // Clean up
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
        organizacije,
        setOrganizacijaId,
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
        getDogadjaj,
        getUcesnici
      }}
    >
      {children}
    </DogadjajContext.Provider>
  );
};

export default DogadjajContextProvider;
