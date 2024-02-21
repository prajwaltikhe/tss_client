import { useState } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import Sidebar from '../components/profile/Sidebar';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import tssurl from '../port';
import { toast } from 'react-toastify';
import ShopTags from '../components/common/Tags';
import 'react-toastify/dist/ReactToastify.css';

const ChangePassword = () => {
  // State variables to manage password input fields and their visibility
  const [passwords, setPasswords] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Function to handle changes in password input fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPasswords({
      ...passwords,
      [name]: value,
    });
  };

  // Functions to toggle the visibility of password input fields
  const togglePasswordVisibility = (type) => {
    switch (type) {
      case 'oldPassword':
        setShowOldPassword(!showOldPassword);
        break;
      case 'newPassword':
        setShowNewPassword(!showNewPassword);
        break;
      case 'confirmPassword':
        setShowConfirmPassword(!showConfirmPassword);
        break;
      default:
        break;
    }
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Retrieve the authorization token from local storage
    const authToken = localStorage.getItem('authToken');
    const mid=localStorage.getItem('mID');
    console.log('authToeken', authToken)
  
    // Check if passwords match
    if (passwords.newPassword === passwords.confirmPassword) {
      try {
        const response = await fetch(`${tssurl}/auth/change-password`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}` // Pass the authorization token with Bearer scheme
          },
          body: JSON.stringify({
            oldPassword: passwords.oldPassword,
            newPassword: passwords.newPassword,
            confirmPassword: passwords.confirmPassword,
            mid: mid // Replace 'your_mid_value' with the actual mid value
          })
        });
          console.log("response",response);
        if (response.ok) {
          // Password changed successfully
          console.log('Password changed successfully');
        } else {
          // Handle error response
          console.error('Failed to change password');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    } else {
      alert('Passwords do not match');
    }
  
    // Reset form after submission
    setPasswords({
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    });
  };
  
  
  

  return (
    <div>
      <Container fluid>
      <Row>
          <ShopTags />
        </Row>
        <p className="mx-5 my-3 fw-bold fs-4">My Account</p>
        <Row>
          <Col md={3}>
            <Sidebar />
          </Col>
          <Col md={9} className="narrow-form-container">
            <form onSubmit={handleSubmit} className="narrow-form-container" style={{marginRight:'100px'}}>
              <div className="form-group password-input">
                <label htmlFor="oldPassword">Old Password:</label>
                <input
                  type={showOldPassword ? 'text' : 'password'}
                  id="oldPassword"
                  name="oldPassword"
                  value={passwords.oldPassword}
                  onChange={handleChange}
                  required
                />
                <div
                  className="password-toggle"
                  onClick={() => togglePasswordVisibility('oldPassword')}
                >
                  {showOldPassword ? (
                    <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                  ) : (
                    <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                  )}
                </div>
              </div>
              <div className="form-group password-input">
                <label htmlFor="newPassword">New Password:</label>
                <input
                  type={showNewPassword ? 'text' : 'password'}
                  id="newPassword"
                  name="newPassword"
                  value={passwords.newPassword}
                  onChange={handleChange}
                  required
                />
                <div
                  className="password-toggle"
                  onClick={() => togglePasswordVisibility('newPassword')}
                >
                  {showNewPassword ? (
                    <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                  ) : (
                    <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                  )}
                </div>
              </div>
              <div className="form-group password-input">
                <label htmlFor="confirmPassword">Confirm Password:</label>
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={passwords.confirmPassword}
                  onChange={handleChange}
                  required
                />
                <div
                  className="password-toggle"
                  onClick={() => togglePasswordVisibility('confirmPassword')}
                >
                  {showConfirmPassword ? (
                    <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                  ) : (
                    <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                  )}
                </div>
              </div>
              <button className="update-button" type="submit">
                Update
              </button>
            </form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ChangePassword;
