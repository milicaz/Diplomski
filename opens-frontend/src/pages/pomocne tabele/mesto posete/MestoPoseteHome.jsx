import { useLocation, useNavigate } from "react-router-dom";
import MestoPoseteContextProvider from "./MestoPoseteContext";
import MestoPoseteList from "./MestoPoseteList";

const MestoPoseteHome = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <MestoPoseteContextProvider navigate={navigate} location={location}>
      <>
        <MestoPoseteList />
      </>
    </MestoPoseteContextProvider>
  );
};

export default MestoPoseteHome;
