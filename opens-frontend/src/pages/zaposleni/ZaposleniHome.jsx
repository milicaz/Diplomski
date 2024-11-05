import { useLocation, useNavigate } from "react-router-dom";
import ZaposleniContextProvider from "./ZaposleniContext";
import ZaposleniList from "./ZaposleniList";

const ZaposleniHome = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <ZaposleniContextProvider navigate={navigate} location={location}>
      <>
        <ZaposleniList />
      </>
    </ZaposleniContextProvider>
  );
};

export default ZaposleniHome;
