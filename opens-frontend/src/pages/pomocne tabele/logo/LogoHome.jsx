import LogoContextProvider from "./LogoContext";
import LogoList from "./LogoList";

const LogoHome = () => {
  return (
    <div className="container-xl">
      <div className="table-responsive">
        <div className="table-wrapper">
          <LogoContextProvider>
            <LogoList />
          </LogoContextProvider>
        </div>
      </div>
    </div>
  );
};

export default LogoHome;
