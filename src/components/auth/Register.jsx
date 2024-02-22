import { Form, Modal, Button } from "react-bootstrap";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import axios from "axios";
import tssurl from "../../port";

const Register = () => {
  const [authMode, setAuthMode] = useState("signup");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
  };

  const handlePasswordChange = (e) => {
    const { value } = e.target;
    setConfirmPassword(value);
    setPasswordError(
      password !== value ? "Passwords do not match" : "Passwords match"
    );
  };

  const getPasswordValidationMessage = () =>
    !password
      ? null
      : !/.{8,}/.test(password)
      ? "Password length must be at least 8 characters"
      : "Password is valid";

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
        toast.error("Invalid email format");
        return;
      }

    if (authMode === "signup" && password !== confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    } else {
      setPasswordError("");
    }

    try {
      const formData = { email, name, password, mobileNo };
      const url = `${tssurl}/auth/Signup`;

      const response = await axios.post(url, formData);
      if (response.status === 201 && authMode === "signup") {
        setName("");
        setEmail("");
        setPassword("");
        setMobileNo("");
        setConfirmPassword("");
        toast.success("Email Verification Sent");
        navigate("/");
      } else {
        toast.error("Operation Unsuccessful", response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error occurred");
    }
  };

  return (
    <>
      <Modal.Body className="pb-0 mb-0">
        <Form onSubmit={handleSubmit} className="mb-3">
          <Form.Group controlId="formBasicName">
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="e.g Jane Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Form.Group>
          <div className="pt-2" />
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>
          <div className="pt-2" />
          <Form.Group controlId="formBasicMobileNo">
            <Form.Label>Mobile No.</Form.Label>
            <Form.Control
              type="text"
              placeholder="Mobile Number"
              value={mobileNo}
              onChange={(e) => setMobileNo(e.target.value)}
              required
            />
          </Form.Group>
          <div className="pt-2" />
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>
          <small className="password-validation-message text-muted">
            {getPasswordValidationMessage()}
          </small>
          <div className="pt-2" />
          <Form.Group controlId="formBasicConfirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={handlePasswordChange}
              required
            />
          </Form.Group>
          <div
            className={`password-validation-message ${
              passwordError === "Passwords match"
                ? "text-success"
                : "text-danger"
            }`}
          >
            {passwordError}
          </div>
        </Form>
      </Modal.Body>
      <Modal.Footer className="flex">
        <Button className="loginbtn" variant="dark" onClick={handleSubmit}>
          Sign Up
        </Button>
      </Modal.Footer>
    </>
  );
};

export default Register;
