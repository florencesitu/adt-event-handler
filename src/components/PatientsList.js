import React, { useState } from "react";
import { Container, Table, Pagination } from "react-bootstrap";
import Patient from "./Patient";

function PatientsList({ patients, discharge, transfer }) {
  const [currentPage, setCurrentPage] = useState(1);
  const patientsPerPage = 10;

  const totalPages = Math.ceil(patients.length / patientsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const getPatientsForCurrentPage = () => {
    const startIndex = (currentPage - 1) * patientsPerPage;
    const endIndex = startIndex + patientsPerPage;
    return patients.slice(startIndex, endIndex);
  };

  return (
    <Container>
      <div className="table-responsive">
        <Table className="mt-4" striped bordered hover size="sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Date of Birth</th>
              <th>Gender</th>
              <th>Bed</th>
              <th>Admission Date</th>
              <th>Discharge Date</th>
            </tr>
          </thead>
          <tbody>
            {getPatientsForCurrentPage().length > 0 ? (
              getPatientsForCurrentPage().map((patient) => (
                <Patient
                  key={patient.id}
                  patient={patient}
                  discharge={discharge}
                  transfer={transfer}
                />
              ))
            ) : (
              <tr>
                <td colSpan="8">No patients available</td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
      <Pagination>
        {Array.from({ length: totalPages }, (_, index) => index + 1).map((number) => (
          <Pagination.Item
            key={number}
            active={number === currentPage}
            onClick={() => handlePageChange(number)}
          >
            {number}
          </Pagination.Item>
        ))}
      </Pagination>
    </Container>
  );
}

export default PatientsList;
