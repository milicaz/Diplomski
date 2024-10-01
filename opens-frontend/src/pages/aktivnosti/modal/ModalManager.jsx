import { useState } from "react";
import DogadjajList from "../DogadjajList";
import AddOrganizacijaForm from "./AddOrganizacijaForm";

const ModalManager = () => {
  const [showOrg, setShowOrg] = useState(false);

  const handleCloseOrg = () => setShowOrg(false);
  const handleShowOrg = () => setShowOrg(true);

  return (
    <>
      <DogadjajList
        handleShowOrg={handleShowOrg}
        showOrg={showOrg}
        handleCloseOrg={handleCloseOrg}
      />
      <AddOrganizacijaForm handleCloseOrg={handleCloseOrg} showOrg={showOrg} />
    </>
  );
};

export default ModalManager;
