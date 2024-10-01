import ZaposleniContextProvider from "./ZaposleniContext";
import ZaposleniList from "./ZaposleniList";

const ZaposleniHome = () => {
  return (
    <ZaposleniContextProvider>
      <>
        <ZaposleniList />
      </>
    </ZaposleniContextProvider>
  );
};

export default ZaposleniHome;
