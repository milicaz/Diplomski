import MestoPoseteContextProvider from "./MestoPoseteContext";
import MestoPoseteList from "./MestoPoseteList";

const MestoPoseteHome = () => {
  return (
    <MestoPoseteContextProvider>
      <>
        <MestoPoseteList />
      </>
    </MestoPoseteContextProvider>
  );
};

export default MestoPoseteHome;
