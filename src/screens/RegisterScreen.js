import React, { useState, useEffect } from "react";
import Navigation from "../components/Navigation";
import { Container, Row, Col, Form, Card, Button } from "react-bootstrap";

const RegisterScreen = () => {
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState();
  const [passwordType, setPasswordType] = useState("password");
  const [validationMessage, setValidationMessage] = useState(
    "Password must be more than 6 characters long and contain a number"
  );
  const [confirmPassMess, setConfirmPassMess] = useState("");
  const [confirmMessage, setConfirmMessage] = useState("text-danger");
  const [nextButton, setNextButton] = useState(true);
  const validatePassword = (pass) => {
    console.log(pass);
    if (!/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(pass)) {
      setValidationMessage(
        "Password is not okay. It must contain a letter, a number and be longer than six characters"
      );
      setAlarm("text-danger");
      return;
    }
    setValidationMessage("Password looks good");
    setAlarm("text-success");
    return;
  };
  const [alarm, setAlarm] = useState("text-info");
  const handleShowPassword = () => {
    if (passwordType === "password") {
      setPasswordType("text");
      return;
    } else {
      setPasswordType("password");
      return;
    }
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    return validatePassword(e.target.value);
  };
  useEffect(() => {
    if (
      firstName === null ||
      lastName === null ||
      email === null ||
      password === "" ||
      confirmPassword === null
    ) {
      setNextButton(true);
    } else {
      setNextButton(false);
    }
  }, [firstName, lastName, email, password, confirmPassword]);
  const handleConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
    if (e.target.value !== password) {
      setConfirmPassMess("Passwords do not match!");
      setConfirmMessage("text-danger");
      return;
    }
    setConfirmPassMess("Passwords match!");
    setConfirmMessage("text-success");
    return;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(firstName, lastName, email, password);
  };
  return (
    <div>
      <Navigation />
      <Container>
        <Card>
          <Card.Header>Create an account</Card.Header>
          <Card.Body>
            <Form onSubmit={handleSubmit}>
              <Row>
                <Col>
                  <Form.Group>
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="fname"
                      id="fname"
                      onChange={(e) => setFirstName(e.target.value)}
                      value={firstName}
                      required
                      placeholder="Enter your first name"
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="lname"
                      required
                      id="lname"
                      onChange={(e) => setLastName(e.target.value)}
                      value={lastName}
                      placeholder="Enter your last name"
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      required
                      id="email"
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
                      placeholder="abc@example.com"
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type={passwordType}
                      name="password"
                      id="password"
                      required
                      onChange={handlePasswordChange}
                      value={password}
                      placeholder="Enter password"
                    />
                    <small className={alarm}>{validationMessage}</small>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group>
                    <Form.Check
                      type="checkbox"
                      label="Show password"
                      onChange={handleShowPassword}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row className="my-3">
                <Col>
                  <Form.Group>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                      type={passwordType}
                      name="confirmPassword"
                      id="confirmPassword"
                      onChange={handleConfirmPassword}
                      value={confirmPassword}
                    />
                    <small className={confirmMessage}>{confirmPassMess}</small>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Button
                    disabled={nextButton}
                    type="submit"
                    variant="primary"
                    className="m-3 ml-auto"
                  >
                    Next
                  </Button>
                </Col>
              </Row>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default RegisterScreen;
