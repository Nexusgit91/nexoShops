import { useState } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";
import { faUser, faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./SignUp.css"; // import custom CSS styles

function SignUp() {
  const [formState, setFormState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [emailTaken, setEmailTaken] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    setFormState((prevFormState) => ({
      ...prevFormState,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formState),
    };
    fetch("/api/signup", requestOptions)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else if (response.status === 409) {
          setEmailTaken(true);
          throw new Error("Email already taken");
        } else {
          throw new Error("Internal server error");
        }
      })
      .then((data) => {
        console.log(data);
        setFormState({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
        setEmailTaken(false);
        window.location.replace("/login");
      })
      .catch((error) => {
        console.error("Error sending data to backend:", error);
      });
  }

  return (
    <Container
      className="signup-container"
      style={{ width: "30%", marginTop: "100px" }}
    >
      <h1>Sign Up</h1>
      {emailTaken && (
        <Alert variant="danger" className="mt-4 mb-4">
          This email is already taken. Please choose a different one.
        </Alert>
      )}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formFirstName">
          <Form.Label className="form-label">
            <FontAwesomeIcon icon={faUser} />
            First Name
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter first name"
            name="firstName"
            value={formState.firstName}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="formLastName">
          <Form.Label className="form-label">
            <FontAwesomeIcon icon={faUser} />
            Last Name
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter last name"
            name="lastName"
            value={formState.lastName}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="formEmail">
          <Form.Label className="form-label">
            <FontAwesomeIcon icon={faEnvelope} />
            Email address
          </Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            name="email"
            value={formState.email}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="formPassword">
          <Form.Label className="form-label">
            <FontAwesomeIcon icon={faLock} />
            Password
          </Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            name="password"
            value={formState.password}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="formConfirmPassword">
          <Form.Label className="form-label">
            <FontAwesomeIcon icon={faLock} />
            Confirm Password
          </Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm password"
            name="confirmPassword"
            value={formState.confirmPassword}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Button
          variant="primary"
          type="submit"
          className="submit-btn"
          style={{ marginTop: "30px" }}
        >
          Sign Up
        </Button>
      </Form>
    </Container>
  );
}

export default SignUp;
