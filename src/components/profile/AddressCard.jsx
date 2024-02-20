import { Card, Nav } from 'react-bootstrap';

const AddressCard = () => {
  return (
    <div className="d-flex flex-wrap">
      <Card className="add-card">
        <Card.Body>
          <div className="d-flex justify-content-between">
            <Card.Title>Rachit Singh</Card.Title>
            <button className="card-button">Home</button>
          </div>
          <p className="card-text1">Default</p>
          <p className="card-text">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eum, quae
            similique! Quod?
          </p>
          <div className="d-flex">
            <p className="card-text">Phone:</p>
            <p>123456789</p>
          </div>
          <div className="d-flex justify-content-between">
            <div className="d-flex gap-2">
              <Nav.Link className="text-decoration-none">edit</Nav.Link>
              <Nav.Link className="text-decoration-none">Delete</Nav.Link>
            </div>
            <Nav.Link className="custom-color text-decoration-none ">
              Address Selected
            </Nav.Link>
          </div>
        </Card.Body>
      </Card>
      <Card className="add-card">
        <Card.Body>
          <div className="d-flex justify-content-between">
            <Card.Title>Rachit Singh</Card.Title>
            <button className="card-button">Home</button>
          </div>
          <p className="card-text1">Default</p>
          <p className="card-text">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eum, quae
            similique! Quod?
          </p>
          <div className="d-flex">
            <p className="card-text">Phone:</p>
            <p>123456789</p>
          </div>
          <div className="d-flex justify-content-between">
            <div className="d-flex gap-2">
              <Nav.Link className="text-decoration-none">edit</Nav.Link>
              <Nav.Link className="text-decoration-none">Delete</Nav.Link>
            </div>
            <Nav.Link className="custom-color text-decoration-none ">
              Address Selected
            </Nav.Link>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default AddressCard;
