import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import Select from "react-select";
import useHttpProtected from "../../hooks/useHttpProtected";
import useToast from "../../hooks/useToast";

const Login = () => {
  const [oprema, setOprema] = useState([]);
  const [options, setOptions] = useState([]);
  const [mestaPosete, setMestaPosete] = useState([]);

  const [posetilac, setPosetilac] = useState(null);
  const [mestoPoseteId, setMestaPoseteId] = useState();
  const [selectedOprema, setSelectedOprema] = useState([]);

  const httpProtected = useHttpProtected();
  const navigate = useNavigate();
  const location = useLocation();
  const { handleShowToast } = useToast();

  const fetchData = async (isMounted, controller) => {
    try {
      const requests = [
        httpProtected.get("/posetioci/bezPosete", {
          signal: controller.signal,
        }),
        httpProtected.get("/mestaPosete", { signal: controller.signal }),
        httpProtected.get("/oprema/slobodna", { signal: controller.signal }),
      ];
      const [posetiociData, mestaPoseteData, opremaData] = await Promise.all(
        requests
      );

      if (isMounted) {
        const formattedOptions = posetiociData.data.map((option) => ({
          value: option.email,
          label: `${option.ime} ${option.prezime} (${option.email})`,
          data: option,
        }));
        setOptions(formattedOptions);
        setMestaPosete(mestaPoseteData.data);
        setOprema(opremaData.data);
      }
    } catch (error) {
      if (error.response?.status >= 500) {
        handleShowToast(
          "Greška",
          "Greška prilikom pribavljanja podataka",
          "danger"
        );
      } else if (error.name !== "CanceledError") {
        navigate("/logovanje", { state: { from: location }, replace: true });
      }
    }
  };

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    fetchData(isMounted, controller);

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  const handlePosetilacChange = (selectedOption) => {
    setPosetilac(selectedOption);
  };

  const handleOpremaChange = (selectedOptions) => {
    setSelectedOprema(selectedOptions);
  };

  const addPosetu = async (newPoseta) => {
    const controller = new AbortController();
    try {
      await httpProtected.post("/posete", newPoseta, {
        signal: controller.signal,
      });
      await fetchData(true, controller);
      handleShowToast(
        "Uspešno kreirana poseta",
        `Uspešno ste kreirali posetu za posetioca: ${posetilac.value}`,
        "success"
      );
    } catch (error) {
      if (error.response?.status >= 500) {
        handleShowToast("Greška", "Greška tokom kreiranja posete", "danger");
      } else if (!error?.response) {
        handleShowToast(
          "Greška",
          "Greška u mreži. Zahtev nije mogao biti poslat zbog greške u mreži.",
          "danger"
        );
      } else if (error.name !== "CanceledError") {
        navigate("/logovanje", { state: { from: location }, replace: true });
      }
    } finally {
      controller.abort();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!posetilac || !posetilac.value) {
      handleShowToast("Greška", "Molimo Vas odaberite posetioca", "danger");
      return;
    }

    if (!mestoPoseteId) {
      handleShowToast("Greška", "Molimo Vas izaberite mesto posete.", "danger");
      return;
    }

    try {
      const posetaData = {
        posetilacEmail: posetilac.value,
        oprema: selectedOprema.map((oprema) => ({ id: oprema.value })),
        mestoPoseteID: mestoPoseteId,
      };
      await addPosetu(posetaData);
      setPosetilac(null);
      setMestaPoseteId(null);
      setSelectedOprema(null);
    } catch (error) {
      console.error("Greska tokom kreiranja posete:", error);
      handleShowToast(
        "",
        `Greška tokom kreiranja posete za posetioca: ${posetilac.value}`,
        "danger"
      );
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Select
          className="mb-3"
          value={posetilac}
          onChange={handlePosetilacChange}
          options={options}
          placeholder={"Posetilac"}
          isSearchable
        />
        <div className="mb-3">
          <span className="mx-3">Mesto posete:</span>
          {mestaPosete.map((mesto) => (
            <Form.Check
              inline
              key={mesto.id}
              label={`${mesto.nazivMesta}`}
              name="mestoPoseteID"
              type="radio"
              value={mesto.id}
              onChange={() => setMestaPoseteId(mesto.id)}
              checked={mestoPoseteId === mesto.id}
            />
          ))}
        </div>
        <Select
          className="mb-3"
          value={selectedOprema}
          onChange={handleOpremaChange}
          options={
            oprema.length > 0
              ? oprema.map((item) => ({
                  value: item.id,
                  label:
                    item.tipOpreme.naziv + " ( " + item.serijskiBroj + " ) ",
                }))
              : []
          }
          placeholder={"Oprema"}
          isMulti
          isSearchable
        />
        <div className="d-grid gap-2 mt-3">
          <Button variant="success" type="submit" size="lg">
            Check-in
          </Button>
        </div>
      </Form>
    </>
  );
};

export default Login;
