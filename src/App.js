import "./App.css";
import { useState, useEffect } from "react";
import { Container, Col, Row } from "react-bootstrap";
import AdmissionForm from "./components/AdmissionForm";
import PatientsList from "./components/PatientsList";
import { admission, discharge, transfer } from "./eventHandler";
import MenuBar from "./components/MenuBar";
import MessageModal from "./components/MessageModal";

function App() {
  const [activeComponent, setActiveComponent] = useState("admission");
  const [modalMessage, setModalMessage] = useState("");
  const [modalTitle, setModalTitle] = useState("");
  const [modalVariant, setModalVariant] = useState("primary");
  const [showModal, setShowModal] = useState(false);

  const [patientList, setPatientList] = useState([]);
  useEffect(() => {
    const storedPatients = JSON.parse(localStorage.getItem("patients")) || [];
    console.log("Loaded patients (useEffect):", storedPatients);
    setPatientList(storedPatients);
  }, []);

  const handleAdmission = (newPatient) => {
    try {
      console.log("Attempting admission...");
      admission(newPatient);
      const updatedPatients = JSON.parse(localStorage.getItem("patients"));
      console.log("Updated patients (handleAdmission):", updatedPatients);
      setPatientList(updatedPatients);
      setModalMessage("New Patient is added successfully");
      setModalTitle("Success");
      setModalVariant("success");
      setShowModal(true);
    } catch (e) {
      console.error("Admission Error:", e.message);
      setModalMessage(e.message);
      setModalTitle("Error");
      setModalVariant("danger");
      setShowModal(true);
    }
  };

  const handleDischarge = (patientId, dischargeDate) => {
    try {
      console.log("Attempting discharge...");
      discharge(patientId, dischargeDate);
      const updatedPatients = JSON.parse(localStorage.getItem("patients"));
      console.log("Updated patients (handleDischarge):", updatedPatients);
      setPatientList(updatedPatients);
      setModalMessage("Discharge success");
      setModalTitle("Success");
      setModalVariant("success");
      setShowModal(true);
    } catch (e) {
      console.error("Discharge Error:", e.message);
      setModalMessage(e.message);
      setModalTitle("Error");
      setModalVariant("danger");
      setShowModal(true);
    }
  };

  const handleTransfer = (patientId, newBed) => {
    console.log("Attempting transfer...");
    try {
      transfer(patientId, newBed);
      const updatedPatients = JSON.parse(localStorage.getItem("patients"));
      console.log("Updated patients (handleTransfer):", updatedPatients);
      setPatientList(updatedPatients);
      setModalMessage("Transfer success");
      setModalTitle("Success");
      setModalVariant("success");
      setShowModal(true);
    } catch (e) {
      console.error("Transfer Error:", e.message);
      setModalMessage(e.message);
      setModalTitle("Error");
      setModalVariant("danger");
      setShowModal(true);
    }
  };

  return (
    <div className="App">
      <MenuBar setActiveComponent={setActiveComponent} />
      <Container>
        {activeComponent === "admission" && (
          <Row>
            <Col>
              <AdmissionForm admission={handleAdmission}></AdmissionForm>
            </Col>
          </Row>
        )}
        {activeComponent === "list" && (
          <Row>
            <Col>
              <PatientsList
                patients={patientList}
                discharge={handleDischarge}
                transfer={handleTransfer}
              />
            </Col>
          </Row>
        )}
      </Container>
      <MessageModal
        title={modalTitle}
        message={modalMessage}
        variant={modalVariant}
        show={showModal}
        handleClose={() => setShowModal(false)}
      />
    </div>
  );
}

export default App;
