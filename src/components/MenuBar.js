import React from "react";
import "../App.css";
import { Container, Navbar, Nav } from "react-bootstrap";

function MenuBar({setActiveComponent}) {

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">Altea Healthcare</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link onClick={() => setActiveComponent("admission")}>
              Admission Form
            </Nav.Link>
            <Nav.Link onClick={() => setActiveComponent("list")}>
              Patient List
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MenuBar;
