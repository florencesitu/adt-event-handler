import React, { useState } from "react";
import { Button, Row } from "react-bootstrap";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

function Patient({ patient, discharge, transfer }) {
  const [newBed, setNewBed] = useState("");
  const [dischargeDate, setDischargeDate] = useState("");
  const [dischargeError, setDischargeError] = useState(false);
  const [transferError, setTransferError] = useState(false);
  const [transferErrorMessage, setTransferErrorMessage] = useState("");

  const validateBed = (value) => {
    const numberRegex = /^[0-9]+$/;
    const alphanumericRegex = /^[a-zA-Z0-9]+$/;
    if (numberRegex.test(value)) {
      const numberValue = parseInt(value, 10);
      if (numberValue < 1 || numberValue > 99999) {
        return "Number must be between 1 and 99999";
      }
    } else if (!alphanumericRegex.test(value)) {
      return "Invalid input. Only numbers, letters, or a combination are allowed";
    }
    return "";
  };

  const handleDischargeDateChange = (newValue) => {
    setDischargeDate(newValue);
    setDischargeError(false);
  };

  const handleDischarge = () => {
    if (!dischargeDate) {
      setDischargeError(true);
      return;
    }
      discharge(patient.id, dischargeDate);
      setDischargeDate("");
  };

  const handleTransfer = () => {
    if (!newBed) {
      setTransferError(true);
      setTransferErrorMessage("New bed is required");
      return;
    }
    const validationError = validateBed(newBed);
    if (validationError) {
      setTransferError(true);
      setTransferErrorMessage(validationError);
      return;
    }
      transfer(patient.id, newBed);
      setNewBed("");
  };

  return (
    <tr>
      <td>{patient.id}</td>
      <td>{patient.firstName}</td>
      <td>{patient.lastName}</td>
      <td>{new Date(patient.dateOfBirth).toISOString()}</td>
      <td>{patient.gender}</td>
      <td>
        <Row className="px-4">{patient.currentBed}</Row>
        <Row className="custom-input">
          <input
            type="text"
            value={newBed}
            onChange={(e) => {
              setNewBed(e.target.value);
              setTransferError(false);
              setTransferErrorMessage("");
            }}
            placeholder="New Bed"
            className={`custom-input ${transferError ? "error" : ""}`}
          />
        </Row>
        {transferError && <Row className="error-message">{transferErrorMessage}</Row>}
        <Row className="px-4">
          <Button onClick={handleTransfer}>Transfer</Button>
        </Row>
      </td>
      <td>{new Date(patient.admissionDate).toISOString()}</td>
      <td>
        <Row className="px-4">
          {patient.dischargeDate
            ? new Date(patient.dischargeDate).toISOString()
            : "N/A"}
        </Row>
        <Row className="custom-input">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              value={dischargeDate}
              onChange={handleDischargeDateChange}
              slotProps={{
                textField: {
                  variant: "outlined",
                  error: dischargeError,
                  helperText: dischargeError ? "Discharge date is required" : "",
                  className: `custom-datepicker ${dischargeError ? "error" : ""}`
                }
              }}
            />
          </LocalizationProvider>
        </Row>
        <Row className="px-4">
          <Button onClick={handleDischarge}>Discharge</Button>
        </Row>
      </td>
    </tr>
  );
}

export default Patient;
