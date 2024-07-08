import ZaposleniContextProvider from "./ZaposleniContext";
import ZaposleniList from "./ZaposleniList";

const ZaposleniHome = () => {
  return (
    <div className="container-xl">
      <div className="table-responsive">
        <div className="table-wrapper">
          <ZaposleniContextProvider>
            <ZaposleniList />
          </ZaposleniContextProvider>
        </div>
      </div>
    </div>
  );
};

export default ZaposleniHome;
