import React from "react";
import { useDispatch } from "react-redux";
import { Nav, Navbar, Button } from "react-bootstrap";
import { LOGOUT, CLEAR_TOKEN } from "../constants/constants";

const Navigation = ({ history }) => {
  const dispatch = useDispatch();
  const handleLogout = () => {
    localStorage.setItem("token", "");
    localStorage.setItem("user", {});
    dispatch({ type: LOGOUT });
    dispatch({ type: CLEAR_TOKEN });
    history.push("/");
  };
  return (
    <div>
      <Navbar bg="light">
        <Navbar.Brand href="#home">Tracker</Navbar.Brand>
        <Navbar.Toggle aria-controls="tracker-navbar" />
        <Navbar.Collapse id="tracker-navbar">
          <Nav className="ml-auto">
            <Nav.Item>
              <Button onClick={handleLogout}>Log Out</Button>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default Navigation;
