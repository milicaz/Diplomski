import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import Select from "react-select";
import httpCommon from "../../http-common";
import eventBus from "../../utils/eventBus";

const Login = () => {
  const [oprema, setOprema] = useState([]);
  const [options, setOptions] = useState([]);
  const [mestaPosete, setMestaPosete] = useState([]);

  const [posetilac, setPosetilac] = useState(null);
  const [mestoPoseteId, setMestaPoseteId] = useState();
  const [selectedOprema, setSelectedOprema] = useState([]);

  useEffect(() => {
    fetchPosetioci();
    fetchMestaPosete();
    fetchOprema();
  }, []);

  const fetchPosetioci = async () => {
    try {
      const response = await httpCommon.get("/posetioci");
      const formattedOptions = response.data.map((option) => ({
        value: option.email,
        label: `${option.ime} ${option.prezime} (${option.email})`,
        data: option,
      }));
      setOptions(formattedOptions);
    } catch (error) {
      if (
        error.response &&
        (error.response.status === 401 || error.response.status === 400)
      ) {
        eventBus.dispatch("logout");
      } else {
        console.error("Greška prilikom fetching posetioci:", error);
      }
    }
  };

  const fetchMestaPosete = async () => {
    try {
      const { data } = await httpCommon.get("/mestaPosete");
      setMestaPosete(data);
    } catch (error) {
      if (
        error.response &&
        (error.response.status === 401 || error.response.status === 400)
      ) {
        eventBus.dispatch("logout");
      } else {
        console.error("Greška prilikom fetching mesta posete: ", error);
      }
    }
  };

  const fetchOprema = async () => {
    try {
      const { data } = await httpCommon.get("/oprema/slobodna");
      setOprema(data);
    } catch (error) {
      if (
        error.response &&
        (error.response.status === 401 || error.response.status === 400)
      ) {
        eventBus.dispatch("logout");
      } else {
        console.error("Greška prilikom fetching opreme:", error);
      }
    }
  };

  const handlePosetilacChange = (selectedOption) => {
    setPosetilac(selectedOption);
  };

  const handleOpremaChange = (selectedOptions) => {
    setSelectedOprema(selectedOptions);
  };

  const addPosetu = async (newPoseta) => {
    try {
      const response = await httpCommon.post("/posete", newPoseta);
    } catch (error) {
      if (
        error.response &&
        (error.response.status === 401 || error.response.status === 400)
      ) {
        eventBus.dispatch("logout");
      } else {
        console.error("Greška tokom kreiranja posete:", error);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      const posetaData = {
        posetilacEmail: posetilac.value,
        oprema: selectedOprema.map((oprema) => ({ id: oprema.value })),
        mestoPoseteID: mestoPoseteId,
      };
      addPosetu(posetaData);
      setPosetilac(null);
      setMestaPoseteId(null);
      setSelectedOprema(null);
    } catch (error) {
      console.error("Greska tokom kreiranja posete:", error);
    }
  };

  return (
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
                label: item.tipOpreme.naziv + " ( " + item.serijskiBroj + " ) ",
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
  );
};

export default Login;
