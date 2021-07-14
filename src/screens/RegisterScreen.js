import React, { useState, useEffect } from "react";
import Navigation from "../components/Navigation";
import Loader from "../components/Loader";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

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
import { registerAction, uploadImageAction } from "../actions/actions";

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
  const [alarm, setAlarm] = useState("text-info");
  const [name, setName] = useState("");
  const [enableUpload, setEnableUpload] = useState(false);
  const {
    image: loadedImage,
    loading: loadingImage,
    error: errorImage,
    success,
  } = useSelector((state) => state.uploadImage);
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
  const {
    token,
    loading: tokenLoading,
    error: errorToken,
  } = useSelector((state) => state.setToken);
  useEffect(() => {
    // Check if user is logged in already
    if (token) {
      history.push("/profile");
      return;
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
  }, [firstName, lastName, email, password, confirmPassword, token]);
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
        setEnableUpload(false);
      } else {
        setFileUploadMessage(null);
        setEnableUpload(true);
      }
      setName(name);
    });
  };
  const handleCreateAccount = async () => {
    // Upload image first to get image link
    let user = {
      firstName,
      lastName,
      email,
      password,
      image: loadedImage,
    };

    dispatch(registerAction(user));
  };
  const sendImage = () => {
    let formData = new FormData();
    formData.append("file", file.file);
    dispatch(uploadImageAction(formData));
    if (success) {
      setUploadedImage(false);
    } else {
      setUploadedImage(true);
    }
  };
  return (
    <div>
      <Navigation history={history} />
      <Container className="my-3" style={{ display: showUpload && "none" }}>
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
            Already registered?{" "}
            <Button variant="link" className="link" to="/" as={Link}>
              Log in here
            </Button>
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
                  className="m-2"
                >
                  Select Picture
                </Button>
                <Button
                  onClick={sendImage}
                  disabled={!enableUpload}
                  type="button"
                  className="m-2"
                >
                  Upload
                </Button>
                <br />
                <small className="text-danger">
                  {fileUploadMessage &&
                    fileUploadMessage +
                      ". Please upload an image file to continue."}
                </small>
                {errorImage && (
                  <Card.Text className="text-danger">
                    Something went wrong. Please try again.
                  </Card.Text>
                )}
                {success && (
                  <Card.Text className="text-success">
                    Picture upload successful
                  </Card.Text>
                )}
                {token && (
                  <Card.Text className="text-success">
                    Account creation successful. You are being redirected to the
                    profile page.
                  </Card.Text>
                )}
                {errorToken && (
                  <Card.Text className="text-danger">
                    That email already exists.
                    <Button variant="link" className="link" as={Link} to="/">
                      Login here instead.
                    </Button>
                  </Card.Text>
                )}
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
            Already registered?
            <Button variant="link" className="link" as={Link} to="/">
              Log in
            </Button>
          </Card.Footer>
        </Card>
      </Container>
    </div>
  );
};

export default RegisterScreen;
