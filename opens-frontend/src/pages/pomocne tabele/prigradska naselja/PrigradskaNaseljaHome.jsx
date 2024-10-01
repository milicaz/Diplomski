import PrigradskaNaseljaContextProvider from "./PrigradskaNaseljaContext";
import PrigradskaNaseljaList from "./PrigradskaNaseljaList";

const PrigradskaNaseljaHome = () => {
  return (
    <PrigradskaNaseljaContextProvider>
      <>
        <PrigradskaNaseljaList />
      </>
    </PrigradskaNaseljaContextProvider>
  );
};

export default PrigradskaNaseljaHome;
