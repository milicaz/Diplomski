import PrigradskaNaseljaContextProvider from "./PrigradskaNaseljaContext";
import PrigradskaNaseljaList from "./PrigradskaNaseljaList";

const PrigradskaNaseljaHome = () => {
  return (
    <div className="container-xl">
      <div className="table-responsive">
        <div className="table-wrapper">
          <PrigradskaNaseljaContextProvider>
            <PrigradskaNaseljaList />
          </PrigradskaNaseljaContextProvider>
        </div>
      </div>
    </div>
  );
};

export default PrigradskaNaseljaHome;
