import React, { useEffect, useState } from "react";
import ShopTags from "../components/common/Tags";
import { Row, Container, Col, Image } from "react-bootstrap";
import Sidebar from "../components/profile/Sidebar";
import { Modal, Button } from "react-bootstrap";
import AddressCard from "../components/profile/AddressCard";
import tssurl from "../port";
import Profile from "../assets/images/profile1.png";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import { FaLocationDot } from "react-icons/fa6";
import AddAddressModal from "../components/profile/AddressModal";

const ProfilePage = () => {
  const mID = localStorage.getItem("MID");
  const authToken = localStorage.getItem("authToken");
  const handleAddAddress = async (addressData) => {
    try {
      const response = await fetch(`${tssurl}/auth/users/${mID}/addresses`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`, // Include the authentication token
        },
        body: JSON.stringify(addressData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Address added successfully:", data);
        setShowModal(false); // Close the modal after adding the address
        // Optionally reload the page if needed
      } else {
        const errorMessage = await response.text();
        console.error("Failed to add address:", errorMessage);
      }
      window.location.reload();
    } catch (error) {
      console.error("Error adding address:", error);
    }
  };

  const [showModal, setShowModal] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const addressesArray = Object.values(addresses);
  useEffect(() => {
    // Fetch addresses when component mounts
    fetchAddresses();
  }, []);
  const fetchAddresses = async () => {
    try {
      const response = await fetch(`${tssurl}/auth/users/${mID}/addresses`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setAddresses(data);
      } else {
        console.error("Failed to fetch addresses:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching addresses:", error);
    }
  };
  const onDelete = async (addressID, mID) => {
    try {
      const response = await fetch(
        `${tssurl}/auth/users/${mID}/addresses/${addressID}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (response.ok) {
        console.log("Address deleted successfully");
        // Remove the deleted address card from the UI
        setAddresses(addresses.filter((address) => address._id !== addressID));
        window.location.reload();
      } else {
        console.error("Failed to delete address:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting address:", error);
    }
  };

  const handleBoxClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    dob: "",
    gender: "",
    mobileNo: "",
  });
  console.log("formdata", formData);

  const [originalFormData, setOriginalFormData] = useState({});
  const [editMode, setEditMode] = useState(false);
  //
  const userId = localStorage.getItem("MID");
  useEffect(() => {
    fetch(`${tssurl}/auth/users/${userId}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Failed to fetch user data");
        }
      })
      .then((userData) => {
        setFormData(userData?.user);
        setOriginalFormData(userData);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    console.log("formData", formData);
  };
  const formDataToUpdate = {
    name: formData.name,
    mobileNo: formData.mobileNo,
    gender: formData.gender,
    birth_date:formData.birth_date,
    gender:formData.gender
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Make sure to replace 'your-api-endpoint' with your actual API endpoint for updating user data
      const response = await fetch(`${tssurl}/auth/users/${userId}`, {
        method: "PUT", // or 'PATCH' depending on your API
        headers: {
          "Content-Type": "application/json",
          // Add any additional headers if required, such as authorization token
        },

        body: JSON.stringify(formDataToUpdate), // Convert form data to JSON string
      });

      if (response.ok) {
        // Update was successful
        console.log("Form data updated successfully");
        setEditMode(false); // Exit edit mode after successful update
      } else {
        // Update failed
        console.error("Failed to update form data");
        // Handle error as needed, e.g., display error message to user
      }
    } catch (error) {
      console.error("Error updating form data:", error);
    }
  };

  const handleCancel = () => {
    setFormData(originalFormData); // Restore original form data
    setEditMode(false); // Exit edit mode
    window.location.reload(); // Reload the page
  };

  console.log("original", originalFormData);
  const updateAddress = (addressId, updatedData) => {
    // Update the address data in the local state or perform any other necessary actions
    // For example:
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
                  style={{ marginRight: "50px", marginTop: "25px" }}
                >
                  <div className="profile-picture">
                    {/* Profile picture goes here */}
                    <Image
                      src={Profile}
                      alt="Profile"
                      className="rounded-circle"
                      style={{ width: "125px", height: "125px" }}
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
                        name="birth_date"
                        value={formData?.birth_date}
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
                            checked={formData.gender === "male"}
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
                            checked={formData.gender === "female"}
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
                          style={{ marginRight: "20px" }}
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
              spaceBetween={20}
              slidesPerView={3}
              // navigation
              pagination={{ clickable: true }}
              scrollbar={{ draggable: true }}
              onSwiper={(swiper) => console.log(swiper)}
              onSlideChange={() => console.log("slide change")}
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
