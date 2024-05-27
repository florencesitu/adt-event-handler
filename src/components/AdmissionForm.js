import React, { useState } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import "../App.css";

function AdmissionForm({ admission }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: null,
    gender: "",
    admissionDate: null,
    currentBed: "",
  });
  const [formValid, setFormValid] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => {
      const newFormData = {
        ...prevFormData,
        [name]: value,
      };
      setFormValid(
        newFormData.firstName.trim() !== "" &&
          newFormData.lastName.trim() !== "" &&
          newFormData.dateOfBirth !== null &&
          newFormData.gender.trim() !== "" &&
          newFormData.admissionDate !== null &&
          newFormData.currentBed.trim() !== ""
      );
      return newFormData;
    });
  };

  const handleDateChange = (name, value) => {
    setFormData((prevFormData) => {
      const newFormData = {
        ...prevFormData,
        [name]: value,
      };
      setFormValid(
        newFormData.firstName.trim() !== "" &&
          newFormData.lastName.trim() !== "" &&
          newFormData.dateOfBirth !== null &&
          newFormData.gender.trim() !== "" &&
          newFormData.admissionDate !== null &&
          newFormData.currentBed.trim() !== ""
      );
      return newFormData;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const id = Date.now().toString();
    const newPatient = {
      id,
      ...formData,
      dischargeDate: null,
    };

    admission(newPatient);
    setFormData({
      firstName: "",
      lastName: "",
      dateOfBirth: null,
      gender: "",
      admissionDate: null,
      currentBed: "",
    });
    setFormValid(false);
  };

  return (
    <Container>
      <Row className="header">
        <h2 >Patient Admission Form</h2>
      </Row>
      <Form className="admission-form" onSubmit={handleSubmit}>
        <Row>
          <Form.Group as={Col} className="mb-3">
            <Form.Label>Patient first name</Form.Label>
            <Form.Control
              className="form-input"
              name="firstName"
              type="text"
              placeholder="Enter First Name"
              required
              value={formData.firstName}
              onChange={handleChange}
            />
          </Form.Group>
        </Row>
        <Row>
          <Form.Group as={Col} className="mb-3">
            <Form.Label>Patient last name</Form.Label>
            <Form.Control
              className="form-input"
              name="lastName"
              type="text"
              placeholder="Enter Last Name"
              required
              value={formData.lastName}
              onChange={handleChange}
            />
          </Form.Group>
        </Row>
        <Row>
          <Form.Group as={Col} className="mb-3">
            <Form.Label>Patient Date of Birth</Form.Label>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                className="form-input"
                value={formData.dateOfBirth}
                onChange={(newValue) =>
                  handleDateChange("dateOfBirth", newValue)
                }
                slotProps={{ textField: { variant: "outlined" } }}
              />
            </LocalizationProvider>
          </Form.Group>
        </Row>
        <Row>
          <Form.Group as={Col} className="mb-3">
            <Form.Label>Patient Gender</Form.Label>
            <Form.Control
              as="select"
              className="form-input"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
            >
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </Form.Control>
          </Form.Group>
        </Row>
        <Row>
          <Form.Group as={Col} className="mb-3">
            <Form.Label>Patient Admission Date</Form.Label>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                className="form-input"
                value={formData.admissionDate}
                onChange={(newValue) =>
                  handleDateChange("admissionDate", newValue)
                }
                slotProps={{ textField: { variant: "outlined" } }}
              />
            </LocalizationProvider>
          </Form.Group>
        </Row>
        <Row>
          <Form.Group as={Col} className="mb-3">
            <Form.Label>Patient's Current Bed</Form.Label>
            <Form.Control
              className="form-input"
              name="currentBed"
              type="text"
              placeholder="Enter Patient's Current Bed"
              required
              value={formData.currentBed}
              onChange={handleChange}
            />
          </Form.Group>
        </Row>
        <Row>
          <Button
            className="form-button"
            type="submit"
            disabled={!formValid}
          >
            Submit
          </Button>
        </Row>
      </Form>
    </Container>
  );
}

export default AdmissionForm;
