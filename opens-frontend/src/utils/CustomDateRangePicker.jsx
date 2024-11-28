import React from "react";
import useToast from "../hooks/useToast";
import { FloatingLabel, Form } from "react-bootstrap";

const CustomDateRangePicker = ({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
}) => {
  const { handleShowToast } = useToast();

  const handleStartDateChange = (e) => {
    const newStartDate = e.target.value;
    if (newStartDate <= endDate || !endDate) {
      setStartDate(newStartDate);
    } else {
      handleShowToast(
        "Greška",
        "Početni datum ne može biti nakon završnog datuma",
        "danger"
      );
    }
  };

  const handleEndDateChange = (e) => {
    const newEndDate = e.target.value;
    if (newEndDate >= startDate || !startDate) {
      setEndDate(newEndDate);
    } else {
      handleShowToast(
        "Greška",
        "Završni datuma ne može biti pre početnog datuma",
        "danger"
      );
    }
  };

  return (
    <div className="row">
      <div className="col">
        <FloatingLabel label="Od">
          <Form.Control
            type="date"
            value={startDate}
            onChange={handleStartDateChange}
            max={endDate || undefined}
          />
        </FloatingLabel>
      </div>

      <div className="col">
        <FloatingLabel label="Do">
          <Form.Control
            type="date"
            value={endDate}
            onChange={handleEndDateChange}
            min={startDate || undefined}
          />
        </FloatingLabel>
      </div>
    </div>
  );
};

export default CustomDateRangePicker;
