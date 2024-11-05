import { useLocation, useNavigate } from "react-router-dom";
import MestoDogadjajaContextProvider from "./MestoDogadjajaContext";
import MestoDogadjajaList from "./MestoDogadjajaList";

const MestoDogadjajaHome = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <MestoDogadjajaContextProvider navigate={navigate} location={location}>
      <>
        <MestoDogadjajaList />
      </>
    </MestoDogadjajaContextProvider>
  );
};

export default MestoDogadjajaHome;
