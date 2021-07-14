import React, { useEffect, useState } from "react";
import $ from "jquery";
import { useSelector, useDispatch } from "react-redux";
import { LOGIN } from "../constants/constants";
import { Container, Row, Col, Card, Image, Form } from "react-bootstrap";
import Navigation from "../components/Navigation";
import Loader from "../components/Loader";
import { getProfileAction } from "../actions/actions";

const ProfileScreen = ({ history }) => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.setToken);
  const { user, loading, error } = useSelector((state) => state.getProfile);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(async () => {
    if (!token) {
      history.push("/");
      return;
    }
    if (!loading && !user) {
      dispatch(getProfileAction(token));
    }
  }, [token]);
  return (
    <div>
      <Navigation history={history} />
      <Container className="my-3">
        <Row>
          <Col md={8} sm={12} lg={8} className="mx-auto">
            {error ? (
              <Card>{JSON.stringify(error)}</Card>
            ) : loading ? (
              <Loader />
            ) : (
              <Card>
                <Card.Header>User Profile</Card.Header>
                <Card.Body>
                  <Row>
                    <Col>
                      <Image
                        src={user ? "/" + user.image : "/default-image.png"}
                        thumbnail
                      />
                    </Col>
                    <Col>
                      <Form>
                        <Row>
                          <Col>
                            <Form.Group>
                              <Form.Label>First Name</Form.Label>
                              <Form.Control
                                type="text"
                                name="firstName"
                                id="firstName"
                                value={user ? user.firstName : ""}
                                readOnly
                              />
                            </Form.Group>
                          </Col>
                          <Col>
                            <Form.Group>
                              <Form.Label>First Name</Form.Label>
                              <Form.Control
                                type="text"
                                name="lastName"
                                id="lastName"
                                value={user ? user.lastName : ""}
                                readOnly
                              />
                            </Form.Group>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <Form.Group>
                              <Form.Label>Email</Form.Label>
                              <Form.Control
                                type="text"
                                name="lastName"
                                id="lastName"
                                value={user ? user.email : ""}
                                readOnly
                              />
                            </Form.Group>
                          </Col>
                        </Row>
                      </Form>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ProfileScreen;
