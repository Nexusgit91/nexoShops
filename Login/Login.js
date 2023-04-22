import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (response.ok) {
      // Login successful, redirect to profile page
      const data = await response.json();
      window.sessionStorage.setItem("email", email); // store email in session storage
      window.location.replace("/profile");
      alert("user logged in");
    } else {
      alert("Invalid email or password");
      // Login failed, display error message
      const data = await response.json();
    }
  };

  const signUpHandler = () => {
    window.location.replace("/signup");
  };

  return (
    <div className="d-flex justify-content-center align-items-center">
      <Form
        onSubmit={handleSubmit}
        className="border p-4 rounded"
        style={{ marginTop: "100px", width: "30%", border: "2px solid black" }}
      >
        <h1 className="text-center mb-4">Login</h1>
        <Form.Group>
          <Form.Label className="d-flex align-items-center">
            <FontAwesomeIcon icon={faEnvelope} className="me-2" />
            Email:
          </Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={handleEmailChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label className="d-flex align-items-center">
            <FontAwesomeIcon icon={faLock} className="me-2" />
            Password:
          </Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </Form.Group>
        <Button type="submit" className="mt-3">
          Login
        </Button>
        <p className="mt-3">
          Don't have an account? <Button onClick={signUpHandler}>Signup</Button>
        </p>
      </Form>
    </div>
  );
}

export default Login;
