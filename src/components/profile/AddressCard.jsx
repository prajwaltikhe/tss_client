import React ,{useState}from 'react';
import { Card, Nav, Modal, Button, Form } from 'react-bootstrap';
import tssurl from '../../port';

const AddressCard = ({ address ,onDelete,updateAddress }) => {
  const mID = localStorage.getItem("MID");
  const authToken=localStorage.getItem("authToken");
  const handleDelete = () => {
    // Call the onDelete function with the address _id as an argument
    console.log("hello")
    onDelete(address._id,mID);
    
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
  console.log("form", setFormData);

  const handleSubmit = async (addressId) => {
    try {
      const response = await fetch(`${tssurl}/auth/users/${mID}/addresses/${addressId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        console.log('Address updated successfully');
      updateAddress(addressId, formData); // Use addressId instead of address._id
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
      <Card.Body>
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
        <div className="d-flex justify-content-between">
          <div className="d-flex gap-2">
            <Nav.Link className="text-decoration-none" onClick={handleEdit}>edit</Nav.Link>
            <Nav.Link className="text-decoration-none" onClick={handleDelete}>Delete</Nav.Link>
          </div>
          <Nav.Link className="custom-color text-decoration-none">
            Address Selected
          </Nav.Link>
        </div>
      </Card.Body>
    </Card>

<Modal show={showModal} onHide={handleCloseModal}>
<Modal.Header closeButton>
  <Modal.Title>Edit Address</Modal.Title>
</Modal.Header>
<Modal.Body>
  <Form>
    <Form.Group className="mb-3" controlId="formPhone">
      <Form.Label>Phone Number</Form.Label>
      <Form.Control type="text" placeholder="Enter phone number" name="phone_no" value={formData.phone_no} onChange={handleChange} />
    </Form.Group>
    <Form.Group className="mb-3" controlId="formZipcode">
      <Form.Label>Zipcode</Form.Label>
      <Form.Control type="text" placeholder="Enter zipcode" name="zipcode" value={formData.zipcode} onChange={handleChange} />
    </Form.Group>
    <Form.Group className="mb-3" controlId="formCountry">
      <Form.Label>Country</Form.Label>
      <Form.Control type="text" placeholder="Enter country" name="country" value={formData.country} onChange={handleChange} />
    </Form.Group>
    <Form.Group className="mb-3" controlId="formLandmark">
      <Form.Label>Landmark</Form.Label>
      <Form.Control type="text" placeholder="Enter landmark" name="landmark" value={formData.landmark} onChange={handleChange} />
    </Form.Group>
  </Form>
</Modal.Body>
<Modal.Footer>
  <Button variant="secondary" onClick={handleCloseModal}>Cancel</Button>
  <Button variant="primary" onClick={()=>handleSubmit(address._id)}>Update</Button>
</Modal.Footer>
</Modal>
</>
  );
};

export default AddressCard;
