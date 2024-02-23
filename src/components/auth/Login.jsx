import { useState} from "react";
import { Button, Form, Row, Col, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaUser } from "react-icons/fa";
import axios from "axios";
import tssurl from "../../port";
import Google_sigin from "./Google_sigin";
import Register from "./Register";

const Login = ({ data }) => {
  const [show, setShow] = useState(data);
  const [authMode, setAuthMode] = useState("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [forgetPasswordModal, setForgetPasswordModal] = useState(false);
  const navigate = useNavigate();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleForgetPasswordModalClose = () => setForgetPasswordModal(false);
  const handleForgetPasswordModalShow = () => {
    setForgetPasswordModal(true);
    setShow(false);
  };

  const validateEmail = (email) => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
  };

  const handleSendEmail = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${tssurl}/auth/forgot-password`, { email });
      toast.success(res.data.message);
      handleForgetPasswordModalClose();
    } catch (error) {
      console.error("Error sending email:", error);
      toast.error("Failed to send email");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      toast.error("Invalid email format");
      return;
    }

    try {
      const formData = { email, password };

      const url = `${tssurl}/auth/Login`;

      const response = await axios.post(url, formData);
      const authToken = response?.data?.authToken;
      const mID = response?.data?.mid;

      if (response.status === 200 && authMode === "signin") {
        setEmail("");
        setPassword("");
        toast.success("Login Successful");
        localStorage.setItem("authToken", authToken);
        localStorage.setItem("MID", mID);
        navigate("/");
      } else {
        toast.error("Operation Unsuccessful", response.data.message);
      }
      handleClose();
    } catch (error) {
      toast.error(error.response?.data?.message || "Error occurred");
    }
  };

  return (
    <>
      <FaUser size={15} style={{ cursor: "pointer" }} onClick={handleShow} />

      <Modal size="md" show={show} onHide={handleClose} centered>
        <Modal.Header closeButton className="auth">
          <Modal.Title>
            <Row>
              <Col
                onClick={() => setAuthMode("signin")}
                className={authMode === "signin" ? "active" : ""}
              >
                Login
              </Col>
              <Col
                onClick={() => setAuthMode("signup")}
                className={authMode === "signup" ? "active" : ""}
              >
                Register
              </Col>
            </Row>
          </Modal.Title>
        </Modal.Header>
        <div>
          <Google_sigin authMode={authMode} />
        </div>
        {authMode === "signin" ? (
          <>
            <Modal.Body className="pb-0 mb-0">
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                <p className="text-center mt-2">
                  <Form.Text
                    style={{ cursor: "pointer", fontWeight: "700" }}
                    onClick={handleForgetPasswordModalShow}
                  >
                    Forgot Password?
                  </Form.Text>
                </p>
              </Form>
            </Modal.Body>
            <Modal.Footer className="flex">
              <Button
                className="loginbtn"
                variant="dark"
                onClick={handleSubmit}
              >
                Log In
              </Button>
            </Modal.Footer>
          </>
        ) : (
          <Register authMode={authMode} />
        )}
      </Modal>
      <Modal
        show={forgetPasswordModal}
        onHide={handleForgetPasswordModalClose}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Forget Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            onSubmit={(e) => {
              handleForgetPasswordModalClose();
              handleSendEmail(e);
            }}
          >
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" type="submit">
            Reset Password
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Login;
