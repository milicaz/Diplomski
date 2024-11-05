import { useEffect, useState } from "react";
import { Button, Form, Toast } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import Select from "react-select";
import useHttpProtected from "../../hooks/useHttpProtected";

const Login = () => {
  const [oprema, setOprema] = useState([]);
  const [options, setOptions] = useState([]);
  const [mestaPosete, setMestaPosete] = useState([]);

  const [posetilac, setPosetilac] = useState(null);
  const [mestoPoseteId, setMestaPoseteId] = useState();
  const [selectedOprema, setSelectedOprema] = useState([]);

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastVariant, setToastVariant] = useState("");

  const httpProtected = useHttpProtected();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const fetchData = async () => {
      try {
        const requests = [
          httpProtected.get("/posetioci", { signal: controller.signal }),
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
        if (error.name !== "CanceledError") {
          console.error("Greška prilikom fetching podataka: ", error);
          navigate("/logovanje", { state: { from: location }, replace: true });
        }
      }
    };

    fetchData();

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
    } catch (error) {
      if (error.name !== "CanceledError") {
        console.error("Greška tokom kreiranja posete:", error);
        navigate("/logovanje", { state: { from: location }, replace: true });
      }
    } finally {
      controller.abort();
    }
  };

  const handleShowToast = (message, variant) => {
    setToastMessage(message);
    setToastVariant(variant);
    setShowToast(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const posetaData = {
        posetilacEmail: posetilac.value,
        oprema: selectedOprema.map((oprema) => ({ id: oprema.value })),
        mestoPoseteID: mestoPoseteId,
      };
      await addPosetu(posetaData);
      handleShowToast(
        `Uspešno ste kreirali posetu za posetioca: ${posetilac.value}`,
        "success"
      );
      setPosetilac(null);
      setMestaPoseteId(null);
      setSelectedOprema(null);
    } catch (error) {
      console.error("Greska tokom kreiranja posete:", error);
      handleShowToast(
        `Greška tokom kreiranja posete za posetioca: ${posetilac.value}`,
        "error"
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
      <Toast
        show={showToast}
        onClose={() => setShowToast(false)}
        style={{
          position: "fixed",
          bottom: 20,
          left: 20,
          minWidth: 300,
          backgroundColor: toastVariant === "success" ? "#a3c57b" : "#f56f66",
          color: "white",
        }}
        delay={3000}
        autohide
      >
        <Toast.Header>
          <strong className="me-auto">
            {toastVariant === "success" ? "" : "Greška"}
          </strong>
        </Toast.Header>
        <Toast.Body>{toastMessage}</Toast.Body>
      </Toast>
    </>
  );
};

export default Login;
