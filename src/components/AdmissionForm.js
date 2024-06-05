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

  const [errors, setErrors] = useState({
    dateOfBirth: "",
    admissionDate: "",
    currentBed: "",
  });

  const validateDate = (name, value) => {
    if (value === null) {
      return "A date is required";
    }
    return "";
  };

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => {
      const newFormData = {
        ...prevFormData,
        [name]: value,
      };
      return newFormData;
    });

    if (name === "currentBed") {
      setErrors((prevErrors) => ({ ...prevErrors, currentBed: validateBed(value) }));
    }
  };

  const handleDateChange = (name, value) => {
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: validateDate(name, value) }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    let isValid = true;
    ["dateOfBirth", "admissionDate", "currentBed"].forEach((key) => {
      newErrors[key] = validateDate(key, formData[key]) || validateBed(formData.currentBed);
      if (newErrors[key]) isValid = false;
    });

    setErrors(newErrors);
    if (!isValid) return;

    const id = Date.now().toString();

    const newPatient = {
      id,
      ...formData,
      dateOfBirth: formData.dateOfBirth.toISOString(),
      admissionDate: formData.admissionDate.toISOString(),
      dischargeDate: null,
    };
    console.log("Patient submission", formData.admissionDate);

    admission(newPatient);
    setFormData({
      firstName: "",
      lastName: "",
      dateOfBirth: null,
      gender: "",
      admissionDate: null,
      currentBed: "",
    });
  };

  return (
    <Container>
      <Row className="header">
        <h2 >Patient Admission Form</h2>
      </Row>
      <Form className="admission-form" onSubmit={handleSubmit}>
        <Row>
          <Form.Group as={Col} className="mb-3">
            <Form.Label>First name</Form.Label>
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
            <Form.Label>Last name</Form.Label>
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
            <Form.Label>Date of Birth</Form.Label>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                className="form-input"
                value={formData.dateOfBirth}
                onChange={(newValue) =>
                  handleDateChange("dateOfBirth", newValue)
                }
                slotProps={{ textField: { variant: "outlined", error: !!errors.dateOfBirth } }}
              />
            </LocalizationProvider>
            {errors.dateOfBirth && <Row className="error-message">{errors.dateOfBirth}</Row>}
          </Form.Group>
        </Row>
        <Row>
          <Form.Group as={Col} className="mb-3">
            <Form.Label>Gender</Form.Label>
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
              <option value="other">Other</option>
            </Form.Control>
          </Form.Group>
        </Row>
        <Row>
          <Form.Group as={Col} className="mb-3">
            <Form.Label>Admission Date</Form.Label>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                className="form-input"
                value={formData.admissionDate}
                onChange={(newValue) =>
                  handleDateChange("admissionDate", newValue)
                }
                slotProps={{ textField: { variant: "outlined", error: !!errors.admissionDate } }}
              />
            </LocalizationProvider>
            {errors.admissionDate && <Row className="error-message">{errors.admissionDate}</Row>}
          </Form.Group>
        </Row>
        <Row>
          <Form.Group as={Col} className="mb-3">
            <Form.Label>Current Bed</Form.Label>
            <Form.Control
              className="form-input"
              name="currentBed"
              type="text"
              placeholder="Enter Patient's Current Bed"
              required
              value={formData.currentBed}
              onChange={handleChange}
            />
            {errors.currentBed && <Row className="error-message">{errors.currentBed}</Row>}
          </Form.Group>
        </Row>
        <Row>
          <Button
            className="form-button"
            type="submit"
          >
            Submit
          </Button>
        </Row>
      </Form>
    </Container>
  );
}

export default AdmissionForm;
