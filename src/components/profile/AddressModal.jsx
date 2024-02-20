import { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

const AddressModal = ({ showModal, handleCloseModal, handleAdd }) => {
  const [address, setAddress] = useState('');
  const [zipcode, setZipcode] = useState('');
  const [country, setCountry] = useState('');

  return (
    <Modal show={showModal} onHide={handleCloseModal} size="sm">
      <Modal.Header closeButton>
        <Modal.Title>Add Address</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="form-group">
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            id="address"
            name="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="zipcode">Zipcode:</label>
          <input
            type="text"
            id="zipcode"
            name="zipcode"
            value={zipcode}
            onChange={(e) => setZipcode(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="country">Country:</label>
          <input
            type="text"
            id="country"
            name="country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
          />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseModal}>
          Close
        </Button>
        <Button
          variant="primary"
          onClick={() => handleAdd({ address, zipcode, country })}
        >
          Add
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddressModal;
