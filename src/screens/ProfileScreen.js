import React, { useEffect, useState } from "react";
import $ from "jquery";
import { useSelector, useDispatch } from "react-redux";
import { LOGIN } from "../constants/constants";
import { Container, Row, Col, Card, Image, Form } from "react-bootstrap";
import Navigation from "../components/Navigation";
import Loader from "../components/Loader";

const ProfileScreen = ({ history }) => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state);
  const { user: userData } = useSelector((state) => state);
  const { user } = userData;
  const [loadingData, setLoadingData] = useState(true);
  const [error, setError] = useState(null);
  const [userLoaded, setUserLoaded] = useState(false);

  useEffect(async () => {
    if (token == "") {
      history.push("/");
      return;
    }
    if (!userLoaded) {
      try {
        var settings = {
          url: "http://localhost:8080/api/users/profile",
          method: "GET",
          timeout: 0,
          headers: {
            Authorization: "Bearer " + token,
          },
        };

        $.ajax(settings)
          .done(function (response) {
            dispatch({ type: LOGIN, payload: response.data });
            console.log(response);
          })
          .fail((error) => {
            setLoadingData(false);
            setError(error);
          });
      } catch (error) {
        setUserLoaded(false);
        setLoadingData(false);
        setError(error);
      }
    }
    if (user && user.email) {
      setUserLoaded(true);
    }
  }, [user]);
  return (
    <div>
      <Navigation history={history} />
      <Container>
        <Row>
          <Col md={8} sm={12} lg={8} className="mx-auto">
            {error ? (
              <Card>{JSON.stringify(error)}</Card>
            ) : loadingData ? (
              <Loader />
            ) : (
              <Card>
                <Card.Header>User Profile</Card.Header>
                <Card.Body>
                  <Row>
                    <Col>
                      <Image
                        src={user ? user.image : "/default-image.png"}
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
