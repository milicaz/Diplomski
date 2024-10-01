import MestoDogadjajaContextProvider from "./MestoDogadjajaContext";
import MestoDogadjajaList from "./MestoDogadjajaList";

const MestoDogadjajaHome = () => {
  return (
    <MestoDogadjajaContextProvider>
      <>
        <MestoDogadjajaList />
      </>
    </MestoDogadjajaContextProvider>
  );
};

export default MestoDogadjajaHome;
