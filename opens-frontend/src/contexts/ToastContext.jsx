import { createContext, useState } from "react";
import { Toast, ToastContainer } from "react-bootstrap";

export const ToastContext = createContext();

export const ToastContextProvider = ({ children }) => {
  const [showToast, setShowToast] = useState(false);
  const [toastHeader, setToastHeader] = useState("");
  const [toastMessage, setToastMessage] = useState("");
  const [toastVariant, setToastVariant] = useState("");

  const handleShowToast = (header, message, variant) => {
    setToastHeader(header);
    setToastMessage(message);
    setToastVariant(variant);
    setShowToast(true);
  };

  return (
    <ToastContext.Provider value={{ handleShowToast }}>
      {children}
      <ToastContainer position='bottom-start'>
        <Toast
          show={showToast}
          onClose={() => setShowToast(false)}
          style={{
            position: "fixed",
            bottom: 20,
            left: 20,
            minWidth: 300,
            backgroundColor: toastVariant === "success" ? "#a3c57b" : "#f56f66",
            color: "white",
          }}
          delay={5000}
          autohide
        >
          <Toast.Header>
            <strong className="me-auto">
              {toastHeader}
            </strong>
          </Toast.Header>
          <Toast.Body>{toastMessage}</Toast.Body>
        </Toast>
      </ToastContainer>
    </ToastContext.Provider>
  );
};
