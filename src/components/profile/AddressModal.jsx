import { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const AddAddressModal = ({
  showModal,
  handleCloseModal,
  handleAdd,
  updateAddress,
}) => {
  const [country, setCountry] = useState('');
  const [landmark, setLandmark] = useState('');
  const [zipcode, setZipcode] = useState('');
  const [phoneNo, setPhoneNo] = useState('');

  return (
    <Modal show={showModal} onHide={handleCloseModal} size="sm">
      <Modal.Header closeButton>
        <Modal.Title>Add Address</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formLandmark">
            <Form.Label>Landmark:</Form.Label>
            <Form.Control
              type="text"
              value={landmark}
              onChange={(e) => setLandmark(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="formCountry">
            <Form.Label>Country:</Form.Label>
            <Form.Control
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="formZipcode">
            <Form.Label>Zipcode:</Form.Label>
            <Form.Control
              type="text"
              value={zipcode}
              onChange={(e) => setZipcode(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="formPhoneNo">
            <Form.Label>Phone No:</Form.Label>
            <Form.Control
              type="text"
              value={phoneNo}
              onChange={(e) => setPhoneNo(e.target.value)}
              required
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseModal}>
          Close
        </Button>
        <Button
          variant="primary"
          onClick={() => handleAdd({ country, landmark, zipcode, phoneNo })}
        >
          Add
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddAddressModal;
