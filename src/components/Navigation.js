import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Nav, Navbar, Button } from "react-bootstrap";
import { LOGOUT_REQUEST } from "../constants/constants";
import { Link } from "react-router-dom";

const Navigation = ({ history }) => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.setToken);
  const handleLogout = () => {
    localStorage.setItem("token", "");
    localStorage.setItem("profile", null);
    dispatch({ type: LOGOUT_REQUEST });
  };
  return (
    <div>
      <Navbar collapseOnSelect expand="lg" bg="dark" className="text-light">
        <Navbar.Brand href="#home" className="text-light">
          Tracker
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="tracker-navbar" />
        <Navbar.Collapse id="tracker-navbar">
          <Nav className="ms-auto text-light">
            {!token && (
              <Nav.Item>
                <Link className="btn-link link text-light" to="/">
                  Login
                </Link>
              </Nav.Item>
            )}
            {!token && (
              <Nav.Item>
                <Link to="/register" className="btn-link link text-light">
                  Register
                </Link>
              </Nav.Item>
            )}
            {token && (
              <Nav.Item>
                <Link
                  to="#"
                  variant="link"
                  as={Link}
                  className="link text-light"
                  onClick={handleLogout}
                >
                  Log Out
                </Link>
              </Nav.Item>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default Navigation;
