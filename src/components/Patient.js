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

  const handleDischargeDateChange = (newValue) => {
    setDischargeDate(newValue);
    setDischargeError(false);
  };

  const handleDischarge = () => {
    if (!dischargeDate) {
      console.log("Discharge Error: Discharge date is required");
      setDischargeError(true);
      return;
    }
    try {
      console.log("Attempting discharge...");
      discharge(patient.id, dischargeDate);
      setDischargeDate("");
    } catch (error) {
      console.error("Discharge Error:", error.message);
    }
  };

  const handleTransfer = () => {
    if (!newBed) {
      console.log("Transfer Error: New bed is required");
      setTransferError(true);
      return;
    }
    try {
      console.log("Attempting transfer...");
      transfer(patient.id, newBed);
      setNewBed("");
    } catch (error) {
      console.error("Transfer Error:", error.message);
    }
  };

  return (
    <tr>
      <td>{patient.id}</td>
      <td>{patient.firstName}</td>
      <td>{patient.lastName}</td>
      <td>{new Date(patient.dateOfBirth).toLocaleDateString()}</td>
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
            }}
            placeholder="New Bed"
            className={`custom-input ${transferError ? "error" : ""}`}
          />
        </Row>
        {transferError && <Row className="error-message">New bed is required</Row>}
        <Row className="px-4">
          <Button onClick={handleTransfer}>Transfer</Button>
        </Row>
      </td>
      <td>{new Date(patient.admissionDate).toLocaleDateString()}</td>
      <td>
        <Row className="px-4">
          {patient.dischargeDate
            ? new Date(patient.dischargeDate).toLocaleDateString()
            : "N/A"}
        </Row>
        <Row className="custom-input">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              value={dischargeDate}
              onChange={handleDischargeDateChange}
              slotProps={{
                textField: {
                  variant: 'outlined',
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
