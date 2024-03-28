import { useContext} from "react";
import { LogoContext } from "./LogoContext";

const LogoList = () => {
  const { base64 } = useContext(LogoContext);

  console.log("Base64 je: " + base64)

  // const [show, setShow] = useState(false);

  // const handleShow = () => setShow(true);

  // const handleClose = () => setShow(false);

  //  useEffect(() => {
  //   handleClose();
  // }, [base64]);



  return (
    <>
      {/* <img alt="Logo" src={{uri: `data:image/png;base64,${base64}`}} /> */}
      {/* <img src={`data:image/png;charset=utf-8;base64,${base64}`} /> NE RADI!!!!! */}
      {/* <img src="|data:image/png;base64,*{base64}|" className="product-image"></img> */}
      {/* <input type="file" name="image" accept="image/png, image/jpeg"/> */}
      <img alt="Logo" src={base64} />
    </>
  )
};

export default LogoList;
