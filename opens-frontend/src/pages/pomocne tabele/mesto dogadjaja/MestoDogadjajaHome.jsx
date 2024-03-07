import MestoDogadjajaContextProvider from "./MestoDogadjajaContext";
import MestoDogadjajaList from "./MestoDogadjajaList";

const MestoDogadjajaHome = () => {
  return (
    <div className="container-xl">
      <div className="table-responsive">
        <div className="table-wrapper">
          <MestoDogadjajaContextProvider>
            <MestoDogadjajaList />
          </MestoDogadjajaContextProvider>
        </div>
      </div>
    </div>
  );
};

export default MestoDogadjajaHome;
