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
  const [addressType, setAddressType] = useState('normal'); // Default to 'normal' address type
  const [isSelected, setIsSelected] = useState(false); // Initialize isSelected state as false

  console.log('hello');
  return (
    <Modal show={showModal} onHide={handleCloseModal} size="sm">
      <Modal.Header closeButton>
        <Modal.Title>Add Address</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formLandmark">
            <Form.Label>Address:</Form.Label>
            <Form.Control
              type="text"
              value={landmark}
              onChange={(e) => setLandmark(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="formCountry">
            <Form.Label>CountyRegion:</Form.Label>
            <Form.Control
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="formZipcode">
            <Form.Label>Postal Code:</Form.Label>
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

          <Form.Group>
            <Form.Check
              type="checkbox"
              label="Address Selected"
              checked={isSelected}
              onChange={(e) => setIsSelected(e.target.checked)}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Address Type:</Form.Label>
            <div>
              <Form.Check
                inline
                type="radio"
                label="Default"
                name="addressType"
                value="default"
                checked={addressType === 'default'}
                onChange={() => setAddressType('default')}
              />
              <Form.Check
                inline
                type="radio"
                label="Normal"
                name="addressType"
                value="normal"
                checked={addressType === 'normal'}
                onChange={() => setAddressType('normal')}
              />
            </div>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseModal}>
          Close
        </Button>
        <Button
          variant="primary"
          onClick={() =>
            handleAdd({
              country,
              landmark,
              zipcode,
              phoneNo,
              addressType,
              isSelected,
            })
          }
        >
          Add
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddAddressModal;
