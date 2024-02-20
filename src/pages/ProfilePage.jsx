import React, { useEffect, useState } from 'react';
import { Row, Container, Col, Image } from 'react-bootstrap';
import Tags from '../components/common/Tags';
import Sidebar from '../components/profile/Sidebar';
import AddressCard from '../components/profile/AddressCard';
import tssurl from '../port';
import Profile from '../assets/images/profile1.png';
import { FaLocationDot } from 'react-icons/fa6';
import AddressModal from '../components/profile/AddressModal';

const ProfilePage = () => {
  const handleAddAddress = (addressData) => {
    console.log('Adding address:', addressData);
    setShowModal(false);
  };
  const [showModal, setShowModal] = useState(false);

  const handleBoxClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    dob: '',
    gender: '',
    mobileNo: '',
  });
  console.log('formdata', formData);

  const [originalFormData, setOriginalFormData] = useState({});
  const [editMode, setEditMode] = useState(false);

  const userId = 'MID1707819365581452';
  useEffect(() => {
    fetch(`${tssurl}/auth/users/${userId}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Failed to fetch user data');
        }
      })
      .then((userData) => {
        setFormData(userData?.user);
        setOriginalFormData(userData);
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    console.log('formData', formData);
  };
  const formDataToUpdate = {
    name: formData.name,
    mobileNo: formData.mobileNo,
    gender: formData.gender,
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`${tssurl}/auth/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },

        body: JSON.stringify(formDataToUpdate),
      });

      if (response.ok) {
        console.log('Form data updated successfully');
        setEditMode(false);
      } else {
        console.error('Failed to update form data');
      }
    } catch (error) {
      console.error('Error updating form data:', error);
    }
  };

  const handleCancel = () => {
    setFormData(originalFormData);
    setEditMode(false);
    window.location.reload();
  };
  console.log('dhamani');

  console.log('Aaysu');

  console.log('original', originalFormData);
  return (
    <>
      <Container fluid>
        <Row>
          <Tags />
        </Row>
        <p className="mx-5 my-3 fw-bold fs-4">My Account</p>
        <Row className="flex">
          <Col md={3}>
            <Sidebar />
          </Col>
          <Col md={9}>
            <p className="fw-bold fs-4">Personal Information</p>
            <Row>
              <Col md={3}>
                <div
                  className="profile-options "
                  style={{ marginRight: '50px', marginTop: '25px' }}
                >
                  <div className="profile-picture">
                    <Image
                      src={Profile}
                      alt="Profile"
                      className="rounded-circle"
                      style={{ width: '125px', height: '125px' }}
                    />
                  </div>
                  <div className="upload-new-picture">Upload New Picture</div>
                  <div className="remove-picture">Remove Picture</div>
                </div>
              </Col>
              <Col md={9}>
                <div className="profile-form">
                  <form onSubmit={handleSubmit}>
                    <div className="form-group">
                      <label htmlFor="name">Name:</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData?.name}
                        onChange={handleChange}
                        required
                        disabled={!editMode}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">Email:</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData?.email}
                        required
                        disabled
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="dob">Date of Birth:</label>
                      <input
                        type="date"
                        id="dob"
                        name="dob"
                        value={formData?.dob}
                        onChange={handleChange}
                        disabled={!editMode}
                      />
                    </div>
                    <div className="form-group">
                      <label>Gender:</label>
                      <div className="d-flex flex-row gap-2 align-items-center">
                        <div className="mr-3">
                          <input
                            type="radio"
                            id="male"
                            name="gender"
                            value="male"
                            checked={formData.gender === 'male'}
                            onChange={handleChange}
                            disabled={!editMode}
                          />
                          <label htmlFor="male">Male</label>
                        </div>
                        <div className="mr-3">
                          <input
                            type="radio"
                            id="female"
                            name="gender"
                            value="female"
                            checked={formData.gender === 'female'}
                            onChange={handleChange}
                            disabled={!editMode}
                          />
                          <label htmlFor="female">Female</label>
                        </div>
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="phone">Phone Number:</label>
                      <input
                        type="tel"
                        id="phone"
                        name="mobileNo"
                        value={formData?.mobileNo}
                        onChange={handleChange}
                        required
                        disabled={!editMode}
                      />
                    </div>

                    {!editMode ? (
                      <button
                        className="card-button"
                        type="button"
                        onClick={() => setEditMode(true)}
                      >
                        Edit
                      </button>
                    ) : (
                      <div>
                        <button
                          className="card-button"
                          type="submit"
                          style={{ marginRight: '20px' }}
                        >
                          Update
                        </button>
                        <button
                          className="card-button"
                          type="button"
                          onClick={handleCancel}
                        >
                          Cancel
                        </button>
                      </div>
                    )}
                  </form>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col md={3} />
          <Col md={2}>
            <p>Saved address</p>
            <div className="rectangle-box" onClick={handleBoxClick}>
              <FaLocationDot />
              <p>Add New Address</p>
            </div>
            <AddressModal
              showModal={showModal}
              handleCloseModal={handleCloseModal}
              handleAdd={handleAddAddress}
            />
          </Col>
          <Col md={7} className="d-flex">
            <AddressCard />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ProfilePage;
