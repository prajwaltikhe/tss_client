import { useEffect, useState, useCallback } from 'react';
import { Row, Container, Col, Image, Form, Button } from 'react-bootstrap';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import ShopTags from '../components/common/Tags';
import Sidebar from '../components/profile/Sidebar';
import AddressCard from '../components/profile/AddressCard';
import AddAddressModal from '../components/profile/AddressModal';
import { FaLocationDot } from 'react-icons/fa6';
import Profile from '../assets/images/profile1.png';
import axios from 'axios';
import tssurl from '../port';

const ProfilePage = () => {
  const mID = localStorage.getItem('MID');
  const authToken = localStorage.getItem('authToken');
  const handleAddAddress = async (addressData) => {
    try {
      const response = await fetch(`${tssurl}/auth/users/${mID}/addresses`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(addressData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Address added successfully:', data);
        setShowModal(false);
      } else {
        const errorMessage = await response.text();
        console.error('Failed to add address:', errorMessage);
      }
      window.location.reload();
    } catch (error) {
      console.error('Error adding address:', error);
    }
  };

  const [showModal, setShowModal] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const addressesArray = Object.values(addresses);

  const fetchAddresses = useCallback(async () => {
    try {
      const response = await axios.get(
        `${tssurl}/auth/users/${mID}/addresses`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (response.status === 200) {
        setAddresses(response.data);
      } else {
        console.error('Failed to fetch addresses:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching addresses:', error);
    }
  }, [mID, authToken]);

  useEffect(() => {
    fetchAddresses();
  }, [fetchAddresses]);

  const onDelete = async (addressID, mID) => {
    try {
      const response = await axios.delete(
        `${tssurl}/auth/users/${mID}/addresses/${addressID}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (response.status === 200) {
        console.log('Address deleted successfully');
        setAddresses(addresses.filter((address) => address._id !== addressID));
        window.location.reload();
      } else {
        console.error('Failed to delete address:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting address:', error);
    }
  };

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
  const userId = localStorage.getItem('MID');

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
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  console.log(formData);

  const formDataToUpdate = {
    name: formData.name,
    mobileNo: formData.mobileNo,
    gender: formData.gender,
    birth_date: formData.birth_date,
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.put(
        `${tssurl}/auth/users/${userId}`,
        formDataToUpdate,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 200) {
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

  const updateAddress = (addressId, updatedData) => {
    setAddresses(
      addresses.map((address) => {
        if (address._id === addressId) {
          return { ...address, ...updatedData };
        }
        return address;
      })
    );
  };

  return (
    <>
      <Container fluid>
        <Row>
          <ShopTags />
        </Row>
      </Container>
      <Container>
        <Row>
          <Col md={3}>
            <h4 className="ms-2 my-4 fw-bold">My Account</h4>
            <Sidebar />
          </Col>
          <Col md={9} className="mt-0 pt-0">
            <h4 className="my-4 fw-bold">Personal Information</h4>
            <Row>
              <Col md={3}>
                <div className="profile-options mt-2">
                  <div className="profile-picture">
                    <Image src={Profile} alt="Profile" rounded fluid />
                  </div>
                  <div className="upload-new-picture">Upload New Picture</div>
                  <div className="remove-picture">Remove Picture</div>
                </div>
              </Col>
              <Col md={9}>
                <div className="profile-form">
                  <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="name" className="mb-3">
                      <Form.Label>Name:</Form.Label>
                      <Form.Control
                        type="text"
                        value={formData?.name}
                        onChange={handleChange}
                        required
                        disabled={!editMode}
                      />
                    </Form.Group>
                    <Form.Group controlId="email" className="mb-3">
                      <Form.Label>Email:</Form.Label>
                      <Form.Control
                        type="email"
                        value={formData?.email}
                        required
                        disabled
                      />
                    </Form.Group>
                    <Form.Group controlId="birth_date" className="mb-3">
                      <Form.Label>Date of Birth:</Form.Label>
                      <Form.Control
                        type="text"
                        value={
                          typeof formData.birth_date === 'string'
                            ? formData.birth_date.slice(0, 10)
                            : formData.birth_date
                        }
                        onChange={handleChange}
                        disabled={!editMode}
                      />
                    </Form.Group>
                    <Form.Group controlId="gender" className="mb-1">
                      <Form.Label>Gender:</Form.Label>
                      <div className="d-flex flex-start">
                        <Form.Check
                          type="radio"
                          id="male"
                          name="gender"
                          value="male"
                          checked={formData.gender === 'male'}
                          onChange={handleChange}
                          disabled={!editMode}
                          label={<Form.Label className="ms-2">Male</Form.Label>}
                        />
                        <Form.Check
                          type="radio"
                          id="female"
                          name="gender"
                          value="female"
                          checked={formData.gender === 'female'}
                          onChange={handleChange}
                          disabled={!editMode}
                          label={
                            <Form.Label className="ms-2">Female</Form.Label>
                          }
                        />
                      </div>
                    </Form.Group>

                    <Form.Group controlId="phone" className="mb-4">
                      <Form.Label>Phone Number:</Form.Label>
                      <Form.Control
                        type="tel"
                        value={formData?.mobileNo}
                        onChange={handleChange}
                        required
                        disabled={!editMode}
                      />
                    </Form.Group>

                    {!editMode ? (
                      <Button
                        variant="primary"
                        type="button"
                        onClick={() => setEditMode(true)}
                      >
                        Edit
                      </Button>
                    ) : (
                      <div>
                        <Button
                          variant="primary"
                          type="submit"
                          style={{ marginRight: '20px' }}
                        >
                          Update
                        </Button>
                        <Button
                          variant="secondary"
                          type="button"
                          onClick={handleCancel}
                        >
                          Cancel
                        </Button>
                      </div>
                    )}
                  </Form>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row className="d-flex">
          <Col md={3} />
          <Col md={2}>
            <h5 className="fw-bold">Saved address</h5>
            <div className="rectangle-box mt-3" onClick={handleBoxClick}>
              <FaLocationDot />
              <p>Add New Address</p>
            </div>
            <AddAddressModal
              showModal={showModal}
              handleCloseModal={handleCloseModal}
              handleAdd={handleAddAddress}
              updateAddress={updateAddress}
            />
          </Col>

          <Col md={7}>
            <Swiper
              modules={[Navigation, Pagination, Scrollbar, A11y]}
              slidesPerView={2}
              navigation
              autoplay
              className="me-3 mt-2"
              pagination={{ clickable: true }}
            >
              {Array.isArray(addressesArray) && addressesArray.length > 0 ? (
                addressesArray[0].map((address) => (
                  <SwiperSlide key={address?._id}>
                    <AddressCard
                      address={address}
                      onDelete={onDelete}
                      updateAddress={updateAddress}
                    />
                  </SwiperSlide>
                ))
              ) : (
                <SwiperSlide>
                  <p>No addresses found.</p>
                </SwiperSlide>
              )}
            </Swiper>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ProfilePage;
