import { Button, styled } from "@mui/material";
import React, { useContext } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Container, NavDropdown } from "react-bootstrap";
import { BootstrapButton } from "./Button";
import { AuthContext } from "../context/authContext";
import AccountMenu from "./Layout/AccountMenu";
import { useDispatch, useSelector } from "react-redux";
import { AuthSlice } from "../redux/Auth/AuthSlice";

const NavbarComponent = () => {
  const { logOut, status } = useContext(AuthContext);
  const navigate = useNavigate();
  const { authToken } = useSelector((state) => ({
    authToken: state.Auth.authToken,
  }));
  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      bg="warning"
      variant="light"
      sticky="top">
      <Container fluid>
        <Navbar.Brand href="/home" style={{ fontSize: "40px" }}>
          Calendly
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />

        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto m-auto">
            <Nav.Link href="/individuals">Individuals</Nav.Link>
            <Nav.Link href="/teams">Teams</Nav.Link>
            <Nav.Link href="/enterprise">Enterprise</Nav.Link>
            <NavDropdown title="Product" id="collasible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="/pricing">Pricing</Nav.Link>
            <NavDropdown title="Resources" id="collasible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
            {authToken ? (
              <AccountMenu />
            ) : (
              <>
                <Nav.Link eventKey={1}>
                  <Button
                    sx={{ color: "rgba(0, 0, 0,0.9)", fontSize: "16px" }}
                    onClick={() => navigate("/auth/login")}>
                    Sign In
                  </Button>
                </Nav.Link>
                <Nav.Link eventKey={2}>
                  <BootstrapButton onClick={() => navigate("/auth/register")}>
                    Get Started
                  </BootstrapButton>
                </Nav.Link>
              </>
            )}
            {/* <Nav.Link eventKey={3}>
              <BootstrapButton onClick={() => logOut()}>Logout</BootstrapButton>
            </Nav.Link> */}
          </Nav>{" "}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
