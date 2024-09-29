// import { LocalDate, LocalTime } from "@js-joda/core";
// import React, { useEffect, useState } from "react";
// import httpCommon from "../../../http-common";
// import { Button, Form } from "react-bootstrap";
// import Select from "react-select";

// export const AddPrvuPosetuForm = () => {
//   const [validated, setValidated] = useState(false);
//   const [errors, setErrors] = useState({});

//   const [options, setOptions] = useState([]);
//   const [mestaPosete, setMestaPosete] = useState([]);
//   const [posetilac, setPosetilac] = useState(null);
//   const [mestaPoseteId, setMestaPoseteId] = useState();
//   const [datumPosete, setDatumPosete] = useState(LocalDate.now());
//   const [vremePosete, setVremePosete] = useState(LocalTime.NOON);
//   const [vremeOdjave, setVremeOdjave] = useState(LocalTime.NOON);

//   const fetchPosetioci = async () => {
//     try {
//       const response = await httpCommon.get("/posetioci");
//       const formattedOptions = response.data.map((option) => ({
//         value: option.email,
//         label: `${option.ime} ${option.prezime} (${option.email})`,
//         data: option,
//       }));
//       setOptions(formattedOptions);
//     } catch (error) {
//       console.error("Greška prilikom fetching posetioci:", error);
//     }
//   };

//   const fetchMestaPosete = async () => {
//     const { data } = await httpCommon.get("/mestaPosete");
//     setMestaPosete(data);
//   };

//   const handlePosetilacChange = (selectedOption) => {
//     setPosetilac(selectedOption);
//   };

//   const addPrvuPosetu = async (newPoseta) => {
//     httpCommon.post("/posete/prva", newPoseta);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const newErrors = {};

//     if (!posetilac) {
//       newErrors.posetilac = "Izaberite posetioca.";
//     }

//     if (!mestaPoseteId) {
//       newErrors.mestaPoseteId = "Izaberite mesto posete.";
//     }

//     if (Object.keys(newErrors).length > 0) {
//       setErrors(newErrors);
//       console.log( "Ima gresaka");
//       setValidated(true);
//     } else {
//       setErrors({});
//       setValidated(true);
//       console.log("Nema gresaka");
//       // Handle successful form submission here
//       try {
//         const posetaData = {
//           posetilacEmail: posetilac.value,
//           mestoPoseteID: mestaPoseteId,
//           datumPosete: datumPosete,
//           vremePosete: vremePosete,
//           vremeOdjave: vremeOdjave,
//         };
//         addPrvuPosetu(posetaData);
//         window.location.reload();
//       } catch (error) {
//         console.error("Greska tokom kreiranja posete:", error);
//       }
//     }
//   };

//   useEffect(() => {
//     fetchPosetioci();
//     fetchMestaPosete();
//   }, []);

//   return (
//     <>
//       <Form noValidate validated={validated} onSubmit={handleSubmit}>
//         <Select
//           className="mb-3"
//           value={posetilac}
//           onChange={handlePosetilacChange}
//           options={options}
//           placeholder={"Posetilac"}
//           isSearchable
//         />
//         {errors.posetilac && (
//           <Form.Text className="text-danger">{errors.posetilac}</Form.Text>
//         )}
//         <div className="mb-3">
//           <span className="mx-3">Mesto posete:</span>
//           {mestaPosete.map((mesto) => (
//             <Form.Check
//               inline
//               key={mesto.id}
//               label={`${mesto.nazivMesta}`}
//               name="mestoPoseteID"
//               type="radio"
//               value={mesto.id}
//               onChange={() => setMestaPoseteId(mesto.id)}
//               checked={mestaPoseteId === mesto.id}
//             />
//           ))}
//           {errors.mestaPoseteId && (
//             <Form.Text className="text-danger">
//               {errors.mestaPoseteId}
//             </Form.Text>
//           )}
//         </div>
//         <Form.Group>
//           <Form.Label>Datum posete:</Form.Label>
//           <Form.Control
//             className="mb-3"
//             name="datumPosete"
//             value={datumPosete}
//             onChange={(e) => setDatumPosete(e.target.value)}
//             type="date"
//             max={datumPosete}
//             isInvalid={validated && !datumPosete}
//           />
//           <Form.Control.Feedback type="invalid">
//             Unesite datum posete.
//           </Form.Control.Feedback>
//         </Form.Group>
//         <Form.Group>
//           <Form.Label>Vreme posete:</Form.Label>
//           <Form.Control
//             className="mb-3"
//             name="vremePosete"
//             value={vremePosete}
//             onChange={(e) => setVremePosete(e.target.value)}
//             type="time"
//             isInvalid={validated && !vremePosete}
//           />
//           <Form.Control.Feedback type="invalid">
//             Unesite vreme posete.
//           </Form.Control.Feedback>
//         </Form.Group>
//         <Form.Group>
//           <Form.Label>Vreme odjave:</Form.Label>
//           <Form.Control
//             className="mb-3"
//             name="vremeOdjave"
//             value={vremeOdjave}
//             onChange={(e) => setVremeOdjave(e.target.value)}
//             type="time"
//             isInvalid={validated && !vremeOdjave}
//           />
//           <Form.Control.Feedback type="invalid">
//             Unesite vreme odjave.
//           </Form.Control.Feedback>
//         </Form.Group>
//         <div className="d-grid gap-2 mt-3">
//           <Button variant="success" type="submit" size="lg">
//             Dodaj posetu
//           </Button>
//         </div>
//       </Form>
//     </>
//   );
// };
// export default AddPrvuPosetuForm;
