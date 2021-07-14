import React, { useState, useEffect } from "react";
import { Container, Card, Row, Col, Form, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { loginAction } from "../actions/actions";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";

const LoginScreen = ({ history }) => {
  const dispatch = useDispatch();
  const { token, error, loading } = useSelector((state) => state.setToken);
  useEffect(() => {
    if (token) {
      history.push("/profile");
    }
  }, [token]);
  const [showPass, setShowPass] = useState(false);
  const [password, setPassword] = useState();
  const [email, setEmail] = useState();
  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(loginAction({ email, password }));
  };
  return (
    <Container>
      <Row>
        <Col md={8} sm={12} lg={8} className="mx-auto">
          <Card style={{ top: "25%" }}>
            <Card.Header>Log in</Card.Header>
            {error && (
              <Card.Text className="text-center text-danger">
                Email or password is wrong.
              </Card.Text>
            )}
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
                      {loading ? (
                        <Loader className="float-end m-3" />
                      ) : (
                        <Button type="submit" className="float-end m-3">
                          Login
                        </Button>
                      )}
                    </Form.Group>
                  </Form>
                </Col>
              </Row>
            </Card.Body>
            <Card.Footer>
              New? Create account{" "}
              <Button as={Link} className="link" variant="link" to="/register">
                here
              </Button>
              .
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginScreen;
