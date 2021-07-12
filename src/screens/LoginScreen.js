import React, { useState, useEffect } from "react";
import { Container, Card, Row, Col, Form, Button } from "react-bootstrap";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { SET_TOKEN } from "../constants/constants";

const LoginScreen = ({ history }) => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state);
  useEffect(() => {
    if (token.length > 1) {
      return history.push("/profile");
    }
  }, [token]);
  const [showPass, setShowPass] = useState(false);
  const [password, setPassword] = useState();
  const [email, setEmail] = useState();
  const handleLogin = (e) => {
    e.preventDefault();
    axios.post("/api/users/login", { email, password }).then((response) => {
      let { data } = response;
      let { token } = data;
      dispatch({ type: SET_TOKEN, payload: token });
      history.push("/profile");
    });
  };
  return (
    <Container>
      <Row>
        <Col md={8} sm={12} lg={8} className="mx-auto">
          <Card style={{ top: "50%" }}>
            <Card.Header>Log in</Card.Header>
            <Card.Body>
              <Row>
                <Col>
                  <Form onSubmit={handleLogin}>
                    <Form.Group>
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        id="email"
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        type={showPass ? "text" : "password"}
                        name="password"
                        id="password"
                        required
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group>
                      <Form.Check
                        type={"checkbox"}
                        label="Show password"
                        onChange={() => setShowPass(!showPass)}
                      />
                    </Form.Group>
                    <Form.Group>
                      <Button type="submit" className="float-end m-3">
                        Login
                      </Button>
                    </Form.Group>
                  </Form>
                </Col>
              </Row>
            </Card.Body>
            <Card.Footer>
              New? Create account <a href="/register">here</a>.
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginScreen;
