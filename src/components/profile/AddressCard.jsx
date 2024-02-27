import { useState } from 'react';
import { Card, Modal, Button, Form, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';
import tssurl from '../../port';

const AddressCard = ({ address, onDelete, updateAddress }) => {
  const mID = localStorage.getItem('MID');
  const authToken = localStorage.getItem('authToken');

  const handleDelete = () => {
    onDelete(address._id, mID);
  };

  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    phone_no: address.phone_no,
    zipcode: address.zipcode,
    country: address.country,
    landmark: address.landmark,
  });

  const handleEdit = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (addressId) => {
    try {
      const response = await axios.put(
        `${tssurl}/auth/users/${mID}/addresses/${addressId}`,
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (response.status === 200) {
        console.log('Address updated successfully');
        updateAddress(addressId, formData);
        setShowModal(false);
        window.location.reload();
      } else {
        console.error('Failed to update address:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating address:', error);
    }
  };

  return (
    <>
      <Card className="add-card">
        <Card.Body className="px-3 pb-0 m-0">
          <div className="d-flex justify-content-between">
            <Card.Title>{address?.landmark}</Card.Title>
            <button className="card-button">Home</button>
          </div>
          <p className="card-text1">Default</p>
          <p className="card-text">
            {address?.landmark}, {address?.country}, {address?.zipcode}
          </p>
          <div className="d-flex">
            <p className="card-text">Phone:</p>
            <p>{address?.phone_no}</p>
          </div>
          <Row className="d-flex justify-content-between">
            <Col md="3">
              <Link
                className="text-dark text-decoration-none w-100"
                onClick={handleEdit}
              >
                Edit
              </Link>
            </Col>
            <Col md="3">
              <Link
                className="text-dark text-decoration-none w-100"
                onClick={handleDelete}
              >
                Delete
              </Link>
            </Col>
            <Col md="6">
              <p className="custom-color w-100 text-decoration-none">
                Address Selected
              </p>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Address</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formLandmark">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter landmark"
                name="landmark"
                value={formData.landmark}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formCountry">
              <Form.Label>County/Region</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter country"
                name="country"
                value={formData.country}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formZipcode">
              <Form.Label>Postal Code</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter zipcode"
                name="zipcode"
                value={formData.zipcode}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formPhone">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter phone number"
                name="phone_no"
                value={formData.phone_no}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formDefault">
              <Form.Check type="checkbox" label="Default" />
            </Form.Group>

            <Form.Group controlId="formAddressSelected">
              <Form.Check type="checkbox" label="Address Selected" />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={() => handleSubmit(address._id)}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddressCard;
