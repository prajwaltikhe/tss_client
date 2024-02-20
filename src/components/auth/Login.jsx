import { useState, useEffect } from 'react';
import { Button, Form, Row, Col, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaUser } from 'react-icons/fa';
import axios from 'axios';
import tssurl from '../../port';
import { GoogleLogin } from 'react-google-login';
import { gapi } from 'gapi-script';

const Login = ({ data }) => {
  const [show, setShow] = useState(data);
  const [authMode, setAuthMode] = useState('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [forgetPasswordModal, setForgetPasswordModal] = useState(false);
  const navigate = useNavigate();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleForgetPasswordModalClose = () => setForgetPasswordModal(false);
  const handleForgetPasswordModalShow = () => {
    setForgetPasswordModal(true);
    setShow(false);
  };

  const changeAuthMode = () =>
    setAuthMode(authMode === 'signin' ? 'signup' : 'signin');

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handlePasswordChange = (e) => {
    const { value } = e.target;
    setConfirmPassword(value);
    setPasswordError(
      password !== value ? 'Passwords do not match' : 'Passwords match'
    );
  };

  const handleSendEmail = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${tssurl}/auth/forgot-password`, { email });
      toast.success(res.data.message);
      handleForgetPasswordModalClose();
    } catch (error) {
      console.error('Error sending email:', error);
      toast.error('Failed to send email');
    }
  };

  const getPasswordValidationMessage = () =>
    !password
      ? null
      : !/.{8,}/.test(password)
      ? 'Password length must be at least 8 characters'
      : 'Password is valid';

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      toast.error('Invalid email format');
      return;
    }

    if (authMode === 'signup' && password !== confirmPassword) {
      setPasswordError('Passwords do not match');
      return;
    } else {
      setPasswordError('');
    }

    try {
      const formData =
        authMode === 'signin'
          ? { email, password }
          : { email, name, password, mobileNo };
      const url = `${tssurl}/auth/${
        authMode === 'signin' ? 'Login' : 'Signup'
      }`;

      const response = await axios.post(url, formData);
      const authToken = response?.data?.authToken;
      const mID = response?.data?.mid;

      if (response.status === 200 && authMode === 'signin') {
        setEmail('');
        setPassword('');
        toast.success('Login Successful');
        localStorage.setItem('authToken', authToken);
        localStorage.setItem('MID', mID);
        navigate('/');
      } else if (response.status === 201 && authMode === 'signup') {
        setName('');
        setEmail('');
        setPassword('');
        setMobileNo('');
        setConfirmPassword('');
        toast.success('Email Verification Sent');
        navigate('/');
      } else {
        toast.error('Operation Unsuccessful', response.data.message);
      }
      handleClose();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error occurred');
    }
  };

  useEffect(() => {
    const loadGoogleSignInScript = () => {
      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      script.onload = () => initializeGoogleSignIn();
      document.body.appendChild(script);
    };

    const initializeGoogleSignIn = () => {
      window.onSignInSuccess = (response) => {
        const idToken = response.getAuthResponse().id_token;
        axios.defaults.headers.common['Authorization'] = `Bearer ${idToken}`;
      };

      window.onSignInFailure = (error) =>
        console.error('Error signing in:', error);

      window.google.accounts.id.initialize({
        client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
        callback: {
          on_success: window.onSignInSuccess,
          on_failure: window.onSignInFailure,
        },
      });

      window.google.accounts.id.renderButton(
        document.getElementById('signInDiv'),
        { theme: 'outline', size: 'large' }
      );
    };

    loadGoogleSignInScript();
  }, []);

  const handleGoogleLoginSuccess = (response) => {
    const token = response.tokenId;
    fetch('http://localhost:5200/client/google-login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token }),
    })
      .then((response) => response.json())
      .then((data) => console.log('Backend response:', data))
      .catch((error) => console.error('Error:', error));
  };

  const handleGoogleLoginFailure = (error) => {
    console.error('Google login failure:', error);
  };

  useEffect(() => {
    gapi.load('client:auth2', () => {
      gapi.client.init({
        clientId:
          '156987578910-u2mg62hrg7dk6d2deunerts475sr59mb.apps.googleusercontent.com',
        scope: 'email',
      });
    });
  }, []);

  return (
    <>
      <FaUser size={15} style={{ cursor: 'pointer' }} onClick={handleShow} />

      <Modal size="md" show={show} onHide={handleClose} centered>
        <Modal.Header closeButton className="auth">
          <Modal.Title>
            <Row>
              <Col
                onClick={() => setAuthMode('signin')}
                className={authMode === 'signin' ? 'active' : ''}
              >
                Login
              </Col>
              <Col
                onClick={() => setAuthMode('signup')}
                className={authMode === 'signup' ? 'active' : ''}
              >
                Register
              </Col>
            </Row>
          </Modal.Title>
        </Modal.Header>
        <div className="text-center mt-2">
          <GoogleLogin
            clientId="156987578910-u2mg62hrg7dk6d2deunerts475sr59mb.apps.googleusercontent.com"
            buttonText={
              authMode === 'signin'
                ? 'Login with Google'
                : 'Sign Up with Google'
            }
            onSuccess={handleGoogleLoginSuccess}
            onFailure={handleGoogleLoginFailure}
            cookiePolicy={'single_host_origin'}
          />
        </div>
        <Modal.Body className="pb-0 mb-0">
          {authMode === 'signin' ? (
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
                  style={{ cursor: 'pointer', fontWeight: '700' }}
                  onClick={handleForgetPasswordModalShow}
                >
                  Forgot Password?
                </Form.Text>
              </p>
            </Form>
          ) : (
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
                  passwordError === 'Passwords match'
                    ? 'text-success'
                    : 'text-danger'
                }`}
              >
                {passwordError}
              </div>
            </Form>
          )}
        </Modal.Body>

        <Modal.Footer className="flex">
          <Button className="loginbtn" variant="dark" onClick={handleSubmit}>
            {authMode === 'signin' ? 'Log In' : 'Sign Up'}
          </Button>
        </Modal.Footer>
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
