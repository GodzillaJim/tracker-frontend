import React, { useState, useEffect } from "react";
import axios from "axios";
import Navigation from "../components/Navigation";
import Loader from "../components/Loader";
import { useSelector, useDispatch } from "react-redux";
import { SET_TOKEN } from "../constants/constants";

import {
  Container,
  Row,
  Col,
  Form,
  Card,
  Button,
  Image,
} from "react-bootstrap";
import { useFileUpload } from "use-file-upload";

const RegisterScreen = ({ history }) => {
  const dispatch = useDispatch();
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
  const [image, setImage] = useState("");
  const [file, selectFile] = useFileUpload();
  const [uploadedImage, setUploadedImage] = useState(false);
  const [fileUploadMessage, setFileUploadMessage] = useState(null);
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
  const [showUpload, setShowUpload] = useState(false);
  const [loadingImage, setLoadingImage] = useState(false);
  const [alarm, setAlarm] = useState("text-info");
  const [name, setName] = useState("");
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
  const { token } = useSelector((state) => state);
  useEffect(() => {
    console.log(history);
    // Check if user is logged in already
    if (token !== "") {
      window.location.href = "/profile";
    }
    // Check all fields are filled
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
  const handleImageUpload = (e) => {
    selectFile({ accept: "image/*" }, ({ source, name, size, file }) => {
      // Validating file type
      let fileName = name.split(".");
      let fileType = fileName[fileName.length - 1];
      if (!file.type.includes("image")) {
        setFileUploadMessage("Wrong file type, you uploaded: " + fileType);
        setUploadedImage(false);
      } else {
        setFileUploadMessage(null);
        setUploadedImage(true);
      }
      setName(name);
    });
  };
  const handleCreateAccount = async () => {
    // Upload image first to get image link
    setLoadingImage(true);
    let formData = new FormData();
    formData.append("file", file.file);
    try {
      let { data } = await axios.post(
        "http://localhost:8080/api/users/file",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      setImage(data);
    } catch (error) {
      setImage("default-image.png");
    }
    let user = {
      firstName,
      lastName,
      email,
      password,
      image,
    };
    console.log(user);
    try {
      let { data } = await axios.post("/api/users/register", {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        image: image,
      });
      let { token } = data;
      dispatch({ type: SET_TOKEN, payload: token });
      localStorage.setItem("token", token);
      history.push("/profile");
    } catch (error) {
      setLoadingImage(false);
      console.log(error);
    }
  };
  return (
    <div>
      <Navigation history={history} />
      <Container style={{ display: showUpload && "none" }}>
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
                <Col md={8} sm={12} lg={8}>
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
                <Col md={8} sm={12} lg={8}>
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
                <Col md={8} sm={12} lg={8}>
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
                <Col md={8} sm={12} lg={8}>
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
                    className="m-3 ml-auto float-end"
                    onClick={() => setShowUpload(!showUpload)}
                  >
                    Next
                  </Button>
                </Col>
              </Row>
            </Form>
          </Card.Body>
          <Card.Footer>
            Already registered? <a href="/">Log in here</a>
          </Card.Footer>
        </Card>
      </Container>
      <Container style={{ display: !showUpload && "none" }}>
        <Card>
          <Card.Header>Upload a profile photo</Card.Header>
          <Card.Body>
            <Row style={{ minHeight: "350px" }}>
              <Col>
                <Image
                  src={file && file.source ? file.source : image}
                  fluid
                  thumbnail
                />
              </Col>
              <Col>
                <Card.Text>
                  The picture must be one of the following types only:
                </Card.Text>
                <Card.Text>jiff, jpg, png, jpeg</Card.Text>
                <Button
                  disabled={loadingImage}
                  type="button"
                  onClick={handleImageUpload}
                >
                  Upload Picture
                </Button>
                <br />
                <small className="text-danger">
                  {fileUploadMessage &&
                    fileUploadMessage +
                      ". Please upload an image file to continue."}
                </small>
              </Col>
            </Row>
            <Row>
              <Col>
                <Button
                  disabled={loadingImage}
                  type="button m-3 float-start"
                  className="m-3"
                  onClick={() => setShowUpload(!showUpload)}
                >
                  Previous
                </Button>
              </Col>
              <Col>
                {loadingImage ? (
                  <Loader className="float-end" />
                ) : (
                  <Button
                    type="button"
                    variant="primary"
                    className="m-3 float-end"
                    disabled={!uploadedImage}
                    onClick={handleCreateAccount}
                  >
                    Create account
                  </Button>
                )}
              </Col>
            </Row>
          </Card.Body>
          <Card.Footer>
            Already registered? <a href="/">Log in here</a>
          </Card.Footer>
        </Card>
      </Container>
    </div>
  );
};

export default RegisterScreen;
