import { useEffect, useState, useCallback } from 'react';
import { Row, Container, Col, Image, Form, Button } from 'react-bootstrap';
import Sidebar from '../components/profile/Sidebar';
import AddressCard from '../components/profile/AddressCard';
import tssurl from '../port';
import Profile from '../assets/images/profile1.png';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { FaLocationDot } from 'react-icons/fa6';
import AddAddressModal from '../components/profile/AddressModal';
import axios from 'axios';

const ProfilePage = () => {
  const mID = localStorage.getItem('MID');
  const authToken = localStorage.getItem('authToken');
  const [showModal, setShowModal] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const addressesArray = Object.values(addresses);
  const [formData, setFormData] = useState({});
  const [originalFormData, setOriginalFormData] = useState({});
  const [editMode, setEditMode] = useState(false);

  const fetchAddresses = useCallback(async () => {
    try {
      const response = await axios.get(
        `${tssurl}/auth/users/${mID}/addresses`,
        {
          headers: { Authorization: `Bearer ${authToken}` },
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

  const fetchUserData = useCallback(async () => {
    try {
      const response = await axios.get(`${tssurl}/auth/users/${mID}`);
      if (response.status === 200) {
        const userData = response.data;
        setFormData(userData?.user);
        setOriginalFormData(userData);
      } else {
        throw new Error('Failed to fetch user data');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  }, [mID]);

  useEffect(() => {
    fetchAddresses();
    fetchUserData();
  }, [fetchAddresses, fetchUserData]);

  const handleAddAddress = async (addressData) => {
    try {
      const response = await axios.post(
        `${tssurl}/auth/users/${mID}/addresses`,
        addressData,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (response.status === 200) {
        console.log('Address added successfully:', response.data);
        setShowModal(false);
        fetchAddresses();
      } else {
        console.error('Failed to add address:', response.data);
      }
    } catch (error) {
      console.error('Error adding address:', error);
    }
  };

  const onDelete = async (addressID) => {
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
        fetchAddresses();
      } else {
        console.error('Failed to delete address:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting address:', error);
    }
  };

  const handleBoxClick = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const formDataToUpdate = {
    name: formData.name,
    mobileNo: formData.mobileNo,
    gender: formData.gender,
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.put(
        `${tssurl}/auth/users/${mID}`,
        formDataToUpdate,
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );

      if (response.status === 200) {
        console.log('Form data updated successfully');
        setEditMode(false);
        fetchUserData();
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
      addresses.map((address) =>
        address._id === addressId ? { ...address, ...updatedData } : address
      )
    );
  };

  return (
    <Container fluid>
      <Row>
        <Col md={3}>
          <Sidebar />
        </Col>
        <Col md={9}>
          <p className="fw-bold fs-4">Personal Information</p>
          <Row>
            <Col md={3}>
              <div
                className="profile-options"
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
                <Form onSubmit={handleSubmit}>
                  <Form.Group controlId="name">
                    <Form.Label>Name:</Form.Label>
                    <Form.Control
                      type="text"
                      value={formData?.name}
                      onChange={handleChange}
                      required
                      disabled={!editMode}
                    />
                  </Form.Group>
                  <Form.Group controlId="email">
                    <Form.Label>Email:</Form.Label>
                    <Form.Control
                      type="email"
                      value={formData?.email}
                      required
                      disabled
                    />
                  </Form.Group>
                  <Form.Group controlId="dob">
                    <Form.Label>Date of Birth:</Form.Label>
                    <Form.Control
                      type="date"
                      value={formData?.dob}
                      onChange={handleChange}
                      disabled={!editMode}
                    />
                  </Form.Group>
                  <Form.Group controlId="gender">
                    <Form.Label>Gender:</Form.Label>
                    <div className="d-flex flex-row gap-2 align-items-center">
                      <Form.Check
                        type="radio"
                        id="male"
                        label="Male"
                        checked={formData.gender === 'male'}
                        onChange={handleChange}
                        disabled={!editMode}
                      />
                      <Form.Check
                        type="radio"
                        id="female"
                        label="Female"
                        checked={formData.gender === 'female'}
                        onChange={handleChange}
                        disabled={!editMode}
                      />
                    </div>
                  </Form.Group>
                  <Form.Group controlId="phone">
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
      <Row>
        <Col md={2}>
          <p>Saved address</p>
          <div className="rectangle-box" onClick={handleBoxClick}>
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
        <Col md={7} className="d-flex">
          <Swiper
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            spaceBetween={30}
            slidesPerView={3}
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
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
  );
};

export default ProfilePage;
